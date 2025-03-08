// Store and cart functions
let cart = []

// Initialize cart
document.addEventListener("DOMContentLoaded", () => {
  // Load cart from localStorage
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
  }

  // Update cart count if element exists
  updateCartCount()
})

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count")
  if (cartCountElement) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartCountElement.textContent = totalItems

    // Show/hide based on count
    if (totalItems > 0) {
      cartCountElement.style.display = "block"
    } else {
      cartCountElement.style.display = "none"
    }
  }
}

function addToCart(productId, productName, price, discount = 0, image = "/placeholder.svg?height=80&width=80") {
  // Add the product to cart
  const product = {
    id: productId,
    name: productName,
    price: price,
    discount: discount,
    quantity: 1,
    image: image,
  }

  // Check if product already in cart
  const existingProductIndex = cart.findIndex((item) => item.id === product.id)
  if (existingProductIndex >= 0) {
    cart[existingProductIndex].quantity += 1
  } else {
    cart.push(product)
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  // Show confirmation
  alert("Product added to cart!")
}

function buyNow(productId, productName, price, discount = 0, image = "/placeholder.svg?height=80&width=80") {
  // Add to cart and navigate to order summary
  addToCart(productId, productName, price, discount, image)
  window.location.href = "order-summary.html"
}

function removeFromCart(productId) {
  // Remove the product from cart
  cart = cart.filter((item) => item.id !== productId)

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  // Refresh cart display if on cart page
  if (window.location.pathname.indexOf("cart.html") !== -1) {
    displayCart()
  }
}

function updateQuantity(productId, newQuantity) {
  // Find the product in cart
  const productIndex = cart.findIndex((item) => item.id === productId)

  if (productIndex >= 0) {
    if (newQuantity <= 0) {
      // Remove product if quantity is 0 or less
      removeFromCart(productId)
    } else {
      // Update quantity
      cart[productIndex].quantity = newQuantity

      // Save cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart))

      // Update cart count
      updateCartCount()

      // Refresh cart display if on cart page
      if (
        window.location.pathname.indexOf("cart.html") !== -1 ||
        window.location.pathname.indexOf("order-summary.html") !== -1
      ) {
        displayCart()
      }
    }
  }
}

function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items")
  if (!cartItemsContainer) return

  // Clear container
  cartItemsContainer.innerHTML = ""

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>'
    return
  }

  // Calculate totals
  let subtotal = 0
  let totalDiscount = 0

  // Add each item to the container
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    const itemDiscount = item.discount * item.quantity

    subtotal += itemTotal
    totalDiscount += itemDiscount

    const itemElement = document.createElement("div")
    itemElement.className = "cart-item"
    itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <div class="item-price">
                    <span class="price">Rs. ${item.price}</span>
                    ${item.discount > 0 ? `<span class="discount">(${Math.round((item.discount / item.price) * 100)}% off)</span>` : ""}
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                <i class="fas fa-trash"></i>
            </button>
        `

    cartItemsContainer.appendChild(itemElement)
  })

  // Update summary if it exists
  const subtotalElement = document.getElementById("subtotal")
  const discountElement = document.getElementById("discount")
  const totalElement = document.getElementById("total")

  if (subtotalElement) subtotalElement.textContent = `₹${subtotal}`
  if (discountElement) discountElement.textContent = `-₹${totalDiscount}`
  if (totalElement) totalElement.textContent = `₹${subtotal - totalDiscount}`
}

function placeOrder() {
  // In a real app, this would send the order to an API
  // For demo purposes, we'll just show a confirmation and clear the cart
  alert("Order placed successfully!")
  cart = []
  localStorage.removeItem("cart")
  window.location.href = "home.html"
}

