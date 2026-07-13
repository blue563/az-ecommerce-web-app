<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '@/types/product'

const props = defineProps<{ product: Product }>()
const router = useRouter()

function goToDetail() {
  router.push({name: 'product-detail', params: {id: props.product.id}})
}
</script>

<template>
  <article @click ="goToDetail()">
    <img :src="product.image" :alt="product.title" />
    <h3>{{ product.title }}</h3>
    <p>{{ product.price }} €</p>
  </article>
</template>

<style scoped lang="scss">
article {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
}
</style>