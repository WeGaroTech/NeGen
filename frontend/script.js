
// CONFIGURATION
const API_BASE_URL = 'http://localhost:8000';
 
const API_ENDPOINTS = {
    getSchemes: '/api/schemes',
    sendMessage: '/api/chat'
};


// STATE MANAGEMENT
const state = {
    currentMode: null,
    currentState: null,
    chatType: null,
    currentContext: null,
    currentSchemeId: null,
    isLoading: false  
};


// MODE SELECTION
function selectMode(mode) {
    state.currentMode = mode;
    document.getElementById('modeSelection').style.display = 'none';

    if (mode === 'government') {
        document.getElementById('governmentSelection').classList.add('active');
    } else if (mode === 'education') {
        document.getElementById('educationSelection').classList.add('active');
    } else if (mode === 'health') {
        document.getElementById('healthSelection').classList.add('active');
    }
}


// STATE SELECTION (Loads schemes from backend)
async function handleStateSelect(mode) {
    let stateSelectId, schemeListId;

    if (mode === 'government') {
        stateSelectId = 'govStateSelect';
        schemeListId = 'govSchemeList';
    } else if (mode === 'education') {
        stateSelectId = 'eduStateSelect';
        schemeListId = 'eduSchemeList';
    } else if (mode === 'health') {
        stateSelectId = 'healthStateSelect';
        schemeListId = 'healthSchemeList';
    }

    const stateValue = document.getElementById(stateSelectId).value;
    const schemeList = document.getElementById(schemeListId);

    if (stateValue) {
        state.currentState = stateValue;
        schemeList.innerHTML = '<div class="loading">Loading schemes...</div>';
        schemeList.classList.add('active');

        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.getSchemes}?mode=${mode}&state=${stateValue}`);
            
            const schemes = await response.json();

            schemeList.innerHTML = '';

            schemes.forEach(scheme => {
                const schemeDiv = document.createElement('div');
                schemeDiv.className = 'scheme-item';
                schemeDiv.onclick = () => startChat(mode, 'scheme_chat', scheme.title, scheme.id, stateValue);
                schemeDiv.innerHTML = `
                    <h4>${scheme.title}</h4>
                    <p>${scheme.description}</p>
                `;
                schemeList.appendChild(schemeDiv);
            });
        } catch (error) {
            console.error(`Error loading ${mode} schemes:`, error);
            schemeList.innerHTML = '<div class="loading" style="color: red;">Failed to load schemes</div>';
        }
    } else {
        schemeList.classList.remove('active');
        schemeList.innerHTML = '';
    }
}


// START CHAT SESSION
function startChat(mode, chatType, context, schemeId = null, stateValue = null) {
    state.currentMode = mode;
    state.chatType = chatType;
    state.currentContext = context;
    state.currentSchemeId = schemeId;
    state.currentState = stateValue;

    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('governmentSelection').classList.remove('active');
    document.getElementById('educationSelection').classList.remove('active');
    document.getElementById('healthSelection').classList.remove('active');

    document.getElementById('chatInterface').classList.add('active');
    document.getElementById('chatTitle').textContent = context;
    document.getElementById('chatMessages').innerHTML = '';


    if (chatType === 'scheme_chat') {
        const welcomeMsg = `How can I help you with the ${context}?`;
        addMessage('ai', welcomeMsg);
    }
}


// GO BACK / RESET

function goBack() {
    document.getElementById('chatInterface').classList.remove('active');
    document.getElementById('governmentSelection').classList.remove('active');
    document.getElementById('educationSelection').classList.remove('active');
    document.getElementById('healthSelection').classList.remove('active');
    document.getElementById('govSchemeList').classList.remove('active');
    document.getElementById('eduSchemeList').classList.remove('active');
    document.getElementById('healthSchemeList').classList.remove('active');

    document.getElementById('govStateSelect').value = '';
    document.getElementById('eduStateSelect').value = '';
    document.getElementById('healthStateSelect').value = '';

    document.getElementById('modeSelection').style.display = 'flex';

    state.currentMode = null;
    state.currentState = null;
    state.chatType = null;
    state.currentContext = null;
    state.currentSchemeId = null;
    state.isLoading = false;
}


// ADD MESSAGE TO CHAT (WITH MARKDOWN SUPPORT)

function addMessage(sender, text) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const content = document.createElement('div');
    content.className = 'message-content';

    if (sender === 'ai') {
        content.innerHTML = marked.parse(text);
    } else {
        content.textContent = text;
    }

    messageDiv.appendChild(content);
    messagesDiv.appendChild(messageDiv);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ADD LOADING MESSAGE

function addLoadingMessage() {
    const messagesDiv = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai';
    loadingDiv.id = 'loading-message';

    const content = document.createElement('div');
    content.className = 'message-content loading-dots';
    content.innerHTML = '<span></span><span></span><span></span>';

    loadingDiv.appendChild(content);
    messagesDiv.appendChild(loadingDiv);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


// REMOVE LOADING MESSAGE

function removeLoadingMessage() {
    const loadingMsg = document.getElementById('loading-message');
    if (loadingMsg) {
        loadingMsg.remove();
    }
}


// TOGGLE SEND BUTTON STATE

function toggleSendButton(disabled) {
    const sendButton = document.querySelector('.input-container button');
    const input = document.getElementById('messageInput');

    sendButton.disabled = disabled;
    input.disabled = disabled;
}


// SEND MESSAGE

function sendMessage() {
    // Prevent sending if already loading
    if (state.isLoading) return;

    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addMessage('user', message);
    input.value = '';

    // Set loading state
    state.isLoading = true;
    toggleSendButton(true);
    addLoadingMessage();

    // Send to backend
    sendMessageToBackend(message);
}


// BACKEND INTEGRATION

async function sendMessageToBackend(userMessage) {
    try {
        let payload;

        if (state.chatType === 'general_chat' && state.currentMode === null) {
            payload = {
                chat_type: 'general_chat',
                domain: null,
                question: userMessage,
                state: null,
                scheme_id: null
            };
        } else if (state.chatType === 'scheme_chat') {
            payload = {
                chat_type: 'scheme_chat',
                domain: state.currentMode,
                question: userMessage,
                state: state.currentState,
                scheme_id: state.currentSchemeId
            };
        }

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.sendMessage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // Remove loading, add response
        removeLoadingMessage();
        addMessage('ai', data.answer || data.response);

    } catch (error) {
        console.error('Error sending message:', error);
        removeLoadingMessage();
        addMessage('ai', 'Sorry, something went wrong. Please try again.');
    } finally {
        // Re-enable send button
        state.isLoading = false;
        toggleSendButton(false);
    }
}

// HANDLE ENTER KEY
function handleKeyPress(event) {
    if (event.key === 'Enter' && !state.isLoading) {
        sendMessage();
    }
}