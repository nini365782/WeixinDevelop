const { products } = require('../../../data/products')
const { isFavorite, toggleFavorite } = require('../../../utils/favorite')

Page({
  data: {
    product: null,
    isFavorite: false
  },

  onLoad(options) {
    const id = Number(options.id)
    const product = products.find(item => item.id === id) || null

    if (!product) {
      wx.showToast({
        title: '未找到该商品',
        icon: 'none'
      })

      return
    }

    this.setData({
      product
    })
  },

  onShow() {
    const { product } = this.data
    if (!product) return

    this.setData({
      isFavorite: isFavorite(product.id)
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

  handleToggleFavorite() {
    const { product } = this.data
    if (!product) return

    const result = toggleFavorite(product.id)
    this.setData({
      isFavorite: result.isFavorite
    })
  },

  handleShareTap() {
    wx.showToast({
      title: '分享功能敬请期待',
      icon: 'none'
    })
  },

  handlePreviewImage(e) {
    const { current } = e.currentTarget.dataset
    const { product } = this.data

    wx.previewImage({
      current,
      urls: product.images
    })
  },

  onShareAppMessage() {
    const { product } = this.data

    return {
      title: product ? product.name : '商品详情',
      path: product ? `/pages/product/detail/index?id=${product.id}` : '/pages/product/product'
    }
  }
})
