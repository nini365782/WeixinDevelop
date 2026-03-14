const { categories, products } = require('../../data/products')
const { getFavorites, toggleFavorite } = require('../../utils/favorite')

function buildCategoryTabs() {
  return [{ id: 0, name: '全部系列' }].concat(categories)
}

function decorateProducts(productList, favoriteIds) {
  return productList.map(item => ({
    ...item,
    isFavorite: favoriteIds.includes(item.id)
  }))
}

Page({
  data: {
    categories: buildCategoryTabs(),
    products: [],
    searchValue: '',
    searchKeyword: '',
    activeCategoryId: 0,
    resultCount: 0,
    isEmpty: false
  },

  onLoad() {
    this.syncProducts()
  },

  onShow() {
    this.syncProducts()
  },

  syncProducts() {
    const favoriteIds = getFavorites()
    const decoratedProducts = decorateProducts(products, favoriteIds)
    const filteredProducts = this.filterProducts(
      decoratedProducts,
      this.data.activeCategoryId,
      this.data.searchKeyword
    )

    this.setData({
      products: filteredProducts,
      resultCount: filteredProducts.length,
      isEmpty: filteredProducts.length === 0
    })
  },

  filterProducts(productList, activeCategoryId, searchKeyword) {
    const keyword = (searchKeyword || '').trim().toLowerCase()

    return productList.filter(item => {
      const matchCategory = activeCategoryId === 0 || item.categoryId === activeCategoryId
      const content = [item.name, item.categoryName].join(' ').toLowerCase()
      const matchKeyword = !keyword || content.includes(keyword)
      return matchCategory && matchKeyword
    })
  },

  handleSearchInput(e) {
    const value = e.detail.value

    this.setData({
      searchValue: value
    })

    this.applyFilters({
      searchKeyword: value
    })
  },

  handleConfirmSearch() {
    this.applyFilters({
      searchKeyword: this.data.searchValue
    })
  },

  handleTapSearch() {
    this.handleConfirmSearch()
  },

  handleCategoryTap(e) {
    const { id } = e.currentTarget.dataset
    this.applyFilters({
      activeCategoryId: id
    })
  },

  applyFilters(nextState) {
    const activeCategoryId = nextState.activeCategoryId !== undefined
      ? nextState.activeCategoryId
      : this.data.activeCategoryId
    const searchKeyword = nextState.searchKeyword !== undefined
      ? nextState.searchKeyword
      : this.data.searchKeyword
    const favoriteIds = getFavorites()
    const decoratedProducts = decorateProducts(products, favoriteIds)
    const filteredProducts = this.filterProducts(decoratedProducts, activeCategoryId, searchKeyword)

    this.setData({
      ...nextState,
      products: filteredProducts,
      resultCount: filteredProducts.length,
      isEmpty: filteredProducts.length === 0
    })
  },

  handleOpenFavorites() {
    wx.navigateTo({
      url: '/pages/product/favorites/index'
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
    this.syncProducts()
  },

  onShareAppMessage() {
    return {
      title: '丝兰臻家产品页',
      path: '/pages/product/product'
    }
  }
})
