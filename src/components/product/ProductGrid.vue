<script setup lang="ts">
import type { Product } from '@/types/product'
import ProductCard from './ProductCard.vue';
import SkeletonCard from '@/components/ui/SkeletonCard.vue';

defineProps<{ products: Product[]; isLoading?: boolean }>()
</script>

<template>
    <div class="grid">
      <template v-if="isLoading">
        <SkeletonCard v-for="n in 8" :key="n" />
      </template>
        <ProductCard v-else v-for="product in products" :key="product.id" :product="product" />
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
  
  @media (min-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>