const { products } = require('../../data/products')

function getHomeProducts() {
  return products.filter(item => item.showOnHome)
}

Page({
  data: {
    featuredProducts: [],
    playEntranceMotion: false
  },

  motionTimer: null,

  onLoad() {
    this.syncHomeProducts()
  },

  onShow() {
    const tabBar = this.getTabBar && this.getTabBar()
    if (tabBar) {
      tabBar.setData({
        selected: 0
      })
    }

    this.syncHomeProducts()
    this.restartEntranceMotion()
  },

  syncHomeProducts() {
    this.setData({
      featuredProducts: getHomeProducts()
    })
  },

  restartEntranceMotion() {
    if (this.motionTimer) {
      clearTimeout(this.motionTimer)
    }

    this.setData({
      playEntranceMotion: false
    })

    this.motionTimer = setTimeout(() => {
      this.setData({
        playEntranceMotion: true
      })

      this.motionTimer = null
    }, 30)
  },

  onHide() {
    if (this.motionTimer) {
      clearTimeout(this.motionTimer)
      this.motionTimer = null
    }
  },

  onUnload() {
    if (this.motionTimer) {
      clearTimeout(this.motionTimer)
      this.motionTimer = null
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
  },

  handleOpenProductDetail(e) {
    const { id } = e.currentTarget.dataset
    if (!id) return

    wx.navigateTo({
      url: `/pages/product/detail/index?id=${id}`
    })
  }
})
