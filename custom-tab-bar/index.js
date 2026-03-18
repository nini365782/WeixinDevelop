Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconClass: 'material-symbols-light--home-outline'
      },
      {
        pagePath: '/pages/product/product',
        text: '产品',
        iconClass: 'material-symbols-light--home-storage-outline'
      },
      {
        pagePath: '/pages/purchase/purchase',
        text: '商城',
        iconClass: 'material-symbols-light--shopping-bag-outline'
      },
      {
        pagePath: '/pages/profile/index',
        text: '我的',
        iconClass: 'material-symbols-light--person-outline'
      }
    ]
  },

  lifetimes: {
    attached() {
      this.updateSelected()
    }
  },

  pageLifetimes: {
    show() {
      this.updateSelected()
    }
  },

  methods: {
    updateSelected() {
      const pages = getCurrentPages()
      const current = pages[pages.length - 1]
      const route = current ? `/${current.route}` : ''
      const selected = this.data.list.findIndex(item => item.pagePath === route)

      this.setData({
        selected: selected >= 0 ? selected : 0
      })
    },

    switchTab(e) {
      const { path, index } = e.currentTarget.dataset
      if (!path || index === this.data.selected) return

      this.setData({
        selected: Number(index)
      })

      wx.switchTab({
        url: path
      })
    }
  }
})
