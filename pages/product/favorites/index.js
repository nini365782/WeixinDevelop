const { products } = require('../../../data/products')
const { getFavorites, toggleFavorite } = require('../../../utils/favorite')

function buildFavoriteProducts() {
  const favoriteIds = getFavorites()

  return products
    .filter(item => favoriteIds.includes(item.id))
    .map(item => ({
      ...item,
      isFavorite: true
    }))
}

Page({
  data: {
    products: [],
    isEmpty: true
  },

  onShow() {
    this.syncFavorites()
  },

  syncFavorites() {
    const favoriteProducts = buildFavoriteProducts()

    this.setData({
      products: favoriteProducts,
      isEmpty: favoriteProducts.length === 0
    })
  },

  handleBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack({
        delta: 1
      })
      return
    }

    wx.switchTab({
      url: '/pages/product/product'
    })
  },

  handleOpenDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/product/detail/index?id=${id}`
    })
  },

  handleToggleFavorite(e) {
    const { id } = e.currentTarget.dataset
    toggleFavorite(id)
    this.syncFavorites()
  },

  handleShareTap() {
    wx.showToast({
      title: '分享功能预留中',
      icon: 'none'
    })
  },

  onShareAppMessage() {
    return {
      title: '我的心愿单',
      path: '/pages/product/favorites/index'
    }
  }
})
