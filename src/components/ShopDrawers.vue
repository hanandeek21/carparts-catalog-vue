<template>
  <div>
    <!-- 1. شريط السلة (Cart Drawer) -->
    <v-navigation-drawer v-model="showCartDrawer" location="right" temporary width="400" class="pa-4">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center">
          <v-icon icon="mdi-cart" color="indigo-darken-4" class="mr-2" />
          <h2 class="text-h6 font-weight-bold">Shopping Cart</h2>
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" @click="showCartDrawer = false"></v-btn>
      </div>

      <v-divider class="mb-4"></v-divider>

      <div v-if="cart.length === 0" class="text-center py-12">
        <v-icon icon="mdi-cart-outline" size="64" color="grey-lighten-1" class="mb-2"></v-icon>
        <p class="text-body-1 text-grey-darken-1 font-weight-medium">Your cart is empty</p>
      </div>

      <div v-else class="d-flex flex-column h-100">
        <div class="flex-grow-1 overflow-y-auto pr-1">
          <v-card v-for="item in cart" :key="item.id" class="mb-3 pa-3 rounded-lg" variant="outlined" color="grey-lighten-2">
            <div class="d-flex align-center">
              <v-img :src="item.image" width="60" height="60" cover class="rounded mr-3"></v-img>
              <div class="flex-grow-1">
                <h4 class="text-body-2 font-weight-bold text-grey-darken-3 text-truncate mb-1" style="max-width: 170px;">{{ item.name }}</h4>
                <div class="text-subtitle-2 font-weight-black text-indigo-darken-3">${{ item.price }}</div>
              </div>
              <div class="d-flex align-center bg-grey-lighten-3 rounded px-1">
                <v-btn icon="mdi-minus" size="x-small" variant="text" @click="updateQuantity(item.id, -1)"></v-btn>
                <span class="text-caption font-weight-bold px-2">{{ item.quantity }}</span>
                <v-btn icon="mdi-plus" size="x-small" variant="text" @click="updateQuantity(item.id, 1)"></v-btn>
              </div>
              <v-btn icon="mdi-delete-outline" color="red" variant="text" size="small" class="ml-1" @click="removeFromCart(item.id)"></v-btn>
            </div>
          </v-card>
        </div>

        <div class="mt-auto pt-4 border-top">
          <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-subtitle-1 font-weight-bold">Total Amount:</span>
            <span class="text-h5 font-weight-black text-indigo-darken-3">${{ cartTotal }}</span>
          </div>
          <v-btn block color="indigo-darken-3" size="large" rounded="lg" class="font-weight-bold" @click="openCheckout">
            Proceed to Checkout
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- 2. شريط المفضلة (Wishlist Drawer) -->
    <v-navigation-drawer v-model="showWishlistDrawer" location="right" temporary width="400" class="pa-4">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center">
          <v-icon icon="mdi-heart" color="red" class="mr-2" />
          <h2 class="text-h6 font-weight-bold">Your Wishlist</h2>
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" @click="showWishlistDrawer = false"></v-btn>
      </div>

      <v-divider class="mb-4"></v-divider>

      <div v-if="wishlist.length === 0" class="text-center py-12">
        <v-icon icon="mdi-heart-outline" size="64" color="grey-lighten-1" class="mb-2"></v-icon>
        <p class="text-body-1 text-grey-darken-1 font-weight-medium">Your wishlist is empty</p>
      </div>

      <div v-else class="overflow-y-auto">
        <v-card v-for="item in wishlist" :key="item.id" class="mb-3 pa-3 rounded-lg" variant="outlined" color="grey-lighten-2">
          <div class="d-flex align-center">
            <v-img :src="item.image" width="60" height="60" cover class="rounded mr-3"></v-img>
            <div class="flex-grow-1">
              <h4 class="text-body-2 font-weight-bold text-grey-darken-3 text-truncate mb-1" style="max-width: 160px;">{{ item.name }}</h4>
              <div class="text-subtitle-2 font-weight-black text-indigo-darken-3">${{ item.price }}</div>
            </div>
            <v-btn icon="mdi-cart-plus" color="amber-accent-4" size="small" class="mr-1" @click="moveToCart(item)"></v-btn>
            <v-btn icon="mdi-close" color="grey" variant="text" size="small" @click="toggleWishlist(item)"></v-btn>
          </div>
        </v-card>
      </div>
    </v-navigation-drawer>

    <!-- 3. شريط سجل الطلبات (Orders Drawer) -->
    <v-navigation-drawer v-model="showOrdersDrawer" location="right" temporary width="420" class="pa-4">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center">
          <v-icon icon="mdi-history" color="indigo-darken-3" class="mr-2" />
          <h2 class="text-h6 font-weight-bold">Order History</h2>
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" @click="showOrdersDrawer = false"></v-btn>
      </div>

      <v-divider class="mb-4"></v-divider>

      <div v-if="orders.length === 0" class="text-center py-12">
        <v-icon icon="mdi-package-variant-closed" size="64" color="grey-lighten-1" class="mb-2"></v-icon>
        <p class="text-body-1 text-grey-darken-1 font-weight-medium">No previous orders found</p>
      </div>

      <div v-else class="overflow-y-auto pr-1">
        <v-card v-for="order in orders" :key="order.id" class="mb-4 pa-4 rounded-lg" elevation="2" variant="outlined" color="indigo-lighten-5">
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="font-weight-black text-indigo-darken-4">{{ order.id }}</span>
            <v-chip size="x-small" color="success" class="font-weight-bold">Completed</v-chip>
          </div>
          <div class="text-caption text-grey-darken-1 mb-2"><v-icon icon="mdi-clock-outline" size="x-small"/> {{ order.date }}</div>
          
          <v-divider class="my-2"></v-divider>

          <div v-for="item in order.items" :key="item.id" class="d-flex justify-space-between text-caption mb-1">
            <span class="text-truncate" style="max-width: 220px;">{{ item.quantity }}x {{ item.name }}</span>
            <span class="font-weight-bold">${{ item.price * item.quantity }}</span>
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex justify-space-between align-center font-weight-bold text-subtitle-2 text-indigo-darken-4">
            <span>Total Paid:</span>
            <span>${{ order.total }}</span>
          </div>
        </v-card>
      </div>
    </v-navigation-drawer>

    <!-- 4. نافذة إتمام الطلب (Checkout Dialog) -->
    <v-dialog v-model="checkoutDialog" max-width="550" persistent>
      <v-card rounded="xl" class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="d-flex align-center">
            <v-icon icon="mdi-credit-card-outline" color="indigo-darken-3" class="mr-2" size="large"></v-icon>
            <h2 class="text-h6 font-weight-bold">Checkout</h2>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" @click="checkoutDialog = false"></v-btn>
        </div>

        <v-divider class="mb-4"></v-divider>

        <v-form ref="formRef" @submit.prevent="processOrder">
          <v-text-field v-model="form.fullName" label="Full Name" prepend-inner-icon="mdi-account-outline" variant="outlined" density="comfortable" class="mb-3" :rules="[v => !!v || 'Required']"></v-text-field>
          <v-text-field v-model="form.phone" label="Phone Number" prepend-inner-icon="mdi-phone-outline" variant="outlined" density="comfortable" class="mb-3" :rules="[v => !!v || 'Required']"></v-text-field>
          <v-text-field v-model="form.address" label="Shipping Address" prepend-inner-icon="mdi-map-marker-outline" variant="outlined" density="comfortable" class="mb-3" :rules="[v => !!v || 'Required']"></v-text-field>
          <v-select v-model="form.paymentMethod" :items="['Cash on Delivery', 'Credit Card / Visa', 'PayPal']" label="Payment Method" prepend-inner-icon="mdi-wallet-outline" variant="outlined" density="comfortable" class="mb-4"></v-select>

          <v-card class="pa-3 bg-grey-lighten-4 mb-4" flat rounded="lg">
            <div class="d-flex justify-space-between text-body-2 mb-1">
              <span>Subtotal:</span>
              <span>${{ cartTotal }}</span>
            </div>
            <div class="d-flex justify-space-between text-body-2 mb-1">
              <span>Shipping Fee:</span>
              <span class="text-success font-weight-bold">FREE</span>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between text-subtitle-1 font-weight-bold">
              <span>Total Payment:</span>
              <span class="text-indigo-darken-3">${{ cartTotal }}</span>
            </div>
          </v-card>

          <v-btn type="submit" block color="indigo-darken-3" size="large" rounded="lg" class="font-weight-bold" :loading="isSubmitting">
            Confirm Order (${{ cartTotal }})
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useShop } from '../composables/useShop'

