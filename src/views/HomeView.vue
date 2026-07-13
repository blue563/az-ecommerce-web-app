<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProducts, fetchProductsByCategory } from '@/api/products';
import type { Product } from '@/types/product';
import ProductGrid from '@/components/product/ProductGrid.vue';

const route = useRoute()
const products = ref<Product[]>([]);

function categoryFromRoute(): string | null {
    const value = route.query.category
    return typeof value === 'string' && value.length> 0 ? value : null
}

async function loadProducts() {
    const category = categoryFromRoute()
    products.value = category
        ? await fetchProductsByCategory(category)
        : await fetchProducts()
}

onMounted(loadProducts)// manages Products loading when user reaches the page or refresh it

watch(() => route.query.category, loadProducts)// manages Products loading when user clicks on a category
</script>


<template>
    <div class="home__hero">
        <h1>Best products in just one click</h1>
    </div>
    <ProductGrid :products="products" />
</template>