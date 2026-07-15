import { defineStore } from 'pinia'
import type { Product } from '@/types/product'

interface WishlistState {
    items: Product[]
}

export const useWishlistStore = defineStore('wishlist', {
    state: ():WishlistState => ({
        items:[],
    }),

    getters: {
        isInWishlist: (state) => (productId: number) =>
            state.items.some((product) => productId === product.id)
    },

    actions: {
         toggle(product: Product) {
            const index = this.items.findIndex((p) => p.id === product.id)
            if (index === -1) {
                this.items.push(product)
            } else {
                this.items.splice(index, 1)
            }
        },
    }
})