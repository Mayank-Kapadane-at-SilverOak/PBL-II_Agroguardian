// AI Chat functions
document.addEventListener("DOMContentLoaded", () => {
  // Focus on input field
  const messageInput = document.getElementById("message-input")
  if (messageInput) {
    messageInput.focus()
  }

  // Add enter key event listener
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  // Scroll to bottom of chat
  scrollToBottom()
})

function sendMessage() {
  const messageInput = document.getElementById("message-input")
  const message = messageInput.value.trim()

  if (!message) return

  // Add user message to chat
  const chatMessages = document.getElementById("chat-messages")
  const userMessageDiv = document.createElement("div")
  userMessageDiv.className = "message user"
  userMessageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `
  chatMessages.appendChild(userMessageDiv)

  // Clear input
  messageInput.value = ""

  // Scroll to bottom
  scrollToBottom()

  // In a real app, this would send the message to an AI API and get a response
  // For demo purposes, we'll just show a mock response after a delay
  setTimeout(() => {
    const botMessageDiv = document.createElement("div")
    botMessageDiv.className = "message bot"
    botMessageDiv.innerHTML = `
            <div class="message-content">
                <p>I'll help you with that. Let me check our database for information about ${message}.</p>
            </div>
        `
    chatMessages.appendChild(botMessageDiv)

    // Scroll to bottom
    scrollToBottom()
  }, 1000)
}

function scrollToBottom() {
  const chatMessages = document.getElementById("chat-messages")
  chatMessages.scrollTop = chatMessages.scrollHeight
}

