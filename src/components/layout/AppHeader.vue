<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()
const { categories } = storeToRefs(store)

onMounted(() => store.loadCategories())
</script>

<template>
    <header class="app-header">
    <div class="app-header__top">
      <router-link to="/" class="app-header__logo">🛍️ AZ Shop</router-link>

      <div class="app-header__actions">
        <router-link to="/wishlist">♡</router-link>
        <router-link to="/cart">🛒</router-link>
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
    padding: var(--space-3) var(--space-5);
  }

  &__logo {
    color: white;
    text-decoration: none;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  &__actions {
    display: flex;
    gap: var(--space-4);

    a {
      color: white;
      text-decoration: none;
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