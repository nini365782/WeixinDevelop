Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    detailData: {
      type: Object,
      value: {
        id: 0,
        images: [],
        tags: [],
        sizes: [],
        colors: [],
        price: 0
      }
    }
  },

  data: {
    selectedSize: '',
    selectedColor: '',
    quantity: 1,
    currentSwiper: 0
  },

  observers: {
    detailData(newVal) {
      if (!newVal) return
      const sizes = newVal.sizes || []
      const colors = newVal.colors || []

      this.setData({
        selectedSize: sizes.length ? sizes[0] : '',
        selectedColor: colors.length ? colors[0] : '',
        quantity: 1,
        currentSwiper: 0
      })
    }
  },

  methods: {
    handleClose() {
      this.triggerEvent('close')
    },

    handleSwiperChange(e) {
      this.setData({
        currentSwiper: e.detail.current
      })
    },

    handlePreviewImage(e) {
      const { current } = e.currentTarget.dataset
      const images = this.data.detailData.images || []
      wx.previewImage({
        current,
        urls: images
      })
    },

    handleSelectSize(e) {
      this.setData({
        selectedSize: e.currentTarget.dataset.value
      })
    },

    handleSelectColor(e) {
      this.setData({
        selectedColor: e.currentTarget.dataset.value
      })
    },

    handleDecreaseQuantity() {
      this.setData({
        quantity: Math.max(1, this.data.quantity - 1)
      })
    },

    handleIncreaseQuantity() {
      this.setData({
        quantity: this.data.quantity + 1
      })
    },

    handleAddToCart() {
      const { detailData, quantity, selectedSize, selectedColor } = this.data
      this.triggerEvent('addToCart', {
        id: detailData.id,
        quantity,
        selectedSize,
        selectedColor
      })
    },

    handleBuyNow() {
      const { detailData, quantity, selectedSize, selectedColor } = this.data
      this.triggerEvent('buyNow', {
        id: detailData.id,
        quantity,
        selectedSize,
        selectedColor
      })
    },

    noop() {}
  }
})
