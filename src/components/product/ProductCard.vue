<script setup lang="ts">
import type { Product } from '@/types/product'

const props = defineProps<{ product: Product }>()

</script>

<template>
  <article class="product-card">
    <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="product-card__link">
      <div class="product-card__image-wrap">
        <img :src="product.image" :alt="product.title" />
      </div>
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

  .product-card__image-wrap {
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3);
    margin-bottom: var(--space-2);
    border-radius: var(--radius-md);
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
  }

  .product-card__link {
    display: block;
    color: inherit;
    text-decoration: none;
  }
</style>