// Navigation functions
function navigateTo(page) {
  // Save current page to session storage for back button functionality
  const currentPage = window.location.pathname.split("/").pop()
  if (currentPage !== page) {
    sessionStorage.setItem("previousPage", currentPage)
  }

  // Navigate to the new page
  window.location.href = page
}

function goBack() {
  console.log("go back is called")


    // Default fallback if no previous page is stored
    navigateTo("../home/home.html")
  
}

// Set active navigation item based on current page
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop()
  const navItems = document.querySelectorAll(".nav-item")

  navItems.forEach((item) => {
    const pageLink = item.getAttribute("data-page")
    if (pageLink === currentPage) {
      item.classList.add("active")
    } else {
      item.classList.remove("active")
    }
  })

  // Add click event listeners to navigation items
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const pageToNavigate = this.getAttribute("data-page")
      navigateTo(pageToNavigate)
    })
  })

  // Add click event listeners to back buttons
  const backButtons = document.querySelectorAll(".back-button")
  backButtons.forEach((button) => {
    button.addEventListener("click", goBack)
  })
})

