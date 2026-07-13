<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProductById } from '@/api/products';
import type { Product } from '@/types/product';

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)

onMounted(async () => {
    const id = Number(route.params.id)
    // if (Number.isNaN(id)) {
    //     router.replace({name : 'not-found' })
    //     return
    // }

    product.value = await fetchProductById(id)
})
</script>

<template>
  <article v-if="product">
    <img :src="product.image" :alt="product.title" />
    <h1>{{ product.title }}</h1>
    <p>{{ product.price }} €</p>
    <p>{{ product.description }}</p>
  </article>
</template>