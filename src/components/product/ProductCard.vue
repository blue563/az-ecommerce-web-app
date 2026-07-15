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
  <article class="product-card">
    <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="product-card__link">
      <img :src="product.image" :alt="product.title" />
      <h3>{{ product.title }}</h3>
      <p>{{ product.price }} €</p>
    </router-link>
  </article>
</template>

<style scoped lang="scss">
article {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  min-width: 0;
}

img {
  max-width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  display: block;
}

.product-card__link {
  display: block;
  color: inherit;
  text-decoration: none;
}
</style>