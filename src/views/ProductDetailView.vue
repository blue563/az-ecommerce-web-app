<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProductById } from '@/api/products';
import type { Product } from '@/types/product';

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null) //normal, data-ready state
const isLoading = ref(true) //loading product's data state
const error = ref<string | null>(null) //error state

async function loadProduct() {
    const id = Number(route.params.id)

    isLoading.value = true
    error.value = null

    try {
        product.value = await fetchProductById(id)
    } catch (err) {
        error.value = 'Something went wrong during product loading.'
    } finally {
        isLoading.value = false
    }
}

onMounted(loadProduct)

</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="error">{{ error }}</p>
  
  <article v-else-if="product">
    <img :src="product.image" :alt="product.title" />
    <h1>{{ product.title }}</h1>
    <p>{{ product.price }} €</p>
    <p>{{ product.description }}</p>
  </article>

</template>