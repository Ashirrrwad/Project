// Get DOM elements
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbotSidebar = document.getElementById("chatbot-sidebar");
const closeBtn = document.getElementById("close-btn");
const chatbotSubmit = document.getElementById("chatbot-submit");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

// Show chatbot sidebar
chatbotIcon.addEventListener("click", () => {
    chatbotSidebar.classList.add("open");
    chatbotIcon.classList.add("hide");
});

// Close chatbot sidebar
closeBtn.addEventListener("click", () => {
    chatbotSidebar.classList.remove("open");
    chatbotIcon.classList.remove("hide");
});

// Handle message sending
chatbotSubmit.addEventListener("click", sendMessage);

// Handle Enter key
chatbotInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Send user message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    addMessage("user", message);
    chatbotInput.value = "";

    showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator();
        const response = getBotReply(message);
        handleBotResponse(response);
    }, 700);
}

// Add message to chat
function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender);
    msgDiv.textContent = text;
    chatbotMessages.appendChild(msgDiv);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("chat-message", "bot", "typing");
    typingDiv.textContent = "Bot is typing...";
    typingDiv.id = "typing-indicator";
    chatbotMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingDiv = document.getElementById("typing-indicator");
    if (typingDiv) typingDiv.remove();
}

// Handle bot's response
function handleBotResponse(response) {
    if (typeof response === "string") {
        addMessage("bot", response);
    } else if (typeof response === "object" && response.text) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-message", "bot");

        const textPara = document.createElement("p");
        textPara.textContent = response.text;
        msgDiv.appendChild(textPara);

        if (Array.isArray(response.options)) {
            const optionsDiv = document.createElement("div");
            optionsDiv.classList.add("chat-options");

            response.options.forEach(option => {
                const button = document.createElement("button");
                button.classList.add("chat-option-button");
                button.textContent = option.text;
                button.addEventListener("click", () => {
                    if (option.action) {
                        option.action();
                    } else {
                        addMessage("user", option.text);
                        showTypingIndicator();
                        setTimeout(() => {
                            hideTypingIndicator();
                            const nextResponse = getBotReply(option.text);
                            handleBotResponse(nextResponse);
                        }, 700);
                    }
                });
                optionsDiv.appendChild(button);
            });

            msgDiv.appendChild(optionsDiv);
        }

        chatbotMessages.appendChild(msgDiv);
    }
    scrollToBottom();
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Bot reply logic
function getBotReply(message) {
    const msg = message.toLowerCase();

    if (containsAny(msg, ["hello", "hi", "hey"])) {
        return {
            text: "Hello! How can I assist you today?",
            options: [
                { text: "Preparation Kits" },
                { text: "Courses" },
                { text: "Resume Builder" }
            ]
        };
    }

    if (containsAny(msg, ["course", "courses"])) {
        return {
            text: "Choose a course you're interested in:",
            options: getCourseOptions()
        };
    }

    if (containsAny(msg, ["dsa", "data structures", "algorithms", "dsa doubt session"])) {
        return {
            text: "Choose any of the following options:",
            options: [
                { text: "DSA Doubt Session" },
                { text: "DSA Preparation Kit" },
                { text: "DSA Resources" }
            ]
        };
    }

    if (containsAll(msg, ["book", "session"])) {
        return bookDoubtSession();
    }

    if (containsAny(msg, ["resume"])) {
        return "You can use our Resume Builder kit under the Preparation Kits section!";
    }

    if (containsAny(msg, ["interview"])) {
        return {
            text: "I can help you with interview preparation. Choose below:",
            options: [
                { text: "HR Questions" },
                { text: "Technical Questions" }
            ]
        };
    }

    if (containsAny(msg, ["thanks", "thank you"])) {
        return "You're welcome! 😊";
    }

    return "Sorry, I didn't quite catch that. Could you rephrase or ask something else?";
}

// Book a doubt clearing session
function bookDoubtSession() {
    return {
        text: "Great! 📅 Please select an option to book your Doubt Clearing Session:",
        options: [
            { text: "Book a Session" },
            { text: "Check Availability" },
            { text: "Cancel Session" },
            { 
                text: "Talk to Academic Advisor",
                action: talkToAdvisor
            }
        ]
    };
}

// Dummy action for talking to advisor
function talkToAdvisor() {
    handleBotResponse("An academic advisor will reach out to you shortly. 📞 Please provide your contact details in the input box.");
}

// Helpers
function getCourseOptions() {
    return [
        { text: "Algorithms" },
        { text: "Data Structures" },
        { text: "Mathematics" },
        { text: "AI" },
        { text: "C" },
        { text: "C++" },
        { text: "Java" },
        { text: "Python" },
        { text: "Ruby" },
        { text: "SQL" },
        { text: "Databases" },
        { text: "Linux Shell" },
        { text: "Functional Programming" },
        { text: "Regex" },
        { text: "ReactJS" }
    ];
}

function containsAny(text, keywords) {
    return keywords.some(keyword => text.includes(keyword));
}

function containsAll(text, keywords) {
    return keywords.every(keyword => text.includes(keyword));
}
