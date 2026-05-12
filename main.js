function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();

    if (message === "") return;

    // Display User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'user-msg';
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show Typing Indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-msg';
    typingDiv.innerText = "...";
    chatBox.appendChild(typingDiv);

    // AI Logic
    setTimeout(() => {
        const response = getAIResponse(message);
        typingDiv.innerText = response;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
}

function getAIResponse(input) {
    const msg = input.toLowerCase();

    if (msg.includes("what is noise")) {
        return "Noise is technically 'unwanted sound.' In a factory, it becomes a physical hazard when it exceeds 85 decibels, potentially leading to permanent hearing loss.";
    }
    if (msg.includes("limit") || msg.includes("db") || msg.includes("decibel")) {
        return "The Malaysian OSH limit for noise exposure is 85dB(A) for an 8-hour shift. If it's louder, the work duration must be shortened or PPE must be worn.";
    }
    if (msg.includes("ppe") || msg.includes("earplug") || msg.includes("protect")) {
        return "You should use approved earplugs or earmuffs. Always check the Noise Reduction Rating (NRR) to ensure they are effective for your specific environment.";
    }
    if (msg.includes("malaysia") || msg.includes("law") || msg.includes("osha")) {
        return "The Occupational Safety and Health Act (OSHA) 1994 and the 2019 Noise Regulations govern workplace safety in Malaysia. Employers must provide training and hearing tests.";
    }
    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hello! I am your SonicSafe assistant. I can explain noise hazards, safety laws, or PPE requirements. What would you like to know?";
    }
    if (msg.includes("who made you")) {
        return "I was developed for this OSH Awareness Campaign to demonstrate how IR4.0 technology can improve workplace safety education.";
    }
    
    // Catch-all response for anything else
    return "That's an interesting question! While I'm specialized in Noise Safety, I can tell you that staying informed is the first step to a safe workplace. Could you ask me more about noise hazards or PPE?";
}