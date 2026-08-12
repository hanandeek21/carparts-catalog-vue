<template>
  <v-card class="product-card h-100 d-flex flex-column rounded-lg overflow-hidden" elevation="2">
    <div class="position-relative bg-grey-lighten-2">
      <v-img
        :src="product.image || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80'"
        height="200"
        cover
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height bg-grey-lighten-2">
            <v-icon icon="mdi-image-outline" size="large" color="grey"></v-icon>
          </div>
        </template>
      </v-img>

      <!-- زر المفضلة (القلب) -->
      <v-btn
        :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="isFavorite ? 'red' : 'white'"
        size="small"
        variant="flat"
        class="position-absolute top-0 right-0 ma-2"
        elevation="2"
        @click="$emit('toggle-wishlist', product)"
      ></v-btn>

      <v-chip
        size="x-small"
        color="indigo-darken-3"
        variant="flat"
        class="position-absolute bottom-0 left-0 ma-2 font-weight-bold"
      >
        {{ product.category }}
      </v-chip>
    </div>

    <v-card-text class="d-flex flex-column flex-grow-1 pa-4">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="d-flex align-center">
          <v-icon icon="mdi-star" color="amber-darken-1" size="small" class="mr-1"></v-icon>
          <span class="text-caption font-weight-bold">{{ product.rating }}</span>
        </div>
        <span class="text-caption text-success font-weight-bold">● In Stock</span>
      </div>

      <h3 class="text-subtitle-1 font-weight-bold text-grey-darken-3 mb-2 product-title">
        {{ product.name }}
      </h3>

      <v-spacer></v-spacer>

      <div class="d-flex align-center justify-space-between mt-3 pt-3 border-top">
        <div>
          <span class="text-caption text-grey d-block">Price</span>
          <span class="text-h6 font-weight-black text-indigo-darken-3">${{ product.price }}</span>
        </div>

        <div class="d-flex gap-2">
          <v-btn
            icon="mdi-eye-outline"
            variant="tonal"
            color="indigo"
            size="small"
            @click="$emit('open-details', product)"
          ></v-btn>

          <v-btn
            icon="mdi-cart-plus"
            color="amber-accent-4"
            size="small"
            elevation="1"
            @click="$emit('add-to-cart', product)"
          ></v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})

defineEmits(['add-to-cart', 'toggle-wishlist', 'open-details'])
</script>

<style scoped>
.product-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12) !important;
}
.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 44px;
}
.gap-2 {
  gap: 8px;
}
.border-top {
  border-top: 1px solid #eeeeee;
}
</style>