import { ref, computed, watch } from 'vue'

const cart = ref(JSON.parse(localStorage.getItem('app_cart') || '[]'))
const wishlist = ref(JSON.parse(localStorage.getItem('app_wishlist') || '[]'))
const orders = ref(JSON.parse(localStorage.getItem('app_orders') || '[]'))
const customReviews = ref(JSON.parse(localStorage.getItem('app_reviews') || '{}'))

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

watch(cart, (newVal) => {
  localStorage.setItem('app_cart', JSON.stringify(newVal))
}, { deep: true })

watch(wishlist, (newVal) => {
  localStorage.setItem('app_wishlist', JSON.stringify(newVal))
}, { deep: true })

watch(orders, (newVal) => {
  localStorage.setItem('app_orders', JSON.stringify(newVal))
}, { deep: true })

watch(customReviews, (newVal) => {
  localStorage.setItem('app_reviews', JSON.stringify(newVal))
}, { deep: true })

export function useShop() {
  const cartCount = computed(() => cart.value.reduce((acc, item) => acc + item.quantity, 0))
  const wishlistCount = computed(() => wishlist.value.length)
  const cartTotal = computed(() => cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0))

  function addToCart(product) {
    const existing = cart.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
    showToast(`${product.name} added to cart!`, 'success')
  }

  function removeFromCart(id) {
    cart.value = cart.value.filter(item => item.id !== id)
    showToast('Item removed from cart', 'info')
  }

  function updateQuantity(id, delta) {
    const item = cart.value.find(i => i.id === id)
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) {
        removeFromCart(id)
      }
    }
  }

  function toggleWishlist(product) {
    const index = wishlist.value.findIndex(item => item.id === product.id)
    if (index > -1) {
      wishlist.value.splice(index, 1)
      showToast('Removed from Wishlist', 'error')
    } else {
      wishlist.value.push(product)
      showToast('Added to Wishlist!', 'success')
    }
  }

  function isInWishlist(id) {
    return wishlist.value.some(item => item.id === id)
  }

  function saveOrder(orderDetails) {
    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [...cart.value],
      total: cartTotal.value,
      shippingInfo: { ...orderDetails }
    }
    orders.value.unshift(newOrder)
    cart.value = []
  }

  function addReview(productId, reviewObj) {
    if (!customReviews.value[productId]) {
      customReviews.value[productId] = []
    }
    customReviews.value[productId].unshift({
      ...reviewObj,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    })
    showToast('Thank you for your review!', 'success')
  }

  function getProductReviews(productId) {
    const defaultReviews = [
      { name: 'Sami A.', rating: 5, comment: 'High quality product, worked as expected!', date: 'Jan 15, 2026' },
      { name: 'Lina M.', rating: 4, comment: 'Fast shipping and solid build.', date: 'Feb 02, 2026' }
    ]
    const userAdded = customReviews.value[productId] || []
    return [...userAdded, ...defaultReviews]
  }

  function showToast(text, color = 'success') {
    snackbar.value = { show: true, text, color }
  }

  return {
    cart,
    wishlist,
    orders,
    cartCount,
    wishlistCount,
    cartTotal,
    snackbar,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    saveOrder,
    addReview,
    getProductReviews
  }
}