const { products } = require('../../../data/products')
const { isFavorite, toggleFavorite } = require('../../../utils/favorite')

const SPEC_LABELS = ['\u88ab\u5957', '\u5e8a\u5355', '\u6795\u5957']
const PALETTE_COLORS = [
  '#a8b39d',
  '#d7d7d9',
  '#9cafbf',
  '#efe9dc',
  '#d2d4d7',
  '#f4ecdf',
  '#c8ab90',
  '#f5f0e8',
  '#8da0af',
  '#a78f7e',
  '#8fa6b4',
  '#b9b1aa'
]

function buildColorPalette(colors = []) {
  return colors.map((name, index) => ({
    name,
    swatchStyle: `background:${PALETTE_COLORS[index % PALETTE_COLORS.length]};`
  }))
}

function buildColorPaletteFromOptions(colorOptions = [], fallbackColors = []) {
  if (colorOptions.length) {
    return colorOptions.map((item, index) => ({
      name: item.name,
      swatchStyle: `background:${item.color || PALETTE_COLORS[index % PALETTE_COLORS.length]};`
    }))
  }

  return buildColorPalette(fallbackColors)
}

function parseSpecLine(line = '') {
  const matches = line.match(/(\d+\s*cm\s*[xX\u00d7\u8133]\s*\d+\s*cm)/g) || []

  return SPEC_LABELS.map((label, index) => ({
    label,
    value: matches[index]
      ? matches[index].replace(/[xX\u8133]/g, '\u00d7').replace(/\s+/g, '')
      : '--'
  }))
}

function buildSpecTable(specGroups = []) {
  const columns = specGroups.map(group => ({
    title: group.title,
    values: parseSpecLine((group.lines || [])[0] || '')
  }))

  return SPEC_LABELS.map((label, rowIndex) => ({
    label,
    values: columns.map(column => (column.values[rowIndex] ? column.values[rowIndex].value : '--'))
  }))
}

function decorateProduct(product) {
  if (!product) return null

  return {
    ...product,
    colorPalette: buildColorPaletteFromOptions(product.colorOptions || [], product.colors),
    specColumns: (product.specGroups || []).map(item => item.title),
    specRows: buildSpecTable(product.specGroups)
  }
}

Page({
  data: {
    product: null,
    isFavorite: false
  },

  onLoad(options) {
    const id = Number(options.id)
    const product = decorateProduct(products.find(item => item.id === id) || null)

    if (!product) {
      wx.showToast({
        title: '\u672a\u627e\u5230\u8be5\u5546\u54c1',
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
      title: '\u5206\u4eab\u529f\u80fd\u656c\u8bf7\u671f\u5f85',
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
      title: product ? product.name : '\u5546\u54c1\u8be6\u60c5',
      path: product ? `/pages/product/detail/index?id=${product.id}` : '/pages/product/product'
    }
  }
})
