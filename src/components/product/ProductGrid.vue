<script setup lang="ts">
import type { Product } from '@/types/product'
import ProductCard from './ProductCard.vue';

defineProps<{ products: Product[] }>()
</script>

<template>
    <div>
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>

<style scoped lang="scss">
div {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>