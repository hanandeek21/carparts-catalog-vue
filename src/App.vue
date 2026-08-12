<template>
  <v-app class="app-background">
    <!-- Navbar -->
    <v-app-bar app class="custom-navbar px-md-4" elevation="1">
      <v-container class="d-flex align-center py-0">
        <v-app-bar-title class="text-h6 font-weight-black d-flex align-center">
          <v-icon icon="mdi-engine" color="amber-darken-2" class="mr-2" size="large" />
          <span class="tracking-wide text-dark">AUTO<span class="text-accent">PARTS</span></span>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon class="mr-1 text-dark" @click="isOrdersOpen = true">
          <v-badge color="grey-darken-4" :content="orders.length" text-color="white" v-if="orders.length > 0">
            <v-icon icon="mdi-history"></v-icon>
          </v-badge>
          <v-icon icon="mdi-history" v-else></v-icon>
        </v-btn>

        <v-btn icon class="mr-1 text-dark" @click="isWishlistOpen = true">
          <v-badge color="amber-darken-2" :content="wishlistCount" text-color="black">
            <v-icon icon="mdi-heart-outline"></v-icon>
          </v-badge>
        </v-btn>

        <v-btn icon class="btn-dark-custom ml-2" variant="flat" @click="isCartOpen = true">
          <v-badge color="error" :content="cartCount">
            <v-icon icon="mdi-cart-outline" color="white"></v-icon>
          </v-badge>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <!-- Hero Section -->
      <section class="hero-section text-white py-12 px-4">
        <v-container>
          <v-row align="center">
            <v-col cols="12" md="7">
              <v-chip class="mb-3 font-weight-bold custom-chip" size="small">
                PREMIUM AUTO SUPPLIES
              </v-chip>
              <h1 class="text-h3 font-weight-black mb-4 text-dark-title">
                Upgrade Your Ride With OEM & Quality Parts
              </h1>
              <p class="text-body-1 text-grey-darken-2 mb-6">
                Explore our wide range of original car spare parts and premium interior/exterior accessories.
              </p>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Guarantees -->
      <v-container class="mt-n6">
        <v-card elevation="2" rounded="xl" class="pa-4 bg-white border-card">
          <v-row no-gutters justify="space-between" align="center">
            <v-col cols="6" md="3" class="d-flex align-center pa-2">
              <v-icon icon="mdi-truck-fast-outline" color="grey-darken-4" size="36" class="mr-3" />
              <div>
                <div class="font-weight-bold text-subtitle-2 text-dark">Fast Express Delivery</div>
                <div class="text-caption text-grey">On all orders</div>
              </div>
            </v-col>
            <v-col cols="6" md="3" class="d-flex align-center pa-2">
              <v-icon icon="mdi-shield-check-outline" color="grey-darken-4" size="36" class="mr-3" />
              <div>
                <div class="font-weight-bold text-subtitle-2 text-dark">100% Genuine Parts</div>
                <div class="text-caption text-grey">Guaranteed quality</div>
              </div>
            </v-col>
            <v-col cols="6" md="3" class="d-flex align-center pa-2">
              <v-icon icon="mdi-headset" color="grey-darken-4" size="36" class="mr-3" />
              <div>
                <div class="font-weight-bold text-subtitle-2 text-dark">24/7 Support</div>
                <div class="text-caption text-grey">Expert assistance</div>
              </div>
            </v-col>
            <v-col cols="6" md="3" class="d-flex align-center pa-2">
              <v-icon icon="mdi-cached" color="grey-darken-4" size="36" class="mr-3" />
              <div>
                <div class="font-weight-bold text-subtitle-2 text-dark">Easy Returns</div>
                <div class="text-caption text-grey">30 days money-back</div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <!-- Search & Filters -->
      <v-container class="mt-8">
        <v-card class="pa-4 mb-6 border-card" elevation="1" rounded="xl">
          <v-row align="center">
            <v-col cols="12" md="5">
              <v-text-field
                v-model="searchQuery"
                label="Search by part or accessory name..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="comfortable"
                clearable
                hide-details
                bg-color="white"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="selectedCategory"
                :items="categories"
                label="Select Category"
                prepend-inner-icon="mdi-filter-variant"
                variant="outlined"
                density="comfortable"
                hide-details
                bg-color="white"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                label="Sort By"
                prepend-inner-icon="mdi-sort"
                variant="outlined"
                density="comfortable"
                hide-details
                bg-color="white"
              ></v-select>
            </v-col>
          </v-row>
        </v-card>

        <!-- Product Grid -->
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold text-dark">Catalog Items</h2>
          <span class="text-body-2 text-grey">Showing {{ filteredProducts.length }} items</span>
        </div>

        <v-row v-if="filteredProducts.length > 0">
          <v-col
            v-for="product in filteredProducts"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <ProductCard
              :product="product"
              :is-favorite="isInWishlist(product.id)"
              @add-to-cart="addToCart"
              @toggle-wishlist="toggleWishlist"
              @open-details="openDetails"
            />
          </v-col>
        </v-row>

        <v-card v-else class="text-center py-12 rounded-xl border-card" variant="outlined">
          <v-icon icon="mdi-magnify-remove-outline" size="64" color="grey-darken-1" class="mb-3"></v-icon>
          <h3 class="text-h6 text-grey-darken-2 font-weight-bold mb-1">No Parts Found</h3>
          <p class="text-body-2 text-grey">Try adjusting your search query or selected category filter.</p>
        </v-card>
      </v-container>

      <!-- Product Dialog & Reviews -->
      <v-dialog v-model="dialog" max-width="700">
        <v-card rounded="xl" v-if="selectedProduct" class="overflow-hidden">
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-img :src="selectedProduct.image" height="100%" min-height="280" cover></v-img>
            </v-col>
            <v-col cols="12" md="6" class="pa-6 d-flex flex-column">
              <div class="d-flex justify-space-between align-center mb-2">
                <v-chip size="small" class="custom-chip" variant="tonal">{{ selectedProduct.category }}</v-chip>
                <v-btn icon="mdi-close" variant="text" size="small" @click="dialog = false"></v-btn>
              </div>

              <h2 class="text-h6 font-weight-bold mb-2 text-dark">{{ selectedProduct.name }}</h2>

              <div class="d-flex align-center mb-3">
                <v-rating :model-value="selectedProduct.rating" color="amber-darken-2" density="compact" size="small" half-increments readonly></v-rating>
                <span class="text-caption ml-2 text-grey">({{ selectedProduct.rating }})</span>
              </div>

              <p class="text-body-2 text-grey-darken-1 mb-4 flex-grow-1">
                {{ selectedProduct.description }}
              </p>

              <div class="d-flex align-center justify-space-between mb-4">
                <span class="text-h5 font-weight-black text-dark">${{ selectedProduct.price }}</span>
                <span class="text-caption text-success font-weight-bold"><v-icon icon="mdi-truck-check-outline" class="mr-1"/> Free Shipping</span>
              </div>

              <v-btn block class="btn-dark-custom size-large mb-4 font-weight-bold" rounded="lg" @click="addToCart(selectedProduct)">
                Add To Cart
              </v-btn>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <!-- Reviews Section -->
          <div class="pa-6 bg-light-section">
            <h3 class="text-subtitle-1 font-weight-bold mb-3 d-flex align-center text-dark">
              <v-icon icon="mdi-star-circle-outline" color="amber-darken-2" class="mr-2"/>
              Customer Reviews & Ratings
            </h3>

            <v-card class="pa-3 mb-4 rounded-xl border-card" variant="outlined" bg-color="white">
              <div class="text-caption font-weight-bold mb-1 text-dark">Leave Your Review:</div>
              <div class="d-flex align-center mb-2">
                <v-rating v-model="newReview.rating" color="amber-darken-2" density="compact" size="small"></v-rating>
                <span class="text-caption ml-2 font-weight-bold">{{ newReview.rating }} Stars</span>
              </div>
              <v-text-field v-model="newReview.name" label="Your Name" density="compact" variant="outlined" class="mb-2" bg-color="white" hide-details></v-text-field>
              <v-textarea v-model="newReview.comment" label="Write feedback..." density="compact" variant="outlined" rows="2" class="mb-2" bg-color="white" hide-details></v-textarea>
              <v-btn class="btn-dark-custom mt-2 font-weight-bold" size="small" rounded @click="submitReview">
                Submit Review
              </v-btn>
            </v-card>

            <div class="reviews-list">
              <div v-for="(rev, i) in currentReviews" :key="i" class="mb-3 p-3 bg-white rounded-lg elevation-0 border-card pa-3">
                <div class="d-flex justify-space-between align-center mb-1">
                  <span class="font-weight-bold text-body-2 text-dark">{{ rev.name }}</span>
                  <span class="text-caption text-grey">{{ rev.date }}</span>
                </div>
                <v-rating :model-value="rev.rating" color="amber-darken-2" density="compact" size="x-small" readonly></v-rating>
                <p class="text-caption text-grey-darken-2 mt-1 mb-0">{{ rev.comment }}</p>
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <!-- Drawers Component -->
      <ShopDrawers
        v-model:cart-open="isCartOpen"
        v-model:wishlist-open="isWishlistOpen"
        v-model:orders-open="isOrdersOpen"
      />

      <!-- Snackbar -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2500" location="bottom right" rounded="pill">
        <div class="d-flex align-center font-weight-medium">
          <v-icon icon="mdi-check-circle" class="mr-2" v-if="snackbar.color === 'success'"></v-icon>
          <v-icon icon="mdi-heart" class="mr-2" v-else-if="snackbar.color === 'error'"></v-icon>
          <v-icon icon="mdi-information" class="mr-2" v-else></v-icon>
          {{ snackbar.text }}
        </div>
      </v-snackbar>
    </v-main>

    <!-- Footer -->
    <v-footer class="custom-footer text-white mt-12 py-8">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <div class="text-h6 font-weight-black mb-2 text-dark">AUTO<span class="text-accent">PARTS</span></div>
            <p class="text-caption text-grey-darken-1">Your trusted catalog for quality auto parts and modern car accessories.</p>
          </v-col>
          <v-col cols="12" md="4" class="text-md-center">
            <div class="text-subtitle-2 font-weight-bold mb-2 text-dark">Quick Categories</div>
            <div class="text-caption text-grey-darken-1">Car Parts | Car Accessories</div>
          </v-col>
          <v-col cols="12" md="4" class="text-md-right">
            <div class="text-caption text-grey-darken-1">&copy; 2026 AutoParts Catalog. All rights reserved.</div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { products } from './data/products'
