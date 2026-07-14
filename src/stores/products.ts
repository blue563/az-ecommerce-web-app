import { fetchProducts, fetchProductsByCategory, fetchCategories, fetchProductById } from "@/api/products";
import type { Product, Category } from "@/types/product";
import { defineStore } from "pinia";

interface ProductsState {
    products: Product[]
    categories: Category[]
    activeCategory: Category | null
    isLoading: boolean
    error: string | null
}

export const useProductsStore = defineStore(
    'products', 
    {
    state: (): ProductsState => ({
        products: [],
        categories: [],
        activeCategory: null,
        isLoading: false,
        error: null as string | null,
    }),

    actions: {
        async loadCategories() {
            this.categories = await fetchCategories()
        },

        async loadProducts(category: Category | null = null) {
            this.isLoading = true
            this.error = null
            this.activeCategory = category

            try {
                this.products = category
                    ? await fetchProductsByCategory(category)
                    : await fetchProducts()
            } catch (err) {
                this.error = 'Something went wrong during products\' loading'
                this.products = []
            } finally {
                this.isLoading = false
            }
        },

        async loadProductById(id: number): Promise<Product> {
            const cached = this.products.find((p) => p.id === id)
            //looking for the product inside cache first
            if (cached) return cached
            //if product is not in cache, then it will be searched using fetch
            return fetchProductById(id)
        }
    }
})