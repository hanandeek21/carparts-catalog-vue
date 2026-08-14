<template>
  <v-card
    class="product-card h-100 d-flex flex-column rounded-xl overflow-hidden border-card"
    elevation="1"
  >
    <div class="position-relative bg-grey-lighten-2">
      <v-img
        :src="product.image || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80'"
        :alt="product.name"
        height="200"
        cover
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height bg-grey-lighten-2">
            <v-icon icon="mdi-image-outline" size="large" color="grey"></v-icon>
          </div>
        </template>
      </v-img>

      <v-btn
        :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
        :aria-label="isFavorite ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`"
        size="small"
        variant="flat"
        class="position-absolute top-0 right-0 ma-2 product-card__wishlist-button"
        :class="{ 'is-favorited': isFavorite }"
        elevation="2"
        @click="$emit('toggle-wishlist', product)"
      ></v-btn>

      <v-chip
        size="x-small"
        class="position-absolute bottom-0 left-0 ma-2 font-weight-bold custom-chip"
        variant="flat"
      >
        {{ product.category }}
      </v-chip>
    </div>

    <v-card-text class="d-flex flex-column flex-grow-1 pa-4 bg-white">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="d-flex align-center">
          <v-icon icon="mdi-star" color="amber-darken-2" size="small" class="mr-1"></v-icon>
          <span class="text-caption font-weight-bold text-dark">
            {{ product.rating }}
          </span>
        </div>

        <span class="text-caption text-success font-weight-bold">
          ● In Stock
        </span>
      </div>

      <h3 class="text-subtitle-1 font-weight-bold text-dark mb-2 product-card__title">
        {{ product.name }}
      </h3>

      <v-spacer></v-spacer>

      <div class="d-flex align-center justify-space-between mt-3 pt-3 product-card__footer">
        <div>
          <span class="text-caption text-grey d-block">Price</span>
          <span class="text-h6 font-weight-black text-dark">
            ${{ product.price }}
          </span>
        </div>

        <div class="d-flex product-card__actions">
          <v-btn
            icon="mdi-eye-outline"
            :aria-label="`View details for ${product.name}`"
            variant="tonal"
            color="grey-darken-4"
            size="small"
            @click="$emit('open-details', product)"
          ></v-btn>

          <v-btn
            icon="mdi-cart-plus"
            :aria-label="`Add ${product.name} to cart`"
            class="btn-dark-custom"
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
import '../styles/product-card.css'

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