import ProductCard from './components/ProductCard.vue'
import ShopDrawers from './components/ShopDrawers.vue'
import { useShop } from './composables/useShop'

const { addToCart, toggleWishlist, isInWishlist, cartCount, wishlistCount, orders, addReview, getProductReviews, snackbar } = useShop()

const searchQuery = ref('')
const selectedCategory = ref('All')
const sortBy = ref('Default')
const dialog = ref(false)
const selectedProduct = ref(null)

const isCartOpen = ref(false)
const isWishlistOpen = ref(false)
const isOrdersOpen = ref(false)

const categories = ['All', 'Car Parts', 'Car Accessories']
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Rating: High to Low']

const newReview = ref({
  name: '',
  rating: 5,
  comment: ''
})

const filteredProducts = computed(() => {
  let result = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || p.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })

  if (sortBy.value === 'Price: Low to High') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'Price: High to Low') {
    result = [...result].sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'Rating: High to Low') {
    result = [...result].sort((a, b) => b.rating - a.rating)
  }

  return result
})

const currentReviews = computed(() => {
  if (!selectedProduct.value) return []
  return getProductReviews(selectedProduct.value.id)
})

function openDetails(product) {
  selectedProduct.value = product
  newReview.value = { name: '', rating: 5, comment: '' }
  dialog.value = true
}

function submitReview() {
  if (!newReview.value.name || !newReview.value.comment) {
    alert('Please fill in both name and comment.')
    return
  }
  addReview(selectedProduct.value.id, { ...newReview.value })
  newReview.value = { name: '', rating: 5, comment: '' }
}
</script>

<style scoped>

.app-background {
  background-color: #f7f5f0 !important;
}

.custom-navbar {
  background-color: #f7f5f0 !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.hero-section {
  background: #111111 !important;
}

.text-dark {
  color: #111111 !important;
}

.text-dark-title {
  color: #ffffff !important;
}

.text-accent {
  color: #c97a7a !important;
}

.custom-chip {
  background-color: #df9b9b33 !important;
  color: #b55d5d !important;
}

.btn-dark-custom {
  background-color: #111111 !important;
  color: #ffffff !important;
}

.border-card {
  border: 1px solid rgba(0, 0, 0, 0.06) !important;
}

.bg-light-section {
  background-color: #fcfbfa !important;
}

.custom-footer {
  background-color: #111111 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.reviews-list {
  max-height: 220px;
  overflow-y: auto;
}
</style>