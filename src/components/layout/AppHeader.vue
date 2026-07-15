<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const auth = useAuthStore()
const router = useRouter()

function onLogout(){
  auth.logout()
  router.push({name: 'home'})
}

const store = useProductsStore()
const { categories } = storeToRefs(store)

const cart = useCartStore()
const wishlist = useWishlistStore()

onMounted(() => store.loadCategories())
</script>

<template>
    <header class="app-header">
    <div class="app-header__top">
      <router-link to="/" class="app-header__logo">🛍️ AZ Shop</router-link>

      <div v-if="auth.isAuthenticated" class="app-header__actions">
        <router-link to="/wishlist">♡</router-link>
        <router-link to="/cart">
          🛒 <span v-if="cart.totalCount">({{ cart.totalCount }})</span>
        </router-link>
        <span>Hi, {{ auth.username }}</span>
        <button @click="onLogout">Logout</button>
      </div>

      <div v-else class="app-header__actions">
        <span>Hi, Log in to use cart and wishlist</span>
        <router-link to="/login">Login</router-link>
      </div>
    </div>

    <nav class="app-header__categories-bar" aria-label="Product categories">
      <ul>
        <li v-for="category in categories" :key="category">
          <router-link :to="{ name: 'home', query: { category } }">
            {{ category }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  &__top {
    background: var(--color-header-dark, #131921);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-3) var(--space-5);
  }

  &__logo {
    color: white;
    text-decoration: none;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    white-space: nowrap;
    flex-shrink: 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
    justify-content: flex-end;

    a,
    button,
    span {
      color: white;
      text-decoration: none;
      white-space: nowrap;
      background: none;
      border: none;
      font: inherit;
      cursor: pointer;
    }
  }

  &__categories-bar {
    background: var(--color-header-light, #232f3e);

    ul {
      list-style: none;
      display: flex;
      gap: var(--space-4);
      margin: 0;
      padding: var(--space-2) var(--space-5);
      overflow-x: auto;
    }

    a {
      color: #ddd;
      text-decoration: none;
      text-transform: capitalize;
      white-space: nowrap;

      &:hover {
        color: white;
      }
    }
  }
}
</style>