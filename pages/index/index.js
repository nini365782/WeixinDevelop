Page({
  onShow() {
    const tabBar = this.getTabBar && this.getTabBar()
    if (tabBar) {
      tabBar.setData({
        selected: 0
      })
    }
  },

  goToProduct() {
    wx.switchTab({
      url: '/pages/product/product'
    })
  },

  goToPurchase() {
    wx.switchTab({
      url: '/pages/purchase/purchase'
    })
  }
})