const props = defineProps({
  cartOpen: Boolean,
  wishlistOpen: Boolean,
  ordersOpen: Boolean
})

const emit = defineEmits(['update:cartOpen', 'update:wishlistOpen', 'update:ordersOpen'])

const { cart, wishlist, orders, removeFromCart, updateQuantity, cartTotal, toggleWishlist, addToCart, saveOrder, snackbar } = useShop()

const checkoutDialog = ref(false)
const isSubmitting = ref(false)
const formRef = ref(null)

const form = ref({
  fullName: '',
  phone: '',
  address: '',
  paymentMethod: 'Cash on Delivery'
})

const showCartDrawer = computed({
  get: () => props.cartOpen,
  set: (val) => emit('update:cartOpen', val)
})

const showWishlistDrawer = computed({
  get: () => props.wishlistOpen,
  set: (val) => emit('update:wishlistOpen', val)
})

const showOrdersDrawer = computed({
  get: () => props.ordersOpen,
  set: (val) => emit('update:ordersOpen', val)
})

function moveToCart(item) {
  addToCart(item)
  toggleWishlist(item)
}

function openCheckout() {
  showCartDrawer.value = false
  checkoutDialog.value = true
}

async function processOrder() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  isSubmitting.value = true

  setTimeout(() => {
    saveOrder(form.value)
    isSubmitting.value = false
    checkoutDialog.value = false

    form.value = { fullName: '', phone: '', address: '', paymentMethod: 'Cash on Delivery' }

    snackbar.value = {
      show: true,
      text: 'Order placed successfully and saved to Order History!',
      color: 'success'
    }
  }, 1000)
}
</script>

<style scoped>
.border-top { border-top: 1px solid #eeeeee; }
</style>