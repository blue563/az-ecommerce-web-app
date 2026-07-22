<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import type { Product } from '@/types/product';
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const route = useRoute()
const store = useProductsStore()

const product = ref<Product | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

async function loadProduct() {
  const id = Number(route.params.id)
  isLoading.value = true
  error.value = null

  try {
    product.value = await store.loadProductById(id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong during product loading.'
  } finally{
    isLoading.value = false
  }
  
}

const cart = useCartStore()
const wishlist = useWishlistStore()
const auth = useAuthStore()
const router = useRouter()

function requireAuthOr(action: () => void) {
    if (!auth.isAuthenticated) {
        router.push({ name: 'login', query: { redirect: route.fullPath } })
        return
    }
    action()
}

function onAddToCart() {
    if (!product.value) return
    requireAuthOr(() => cart.addToCart(product.value as Product))
}

function onToggleWishlist() {
    if (!product.value) return
    requireAuthOr(() => wishlist.toggle(product.value as Product))
}

onMounted(loadProduct)
watch(() => route.params.id, loadProduct)//useful for future "related/advised products" section inside this view
</script>

<template>
  <div>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <article v-else-if="product">
      <img :src="product.image" :alt="product.title" />
      <h1>{{ product.title }}</h1>
      <p>{{ product.price }} €</p>
      <p>{{ product.description }}</p>
      <button @click="onAddToCart">Add to cart</button>
      <button @click="onToggleWishlist">
        {{ wishlist.isInWishlist(product.id) ? '♥ In wishlist' : '♡ Add to wishlist' }}
      </button>
    </article>
  </div>
</template>

<style scoped lang="scss">

img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  display: block;
}

@media (max-width: 640px) {
  article {
    text-align: center;
  }
  img {
    margin: 0 auto;
    max-height: 220px;
  }
}
</style>