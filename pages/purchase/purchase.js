const { categories, products } = require('../../data/products')

Page({
  data: {
    categories,
    products,
    showDetail: false,
    detailData: null
  },

  handleOpenDetail(e) {
    const { id } = e.detail
    const product = this.data.products.find(item => item.id === id)

    if (!product) return

    this.setData({
      showDetail: true,
      detailData: product
    })
  },

  handleCloseDetail() {
    this.setData({
      showDetail: false,
      detailData: null
    })
  },

  noop() {}
})