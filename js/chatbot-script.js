// Chatbot responses
const responses = {
    'ai ethics': {
        text: "AI ethics involves principles like transparency, fairness, and accountability in AI systems. Key areas include: bias prevention, privacy protection, and ensuring AI benefits society. Would you like to learn more about any specific aspect? 🤖",
        category: "Ethics",
        quickReplies: ["Bias in AI", "Privacy Concerns", "AI Transparency"]
    },
    'guidelines': {
        text: "Here are key AI guidelines:\n1. Transparency in AI decisions\n2. Regular ethical assessments\n3. Privacy protection\n4. Bias prevention\n5. Human oversight\n\nWhich would you like to explore? 📋",
        category: "Guidelines",
        quickReplies: ["Transparency", "Ethics Assessment", "Privacy"]
    },
    'best practices': {
        text: "Leading AI best practices include:\n• Documentation of AI systems\n• Regular testing for bias\n• Privacy by design\n• Human-in-the-loop approaches\n\nWould you like specific examples? 💡",
        category: "Best Practices",
        quickReplies: ["Documentation", "Bias Testing", "Privacy Design"]
    },
    'regulations': {
        text: "AI regulations vary by region. Key frameworks include:\n• EU AI Act\n• US AI Bill of Rights\n• China's AI Governance\n\nWhich region's regulations interest you? 🌍",
        category: "Regulations",
        quickReplies: ["EU Regulations", "US Regulations", "Asia Regulations"]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const chatMessages = document.querySelector('.chat-messages');
    const inputField = document.querySelector('.input-field');
    const sendButton = document.querySelector('.send-button');

    // Add message to chat
    function addMessage(message, isUser = false, category = null) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
        
        if (category) {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('response-category');
            categoryDiv.textContent = category;
            messageDiv.appendChild(categoryDiv);
        }
        
        messageDiv.innerHTML += message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add quick replies
    function addQuickReplies(replies) {
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.classList.add('quick-replies');
        
        replies.forEach(reply => {
            const replyButton = document.createElement('button');
            replyButton.classList.add('quick-reply');
            replyButton.textContent = reply;
            replyButton.addEventListener('click', () => handleMessage(reply));
            quickRepliesDiv.appendChild(replyButton);
        });
        
        chatMessages.appendChild(quickRepliesDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle incoming messages
    function handleMessage(message) {
        if (!message.trim()) return;
        
        addMessage(message, true);
        
        const lowercaseMessage = message.toLowerCase();
        let matchedResponse = null;
        
        for (const [key, value] of Object.entries(responses)) {
            if (lowercaseMessage.includes(key)) {
                matchedResponse = value;
                break;
            }
        }
        
        setTimeout(() => {
            if (matchedResponse) {
                addMessage(matchedResponse.text, false, matchedResponse.category);
                addQuickReplies(matchedResponse.quickReplies);
            } else {
                addMessage(
                    "I'd be happy to help you with that. Could you please be more specific about what aspect of AI ethics you'd like to learn about? 🤔",
                    false,
                    "General"
                );
                addQuickReplies(["AI Ethics", "Guidelines", "Best Practices", "Regulations"]);
            }
        }, 500);

        inputField.value = '';
        inputField.focus();
    }

    // Event Listeners
    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', () => {
            chatToggle.classList.toggle('active');
            chatContainer.classList.toggle('active');
            if (chatContainer.classList.contains('active')) {
                inputField.focus();
            }
        });
    }

    if (sendButton) {
        sendButton.addEventListener('click', () => handleMessage(inputField.value));
    }

    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleMessage(inputField.value);
            }
        });
    }

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (
            chatContainer &&
            chatToggle &&
            !chatContainer.contains(e.target) &&
            !chatToggle.contains(e.target)
        ) {
            chatToggle.classList.remove('active');
            chatContainer.classList.remove('active');
        }
    });
});