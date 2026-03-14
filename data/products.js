const categories = [
  { id: 1, name: '晨曦系列' },
  { id: 2, name: '舒适哲学' },
  { id: 3, name: '格调生活' },
  { id: 4, name: '天丝磨毛' }
]

const products = [
  {
    id: 101,
    categoryId: 1,
    categoryName: '晨曦系列',
    name: '意式轻奢床品四件套',
    cover: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693531078-9cd222ba1d2d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['轻奢', '柔软', '亲肤'],
    desc: '甄选高支高密面料，手感细腻柔和，贴合现代卧室对于安静与质感的双重期待。低饱和配色让空间更加舒展，适合打造温柔、克制且有层次的居家氛围。',
    colors: ['绿色', '灰色', '蓝色'],
    story: '丝滑触感与自然垂坠感相互平衡，让床品在白天也像一件静置的软装陈设。无论是奶油风还是现代简约空间，都能形成稳定耐看的视觉中心。',
    specGroups: [
      {
        title: '标准款',
        lines: ['被套 200cm × 230cm 床单 250cm × 245cm 枕套 48cm × 74cm']
      },
      {
        title: '加大款',
        lines: ['被套 220cm × 240cm 床单 270cm × 245cm 枕套 48cm × 74cm']
      }
    ]
  },
  {
    id: 102,
    categoryId: 1,
    categoryName: '晨曦系列',
    name: '简约纯色床笠套装',
    cover: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['纯色', '舒适', '极简'],
    desc: '以克制的纯色语言平衡卧室视觉秩序，柔感面料带来干净清爽的日常睡眠体验。适合偏爱统一空间感与长期耐看风格的用户。',
    colors: ['米白', '浅灰'],
    story: '去掉多余装饰后，细节与材质会成为真正的主角。这套床笠套装更适合作为极简卧室的底色，让空间保持轻盈呼吸感。',
    specGroups: [
      {
        title: '标准款',
        lines: ['被套 200cm × 230cm 床单 250cm × 245cm 枕套 48cm × 74cm']
      },
      {
        title: '加大款',
        lines: ['被套 220cm × 240cm 床单 270cm × 245cm 枕套 48cm × 74cm']
      }
    ]
  },
  {
    id: 201,
    categoryId: 2,
    categoryName: '舒适哲学',
    name: '法式奶油风靠枕',
    cover: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['奶油风', '靠包', '治愈'],
    desc: '柔和廓形配合温润色调，适合放置在床头或沙发角落，快速提升空间层次。触感蓬松，视觉上松弛而不过度甜腻。',
    colors: ['奶油白', '暖驼色'],
    story: '像是一枚小体量的空间情绪点缀，能够在不打扰整体布局的情况下，给房间增加柔软和被照顾的感觉。',
    specGroups: [
      {
        title: '标准款',
        lines: ['被套 200cm × 230cm 床单 250cm × 245cm 枕套 48cm × 74cm']
      },
      {
        title: '加大款',
        lines: ['被套 220cm × 240cm 床单 270cm × 245cm 枕套 48cm × 74cm']
      }
    ]
  },
  {
    id: 301,
    categoryId: 3,
    categoryName: '格调生活',
    name: '现代风软装单品',
    cover: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['现代', '简洁', '百搭'],
    desc: '适合现代卧室空间搭配的单品选择，视觉轻、轮廓干净，能够与不同材质和色系顺畅融合。',
    colors: ['暖白'],
    story: '不刻意抢夺注意力，却能稳定空间调性，是适合作为长期陈设的一类单品。',
    specGroups: [
      {
        title: '标准款',
        lines: ['被套 200cm × 230cm 床单 250cm × 245cm 枕套 48cm × 74cm']
      },
      {
        title: '加大款',
        lines: ['被套 220cm × 240cm 床单 270cm × 245cm 枕套 48cm × 74cm']
      }
    ]
  },
  {
    id: 302,
    categoryId: 3,
    categoryName: '格调生活',
    name: '格纹质感床品组合',
    cover: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['格纹', '质感', '卧室搭配'],
    desc: '低饱和格纹设计在保留层次的同时不过分张扬，适合想为卧室增加一点设计感、又希望整体依旧耐看的用户。',
    colors: ['灰蓝格', '咖色格'],
    story: '细节感体现在织物纹理与配色关系里，近看有层次，远看依然克制，是更偏生活方式表达的一款组合。',
    specGroups: [
      {
        title: '标准款',
        lines: ['被套 200cm × 230cm 床单 250cm × 245cm 枕套 48cm × 74cm']
      },
      {
        title: '加大款',
        lines: ['被套 220cm × 240cm 床单 270cm × 245cm 枕套 48cm × 74cm']
      }
    ]
  },
  {
    id: 303,
    categoryId: 3,
    categoryName: '格调生活',
    name: '高级灰莫兰迪抱枕套装',
    cover: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['莫兰迪', '高级灰', '软装'],
    desc: '柔和的低饱和色系能够快速平衡卧室或客厅的视觉氛围，既适合单独点缀，也适合与现有床品组合叠搭。',
    colors: ['雾霾蓝', '暖灰', '奶咖'],
    story: '适合喜欢温柔克制配色的人群，让空间看起来更整洁，也更容易形成不易过时的家居风格。',
    specGroups: [
      {
        title: '标准款',
        lines: ['被套 200cm × 230cm 床单 250cm × 245cm 枕套 48cm × 74cm']
      },
      {
        title: '加大款',
        lines: ['被套 220cm × 240cm 床单 270cm × 245cm 枕套 48cm × 74cm']
      }
    ]
  },
  {
    id: 401,
    categoryId: 4,
    categoryName: '天丝磨毛',
    name: '天丝磨毛四件套',
    cover: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80'
    ],
    tags: ['天丝', '磨毛', '柔软亲肤'],
    desc: '天丝面料结合磨毛工艺，触感更加细腻顺滑，适合追求包裹感和柔润睡感的人群。整体观感温和，适合秋冬卧室氛围打造。',
    colors: ['浅奶咖', '雾霭灰'],
    story: '它的优势不只在于柔软，更在于一种安静的触感体验。铺陈在卧室里，会让空间显得更柔和、更有居住温度。',
    specGroups: [
      {
        title: '标准款',
        lines: ['被套 200cm × 230cm 床单 250cm × 245cm 枕套 48cm × 74cm']
      },
      {
        title: '加大款',
        lines: ['被套 220cm × 240cm 床单 270cm × 245cm 枕套 48cm × 74cm']
      }
    ]
  }
]

function normalizeProduct(product) {
  return {
    ...product,
    sizes: product.specGroups.map(item => item.title)
  }
}

module.exports = {
  categories,
  products: products.map(normalizeProduct)
}
