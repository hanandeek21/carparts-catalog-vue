<template>
  <v-dialog
    :model-value="modelValue"
    max-width="700"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card v-if="product" rounded="xl" class="overflow-hidden">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-img
            :src="product.image"
            :alt="product.name"
            height="100%"
            min-height="280"
            cover
          />
        </v-col>

        <v-col cols="12" md="6" class="pa-6 d-flex flex-column">
          <div class="d-flex justify-space-between align-center mb-2">
            <v-chip size="small" class="custom-chip" variant="tonal">
              {{ product.category }}
            </v-chip>

            <v-btn
              icon="mdi-close"
              variant="text"
              size="small"
              aria-label="Close product details"
              @click="$emit('update:modelValue', false)"
            />
          </div>

          <h2 class="text-h6 font-weight-bold mb-2 text-dark">
            {{ product.name }}
          </h2>

          <div class="d-flex align-center mb-3">
            <v-rating
              :model-value="product.rating"
              color="amber-darken-2"
              density="compact"
              size="small"
              half-increments
              readonly
            />
            <span class="text-caption ml-2 text-grey">
              ({{ product.rating }})
            </span>
          </div>

          <p class="text-body-2 text-grey-darken-1 mb-4 flex-grow-1">
            {{ product.description }}
          </p>

          <div class="d-flex align-center justify-space-between mb-4">
            <span class="text-h5 font-weight-black text-dark">
              ${{ product.price }}
            </span>

            <span class="text-caption text-success font-weight-bold">
              <v-icon icon="mdi-truck-check-outline" class="mr-1" />
              Free Shipping
            </span>
          </div>

          <v-btn
            block
            class="btn-dark-custom size-large mb-4 font-weight-bold"
            rounded="lg"
            :aria-label="`Add ${product.name} to cart`"
            @click="$emit('add-to-cart', product)"
          >
            Add To Cart
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object,
    default: null
  }
})

defineEmits(['update:modelValue', 'add-to-cart'])
</script>