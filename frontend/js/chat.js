const schemeTitle = document.getElementById("schemeTitle");
const schemeDescription = document.getElementById("schemeDescription");
const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const endChatBtn = document.getElementById("endChatBtn");

//Get data from localstorage.

const selectedScheme = localStorage.getItem("selectedScheme");
const selectedMode = localStorage.getItem("selectedMode");

/* =========================
   TEMP SCHEME NOTES
   (Backend will replace this)
========================= */

const schemeNotes = {
    "Chief Minister's Youth Empowerment Scheme":
        "This scheme provides financial assistance and mentorship support to young entrepreneurs to help them start or expand their businesses.",

    "Meghalaya Health Insurance Scheme":
        "A government-backed health insurance program that offers cashless treatment for families in empanelled hospitals.",

    "Orunodoi Scheme":
        "A welfare scheme that provides financial assistance to economically weaker households to support their basic needs.",

    "Atmanirbhar Assam Scheme":
        "This scheme encourages self-employment by providing financial support and training to youth.",

    "Scholarship Program":
        "Provides financial support to students from economically weaker backgrounds to continue their education.",

    "Skill Development Course":
        "Offers industry-relevant skill training to improve employability.",

    "Higher Education Grant":
        "Financial assistance to help students pursue higher education.",

    "Free Health Checkup Scheme":
        "Ensures free annual medical checkups for citizens at government healthcare centers.",

    "Mother & Child Care Program":
        "Provides healthcare services and nutritional support to mothers and infants.",

    "Assam Arogya Nidhi":
        "Financial aid for citizens undergoing serious medical treatment.",

    "Free Medicine Distribution Scheme":
        "Provides essential medicines free of cost at government hospitals."
};

//SCHEME Info.

if (schemeTitle) {
    schemeTitle.innerText = selectedScheme || "Selected Scheme";
}

if (schemeDescription) {
    schemeDescription.innerText =
        schemeNotes[selectedScheme] ||
        "Ask questions related to this scheme using the chat below.";
}

//CHAT Func.

function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "message user";
    msg.innerHTML = `<div class="bubble">${text}</div>`;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function addBotMessage(text) {
    const msg = document.createElement("div");
    msg.className = "message bot";
    msg.innerHTML = `
        <span class="bot-icon">🤖</span>
        <div class="bubble">${text}</div>
    `;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
}

//SEND Msg.

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    userInput.value = "";

    // TEMP AI RESPONSE 
    setTimeout(() => {
        addBotMessage(
            "This is a demo response. The AI backend will generate answers based on the selected scheme."
        );
    }, 700);
}

//SEND Butn.

if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
}

if (userInput) {
    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}

//END CHAT Butn.

if (endChatBtn) {
    endChatBtn.addEventListener("click", () => {
        // Clear chat
        localStorage.removeItem("selectedScheme");
        localStorage.removeItem("selectedMode");

        // Go back to home page
        window.location.href = "index.html";
    });
}

//Bot resp.
addBotMessage(
    "Hello! You can ask me anything about this scheme."
);
