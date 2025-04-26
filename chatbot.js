// Get DOM elements
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbotSidebar = document.getElementById("chatbot-sidebar");
const closeBtn = document.getElementById("close-btn");
const chatbotSubmit = document.getElementById("chatbot-submit");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

// Show the chatbot sidebar when the icon is clicked
chatbotIcon.addEventListener("click", () => {
    chatbotSidebar.classList.add("open");
    chatbotIcon.classList.add("hide");
});

// Close the chatbot sidebar when the close button is clicked
closeBtn.addEventListener("click", () => {
    chatbotSidebar.classList.remove("open");
    chatbotIcon.classList.remove("hide");
});

// Handle sending messages when the submit button is clicked
chatbotSubmit.addEventListener("click", () => {
    const message = chatbotInput.value.trim();
    if (message === "") return; // Do not send empty messages

    addMessage("user", message); // Add user message
    chatbotInput.value = ""; // Clear the input field

    // Simulate AI response after 500ms
    setTimeout(() => {
        const response = getBotReply(message);
        addMessage("bot", response); // Add bot response
    }, 500);
});

// Handle sending messages when the "Enter" key is pressed
chatbotInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        chatbotSubmit.click(); // Trigger click event when "Enter" is pressed
    }
});

// Function to append messages to the chat
function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chat-message", sender);
    msgDiv.textContent = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll to the bottom
}

// Rule-based AI reply logic
function getBotReply(message) {
    const msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else if (msg.includes("resume")) {
        return "You can use our Resume Builder kit under the Preparation Kits section!";
    } else if (msg.includes("interview")) {
        return "I can help you with common interview questions. Would you like to see HR or technical questions?";
    } else if (msg.includes("thanks") || msg.includes("thank you")) {
        return "You're welcome! 😊";
    } else {
        return "Sorry, I didn't quite catch that. Could you rephrase or ask something else?";
    }
}
