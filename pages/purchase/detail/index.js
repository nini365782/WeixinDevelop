Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    detailData: {
      type: Object,
      value: {
        images: [],
        tags: [],
        sizes: [],
        colors: []
      }
    }
  },

  data: {
    selectedSize: '',
    selectedColor: '',
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
      const { value } = e.currentTarget.dataset
      this.setData({
        selectedSize: value
      })
    },

    handleSelectColor(e) {
      const { value } = e.currentTarget.dataset
      this.setData({
        selectedColor: value
      })
    },

    noop() {}
  }
})

