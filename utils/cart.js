const CART_STORAGE_KEY = 'purchaseCartItems'

function getCartItems() {
  const cart = wx.getStorageSync(CART_STORAGE_KEY)
  return Array.isArray(cart) ? cart : []
}

function setCartItems(cartItems) {
  wx.setStorageSync(CART_STORAGE_KEY, cartItems)
  return cartItems
}

function getCartCount() {
  return getCartItems().reduce((sum, item) => sum + (item.quantity || 0), 0)
}

function getProductQuantity(productId) {
  return getCartItems()
    .filter(item => item.productId === productId)
    .reduce((sum, item) => sum + (item.quantity || 0), 0)
}

function addToCart(product, options = {}) {
  const {
    quantity = 1,
    selectedSize = '',
    selectedColor = ''
  } = options

  const cartItems = getCartItems()
  const existingIndex = cartItems.findIndex(item =>
    item.productId === product.id &&
    item.selectedSize === selectedSize &&
    item.selectedColor === selectedColor
  )

  if (existingIndex > -1) {
    cartItems[existingIndex].quantity += quantity
  } else {
    cartItems.push({
      productId: product.id,
      name: product.name,
      cover: product.cover,
      price: product.price,
      quantity,
      selectedSize,
      selectedColor
    })
  }

  setCartItems(cartItems)
  return {
    cartItems,
    count: getCartCount()
  }
}

function setProductQuantity(product, quantity) {
  const cartItems = getCartItems().filter(item => item.productId !== product.id)

  if (quantity > 0) {
    cartItems.push({
      productId: product.id,
      name: product.name,
      cover: product.cover,
      price: product.price,
      quantity,
      selectedSize: '',
      selectedColor: ''
    })
  }

  setCartItems(cartItems)
  return {
    cartItems,
    count: getCartCount()
  }
}

function updateCartItem(index, quantity) {
  const cartItems = getCartItems()
  if (index < 0 || index >= cartItems.length) return cartItems

  if (quantity <= 0) {
    cartItems.splice(index, 1)
  } else {
    cartItems[index] = {
      ...cartItems[index],
      quantity
    }
  }

  return setCartItems(cartItems)
}

function clearCart() {
  return setCartItems([])
}

module.exports = {
  addToCart,
  clearCart,
  getCartCount,
  getCartItems,
  getProductQuantity,
  setProductQuantity,
  updateCartItem
}
