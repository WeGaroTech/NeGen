const homeSection = document.getElementById("homeSection");

//Click func.

function makeSchemeClickable(cardElement, mode, schemeTitle) {
    cardElement.addEventListener("click", () => {
        localStorage.setItem("selectedMode", mode);
        localStorage.setItem("selectedScheme", schemeTitle);
        window.location.href = "chat.html"; 
    });
}

/* =========================
   GOVERNMENT SECTION
========================= */

const governmentCard = document.getElementById("governmentCard");
const governmentSection = document.getElementById("governmentSection");
const backButton = document.getElementById("backButton");
const stateSelect = document.getElementById("stateSelect");
const schemesContainer = document.getElementById("schemesContainer");

// Open Government section
if (governmentCard) {
    governmentCard.addEventListener("click", () => {
        homeSection.classList.add("hidden");
        governmentSection.classList.remove("hidden");
    });
}

// Back to Home from Government
if (backButton) {
    backButton.addEventListener("click", () => {
        governmentSection.classList.add("hidden");
        homeSection.classList.remove("hidden");
    });
}

// Government schemes data
const schemesData = {
    meghalaya: [
        {
            title: "Chief Minister's Youth Empowerment Scheme",
            description: "Financial assistance for youth entrepreneurs"
        },
        {
            title: "Meghalaya Health Insurance Scheme",
            description: "Cashless health coverage for families"
        }
    ],
    assam: [
        {
            title: "Orunodoi Scheme",
            description: "Financial support to economically weaker families"
        },
        {
            title: "Atmanirbhar Assam Scheme",
            description: "Self-employment support for youth"
        }
    ]
};

// Load Government schemes
if (stateSelect) {
    stateSelect.addEventListener("change", () => {
        const selectedState = stateSelect.value;
        schemesContainer.innerHTML = "";

        const schemes = schemesData[selectedState] || [];

        schemes.forEach(scheme => {
            const schemeDiv = document.createElement("div");
            schemeDiv.className = "scheme-card";
            schemeDiv.innerHTML = `
                <h4>${scheme.title}</h4>
                <p>${scheme.description}</p>
            `;

            makeSchemeClickable(schemeDiv, "government", scheme.title);

            schemesContainer.appendChild(schemeDiv);
        });

        schemesContainer.classList.remove("hidden");
    });
}

/* =========================
   EDUCATION SECTION
========================= */

const educationCard = document.getElementById("educationCard");
const educationSection = document.getElementById("educationSection");
const backEducation = document.getElementById("backEducation");
const eduStateSelect = document.getElementById("eduStateSelect");
const eduSchemesContainer = document.getElementById("eduSchemesContainer");

// Open Education section
if (educationCard) {
    educationCard.addEventListener("click", () => {
        homeSection.classList.add("hidden");
        educationSection.classList.remove("hidden");
    });
}

// Back to Home from Education
if (backEducation) {
    backEducation.addEventListener("click", () => {
        educationSection.classList.add("hidden");
        homeSection.classList.remove("hidden");
    });
}

// Education data
const educationData = {
    meghalaya: [
        {
            title: "Scholarship Program",
            description: "Financial aid for students"
        },
        {
            title: "Skill Development Course",
            description: "Industry-focused training"
        }
    ],
    assam: [
        {
            title: "Higher Education Grant",
            description: "Support for college education"
        }
    ]
};

// Load Education programs
if (eduStateSelect) {
    eduStateSelect.addEventListener("change", () => {
        const selectedState = eduStateSelect.value;
        eduSchemesContainer.innerHTML = "";

        const programs = educationData[selectedState] || [];

        programs.forEach(program => {
            const div = document.createElement("div");
            div.className = "scheme-card";
            div.innerHTML = `
                <h4>${program.title}</h4>
                <p>${program.description}</p>
            `;

            makeSchemeClickable(div, "education", program.title);

            eduSchemesContainer.appendChild(div);
        });

        eduSchemesContainer.classList.remove("hidden");
    });
}

/* =========================
   HEALTH SECTION
========================= */

const healthCard = document.getElementById("healthCard");
const healthSection = document.getElementById("healthSection");
const backHealth = document.getElementById("backHealth");
const healthStateSelect = document.getElementById("healthStateSelect");
const healthSchemesContainer = document.getElementById("healthSchemesContainer");

// Open Health section
if (healthCard) {
    healthCard.addEventListener("click", () => {
        homeSection.classList.add("hidden");
        healthSection.classList.remove("hidden");
    });
}

// Back to Home from Health
if (backHealth) {
    backHealth.addEventListener("click", () => {
        healthSection.classList.add("hidden");
        homeSection.classList.remove("hidden");
    });
}

// Health data
const healthData = {
    meghalaya: [
        {
            title: "Free Health Checkup Scheme",
            description: "Annual free health checkups for citizens"
        },
        {
            title: "Mother & Child Care Program",
            description: "Healthcare support for mothers and infants"
        }
    ],
    assam: [
        {
            title: "Assam Arogya Nidhi",
            description: "Financial assistance for serious medical treatment"
        },
        {
            title: "Free Medicine Distribution Scheme",
            description: "Essential medicines at government hospitals"
        }
    ]
};

// Load Health schemes
if (healthStateSelect) {
    healthStateSelect.addEventListener("change", () => {
        const selectedState = healthStateSelect.value;
        healthSchemesContainer.innerHTML = "";

        const schemes = healthData[selectedState] || [];

        schemes.forEach(scheme => {
            const div = document.createElement("div");
            div.className = "scheme-card";
            div.innerHTML = `
                <h4>${scheme.title}</h4>
                <p>${scheme.description}</p>
            `;

            makeSchemeClickable(div, "health", scheme.title);

            healthSchemesContainer.appendChild(div);
        });

        healthSchemesContainer.classList.remove("hidden");
    });
}
