<template>
  <v-app class="app-background">
    <!-- Navbar -->
    <v-app-bar app class="custom-navbar px-md-4" elevation="1">
      <v-container class="d-flex align-center py-0">
        <v-app-bar-title class="text-h6 font-weight-black d-flex align-center">
          <v-icon icon="mdi-engine" color="amber-darken-2" class="mr-2" size="large" />
          <span class="tracking-wide text-dark">AUTO<span class="text-accent">PARTS</span></span>
        </v-app-bar-title>

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
<!-- Product Details -->
<ProductDetailsDialog
  v-model="dialog"
  :product="selectedProduct"
  @add-to-cart="addToCart"
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
import { useShellEvents } from './composables/useShellEvents'
import { ref, computed } from 'vue'
import { products } from './data/products'
import ProductCard from './components/ProductCard.vue'
import ProductDetailsDialog from './components/ProductDetailsDialog.vue'


const searchQuery = ref('')
const selectedCategory = ref('All')
const sortBy = ref('Default')
const dialog = ref(false)
const selectedProduct = ref(null)
const { emitToShell } = useShellEvents()

const favoriteProductIds = ref([])

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

function showSnackbar(text, color = 'success') {
  snackbar.value = { show: true, text, color }
}


function addToCart(product) {
emitToShell  ('catalog:add-to-cart', {
    product: {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }
  })

  showSnackbar(`${product.name} was sent to the cart.`, 'success')
}

function toggleWishlist(product) {
  const alreadyFavorite = favoriteProductIds.value.includes(product.id)

  favoriteProductIds.value = alreadyFavorite
    ? favoriteProductIds.value.filter((id) => id !== product.id)
    : [...favoriteProductIds.value, product.id]

  emitToShell('catalog:toggle-wishlist', {
    product,
    action: alreadyFavorite ? 'remove' : 'add'
  })

  showSnackbar(
    alreadyFavorite
      ? `${product.name} was removed from wishlist.`
      : `${product.name} was added to wishlist.`,
    alreadyFavorite ? 'info' : 'success'
  )
}

function isInWishlist(productId) {
  return favoriteProductIds.value.includes(productId)
}

const categories = ['All', 'Car Parts', 'Car Accessories']
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Rating: High to Low']


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



function openDetails(product) {
  selectedProduct.value = product
    dialog.value = true
}

</script>
