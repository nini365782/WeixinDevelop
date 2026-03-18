Component({
  properties: {
    categories: {
      type: Array,
      value: []
    },
    products: {
      type: Array,
      value: []
    }
  },

  data: {
    activeCategoryId: 1,
    groupedProducts: [],
    scrollIntoViewId: '',
    sectionTops: [],
    isScrollingByClick: false
  },

  lifetimes: {
    attached() {
      this.buildGroupedProducts()
    },
    ready() {
      this.measureSectionTops()
    }
  },

  observers: {
    'categories, products': function () {
      this.buildGroupedProducts()
    }
  },

  methods: {
    buildGroupedProducts() {
      const { categories, products, activeCategoryId } = this.data
      if (!categories || !products) return

      const grouped = categories
        .map(cat => ({
          id: cat.id,
          name: cat.name,
          products: products.filter(p => p.categoryId === cat.id)
        }))
        .filter(group => group.products.length)

      const firstId = grouped.length ? grouped[0].id : activeCategoryId

      this.setData({
        groupedProducts: grouped,
        activeCategoryId: firstId
      }, () => {
        this.measureSectionTops()
      })
    },

    measureSectionTops() {
      const query = this.createSelectorQuery().in(this)
      query.select('.product-panel').boundingClientRect()
      query.selectAll('.category-section').boundingClientRect()

      query.exec(res => {
        const scrollRect = res[0]
        const sections = res[1] || []
        if (!scrollRect || !sections.length) return

        const sectionTops = sections.map(sec => ({
          id: sec.dataset && sec.dataset.id != null ? sec.dataset.id : (sec.id || '').replace('cat-', ''),
          top: sec.top - scrollRect.top
        }))

        this.setData({
          sectionTops
        })
      })
    },

    handleCategoryChange(e) {
      const { id } = e.currentTarget.dataset
      this.setData({
        activeCategoryId: id,
        scrollIntoViewId: `cat-${id}`,
        isScrollingByClick: true
      })

      setTimeout(() => {
        this.setData({
          isScrollingByClick: false
        })
      }, 300)
    },

    handleProductScroll(e) {
      const scrollTop = e.detail.scrollTop
      const { sectionTops, isScrollingByClick, activeCategoryId } = this.data

      if (!sectionTops || !sectionTops.length || isScrollingByClick) return

      let currentId = activeCategoryId

      for (let i = 0; i < sectionTops.length; i++) {
        const curr = sectionTops[i]
        const next = sectionTops[i + 1]

        if (scrollTop >= curr.top && (!next || scrollTop < next.top)) {
          currentId = curr.id
          break
        }
      }

      if (currentId !== activeCategoryId) {
        this.setData({
          activeCategoryId: currentId
        })
      }
    },

    handleTapProduct(e) {
      const { id } = e.currentTarget.dataset
      this.triggerEvent('openDetail', { id })
    },

    handleDecreaseQuantity(e) {
      const { id, quantity } = e.currentTarget.dataset
      this.triggerEvent('changeQuantity', {
        id,
        quantity: Math.max(0, quantity - 1)
      })
    },

    handleIncreaseQuantity(e) {
      const { id, quantity } = e.currentTarget.dataset
      this.triggerEvent('changeQuantity', {
        id,
        quantity: quantity + 1
      })
    },

    noop() {}
  }
})
