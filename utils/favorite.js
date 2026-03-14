const FAVORITE_STORAGE_KEY = 'favoriteProductIds'

function getFavorites() {
  try {
    const ids = wx.getStorageSync(FAVORITE_STORAGE_KEY)
    return Array.isArray(ids) ? ids : []
  } catch (error) {
    return []
  }
}

function saveFavorites(ids) {
  wx.setStorageSync(FAVORITE_STORAGE_KEY, ids)
}

function isFavorite(productId) {
  return getFavorites().includes(productId)
}

function toggleFavorite(productId) {
  const favorites = getFavorites()
  const exists = favorites.includes(productId)
  const nextFavorites = exists
    ? favorites.filter(id => id !== productId)
    : favorites.concat(productId)

  saveFavorites(nextFavorites)

  return {
    favorites: nextFavorites,
    isFavorite: !exists
  }
}

module.exports = {
  FAVORITE_STORAGE_KEY,
  getFavorites,
  isFavorite,
  toggleFavorite
}
