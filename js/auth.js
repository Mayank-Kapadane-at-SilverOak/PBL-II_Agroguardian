// User authentication functions
let currentUser = null

// Initialize auth state
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)

    // Update UI elements if they exist
    const userNameElement = document.getElementById("user-name")
    if (userNameElement) {
      userNameElement.textContent = currentUser.name
    }

    const profileNameElement = document.querySelector(".profile-name")
    if (profileNameElement) {
      profileNameElement.textContent = currentUser.name
    }

    const profileEmailElement = document.querySelector(".profile-email")
    if (profileEmailElement) {
      profileEmailElement.textContent = currentUser.email
    }
  } else if (
    window.location.pathname.indexOf("login.html") === -1 &&
    window.location.pathname.indexOf("signup.html") === -1 &&
    window.location.pathname.indexOf("splash.html") === -1
  ) {
    // Redirect to login if not authenticated and not already on auth pages
    window.location.href = "../Log_in/login.html"
  }
})

function login() {
  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  // Simple validation
  if (!email || !password) {
    alert("Please fill in all fields")
    return
  }

  // Mock login - in a real app, this would call an API
  currentUser = {
    name: "Haresh Patel",
    email: email,
    id: "user123",
  }

  // Save user to localStorage
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  // Navigate to home screen
  window.location.href = "../Home/home.html"
}

function signup() {
  const name = document.getElementById("signup-name").value
  const email = document.getElementById("signup-email").value
  const password = document.getElementById("signup-password").value

  // Simple validation
  if (!name || !email || !password) {
    alert("Please fill in all fields")
    return
  }

  // Mock signup - in a real app, this would call an API
  currentUser = {
    name: name,
    email: email,
    id: "user" + Math.floor(Math.random() * 1000),
  }

  // Save user to localStorage
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  // Navigate to home screen
  window.location.href = "../Home/home.html"
}

function logout() {
  // Clear user data
  currentUser = null
  localStorage.removeItem("currentUser")

  // Navigate to login screen
  window.location.href = "../Log_in/login.html"
}

