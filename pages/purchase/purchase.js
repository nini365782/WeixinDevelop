const { categories, products } = require('../../data/products')
const { addToCart, getCartCount, getProductQuantity, setProductQuantity } = require('../../utils/cart')

function decorateProducts(productList, searchValue) {
  const keyword = (searchValue || '').trim().toLowerCase()

  return productList
    .map(item => ({
      ...item,
      cartQuantity: getProductQuantity(item.id)
    }))
    .filter(item => {
      if (!keyword) return true

      return [
        item.name,
        item.categoryName,
        ...(item.tags || [])
      ]
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    })
}

Page({
  data: {
    categories,
    products: [],
    searchValue: '',
    cartCount: 0,
    showDetail: false,
    detailData: null
  },

  onShow() {
    const tabBar = this.getTabBar && this.getTabBar()
    if (tabBar) {
      tabBar.setData({
        selected: 2
      })
    }

    this.syncProducts()
  },

  syncProducts() {
    const { searchValue } = this.data

    this.setData({
      products: decorateProducts(products, searchValue),
      cartCount: getCartCount()
    })
  },

  handleSearchInput(e) {
    this.setData({
      searchValue: e.detail.value
    }, () => {
      this.syncProducts()
    })
  },

  handleOpenCart() {
    wx.navigateTo({
      url: '/pages/purchase/cart/index'
    })
  },

  handleOpenDetail(e) {
    const { id } = e.detail
    const product = products.find(item => item.id === id)
    if (!product) return

    this.setData({
      showDetail: true,
      detailData: {
        ...product,
        cartQuantity: getProductQuantity(product.id)
      }
    })
  },

  handleCloseDetail() {
    this.setData({
      showDetail: false,
      detailData: null
    })
  },

  handleChangeQuantity(e) {
    const { id, quantity } = e.detail
    const product = products.find(item => item.id === id)
    if (!product) return

    setProductQuantity(product, quantity)
    this.syncProducts()
  },

  handleAddToCart(e) {
    const { id, quantity, selectedSize, selectedColor } = e.detail
    const product = products.find(item => item.id === id)
    if (!product) return

    addToCart(product, {
      quantity,
      selectedSize,
      selectedColor
    })

    wx.showToast({
      title: '\u5DF2\u52A0\u5165\u8D2D\u7269\u8F66',
      icon: 'success'
    })

    this.syncProducts()
    this.handleCloseDetail()
  },

  handleBuyNow(e) {
    this.handleAddToCart(e)
    wx.navigateTo({
      url: '/pages/purchase/cart/index'
    })
  }
})
