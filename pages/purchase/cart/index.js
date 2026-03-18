const { clearCart, getCartItems, updateCartItem } = require('../../../utils/cart')

function buildCartData() {
  const items = getCartItems()
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    totalPrice,
    totalCount,
    isEmpty: items.length === 0
  }
}

Page({
  data: {
    items: [],
    totalPrice: 0,
    totalCount: 0,
    isEmpty: true
  },

  onShow() {
    this.syncCart()
  },

  syncCart() {
    this.setData(buildCartData())
  },

  handleDecrease(e) {
    const { index, quantity } = e.currentTarget.dataset
    updateCartItem(index, quantity - 1)
    this.syncCart()
  },

  handleIncrease(e) {
    const { index, quantity } = e.currentTarget.dataset
    updateCartItem(index, quantity + 1)
    this.syncCart()
  },

  handleCheckout() {
    if (this.data.isEmpty) return

    wx.showToast({
      title: '\u4E0B\u5355\u6D41\u7A0B\u5F85\u8865\u5145',
      icon: 'none'
    })
  },

  handleClearCart() {
    clearCart()
    this.syncCart()
  }
})
