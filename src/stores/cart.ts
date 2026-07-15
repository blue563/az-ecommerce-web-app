import { defineStore } from 'pinia'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

interface CartState {
    items: CartItem[]
}

export const useCartStore = defineStore('cart', {
    state:():CartState => ({
        items:[],
    }),

    getters: {
        totalCount: (state) => state.items.reduce((sum,item) => sum + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((sum,item) => sum + item.product.price * item.quantity, 0),
    },

    actions: {
        addToCart(product: Product, quantity = 1) {
            const existing = this.items.find((item) => item.product.id === product.id)
            if(existing){
                existing.quantity += quantity
            } else {
                this.items.push({product, quantity})
            }
        },

        removeFromCart(productId: number){
            this.items = this.items.filter((item) => item.product.id !== productId)
        }
    }
})