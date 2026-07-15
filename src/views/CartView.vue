<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { items, totalPrice } = storeToRefs(cart)

</script>

<template>
  <div>
    <h1>Shopping Cart</h1>

    <p v-if="!items.length">Your cart is empty.</p>

    <ul v-else>
      <li v-for="item in items" :key="item.product.id">
        <router-link :to="{ name: 'product-detail', params: { id: item.product.id } }">
          <img
            :src="item.product.image"
            :alt="item.product.title"
            width="50"
            style="cursor: pointer"
          />
        </router-link>
        <span>{{ item.product.title }} × {{ item.quantity }}</span>
        <button @click="cart.removeFromCart(item.product.id)">Remove</button>
      </li>
    </ul>
    <p v-if="items.length">Total: {{ totalPrice.toFixed(2) }} €</p>
  </div>
</template>