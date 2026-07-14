<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import { ApiError } from '@/api/client';
import type { Product } from '@/types/product';

const route = useRoute()
const store = useProductsStore()

const product = ref<Product | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

async function loadProduct() {
  const id = Number(route.params.id)
  isLoading.value = true
  error.value = null

  try{
    product.value = await store.loadProductById(id)
  }catch (err){
    error.value = 'Something went wrong during product loading.'
  } finally{
    isLoading.value = false
  }
  
}

onMounted(loadProduct)
watch(() => route.params.id, loadProduct)//useful for future "related/advised products" section inside this view
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="error">{{ error }}</p>

  <article v-if="product">
    <img :src="product.image" :alt="product.title" />
    <h1>{{ product.title }}</h1>
    <p>{{ product.price }} €</p>
    <p>{{ product.description }}</p>
  </article>
</template>