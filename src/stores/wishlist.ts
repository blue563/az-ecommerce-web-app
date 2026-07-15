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
        // addToWishlist(product: Product){
        //     const existing = this.items.find((item) => item.id === product.id)
        //     if(existing){

        //     } else {
        //         this.items.push(product)
        //     }
        // },

        // removeFromWishlist(productId: number){
        //     this.items = this.items.filter((item) => item.id !== productId)
        // },

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