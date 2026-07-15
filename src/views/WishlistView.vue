<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWishlistStore } from '@/stores/wishlist'
import ProductGrid from '@/components/product/ProductGrid.vue'

const wishlist = useWishlistStore()
const { items } = storeToRefs(wishlist)
</script>

<template>
  <h1>Wishlist</h1>
  <p v-if="!items.length">Your wishlist is empty.</p>
  <ProductGrid v-else :products="items" />
</template>