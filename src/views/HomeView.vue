<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import ProductGrid from '@/components/product/ProductGrid.vue';
import ErrorNotice from '@/components/ui/ErrorNotice.vue'


const route = useRoute()
const store = useProductsStore()
const {products, isLoading, error} = storeToRefs(store);

function categoryFromRoute(): string | null {
    const value = route.query.category
    return typeof value === 'string' && value.length> 0 ? value : null
}

onMounted(() => store.loadProducts(categoryFromRoute()))// manages Products loading when user reaches the page or refresh it
watch(() => route.query.category, () => store.loadProducts(categoryFromRoute()))// manages Products loading when user clicks on a category
</script>


<template>
    <div>
        <div class="home__hero">
            <h1>Best products in just one click</h1>
        </div>

        <ErrorNotice
            v-if="error"
            :message="error"
            @retry="store.loadProducts(categoryFromRoute())"
        />
        <ProductGrid v-else :products="products" :is-loading="isLoading" />
    </div>

</template>