Page({
  onShow() {
    const tabBar = this.getTabBar && this.getTabBar()
    if (tabBar) {
      tabBar.setData({
        selected: 3
      })
    }
  },

  handleOpenOrders() {
    wx.navigateTo({
      url: '/pages/profile/orders/index'
    })
  },

  handleOpenFavorites() {
    wx.navigateTo({
      url: '/pages/product/favorites/index'
    })
  },

  handleOpenCart() {
    wx.navigateTo({
      url: '/pages/purchase/cart/index'
    })
  }
})
