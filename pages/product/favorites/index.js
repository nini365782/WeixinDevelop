const { products } = require('../../../data/products')
const { getFavorites, clearFavorites, toggleFavorite } = require('../../../utils/favorite')

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
    favoriteCount: 0,
    isEmpty: true
  },

  onShow() {
    this.syncFavorites()
  },

  syncFavorites() {
    const favoriteProducts = buildFavoriteProducts()

    this.setData({
      products: favoriteProducts,
      favoriteCount: favoriteProducts.length,
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

  handleClearFavorites() {
    if (this.data.isEmpty) return

    wx.showModal({
      title: '清空心愿单',
      content: '确认清空全部收藏商品吗？',
      confirmText: '清空',
      confirmColor: '#c53b2a',
      success: res => {
        if (!res.confirm) return

        clearFavorites()
        this.syncFavorites()
      }
    })
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
