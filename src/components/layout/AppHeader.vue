<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

import { useThemeStore } from '@/stores/theme'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

function onLogout(){
  auth.logout()
  router.push({name: 'home'})
}

const store = useProductsStore()
const { categories } = storeToRefs(store)

const cart = useCartStore()
const wishlist = useWishlistStore()

onMounted(() => store.loadCategories())

const theme = useThemeStore()

const isMenuOpen = ref(false)
watch(() => route.fullPath, () => { isMenuOpen.value = false })

import { computed } from 'vue'

const loginTarget = computed(() => {
    if (route.name === 'login') {
        return { name: 'login' }
    }
    return { name: 'login', query: { redirect: route.fullPath } }
})
</script>

<template>
    <header class="app-header">
    <div class="app-header__top">
      <router-link to="/" class="app-header__logo">🛍️ AZ Shop</router-link>

      <button
        class="app-header__burger"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        ☰
      </button>

      <button
        @click="theme.toggle"
        class="app-header__theme-toggle"
        :aria-label="theme.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        {{ theme.theme === 'dark' ? '☀️' : '🌙' }}
      </button>

      <div class="app-header__actions" :class="{ 'app-header__actions--open': isMenuOpen }">
        <div v-if="auth.isAuthenticated" class="app-header__actions-group">
          <router-link to="/wishlist">
            ♡ Wishlist <span v-if="wishlist.items.length !== 0">({{ wishlist.items.length }})</span>
          </router-link>
          <router-link to="/cart">
            🛒 Cart <span v-if="cart.totalCount">({{ cart.totalCount }})</span>
          </router-link>
          <span>Hi, {{ auth.username }}</span>
          <button @click="onLogout">Logout</button>
        </div>
        <div v-else class="app-header__actions-group">
          <span>Hi, Log in to use cart and wishlist</span>
          <router-link :to="loginTarget">Login</router-link>
        </div>
      </div>
    </div>

    <nav
      class="app-header__categories-bar"
      :class="{ 'app-header__categories-bar--open': isMenuOpen }"
      aria-label="Product categories"
    >
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
    flex-wrap: wrap;
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

  &__burger {
    display: none;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: var(--radius-sm);
    color: white;
    font-size: 1.25rem;
    line-height: 1;
    padding: var(--space-2) var(--space-3);
    cursor: pointer;

    &:hover {
      border-color: white;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  &__theme-toggle {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.1rem;
    margin-left: auto; // pushes itself + everything after it to the right on desktop device
  }

  // Groups the greeting/login OR wishlist/cart/greeting/logout together,
  // guaranteeing consistent gap regardless of auth state.
  &__actions-group {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
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

  @media (max-width: 768px) {
    &__burger {
      display: block;
      margin-left: auto; // on mobile, burger becomes the pusher instead of theme-toggle
    }

    &__theme-toggle {
      margin-left: 0;
    }

    &__actions {
      display: none;
      width: 100%;
      order: 10; // forces it onto its own line, below logo/burger/theme
      max-height: 60vh;
      overflow-y: auto;

      &--open {
        display: flex;
      }
    }

    &__actions-group {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      width: 100%;

      > a,
      > button,
      > span {
        display: flex;
        align-items: center;
        min-height: 44px;
        width: 100%;
        text-align: left;
        padding: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        box-sizing: border-box;
      }
    }

    &__categories-bar {
      display: none;
      max-height: 40vh;
      overflow-y: auto;

      &--open {
        display: block;
      }

      ul {
        flex-direction: column;
        overflow-x: visible;
        padding: var(--space-2) var(--space-5);
      }

      li {
        width: 100%;
      }

      a {
        display: block;
        padding: var(--space-3) 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
    }
    a {
      display: flex;
      align-items: center;
      min-height: 44px;
      padding: 0 0 0 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      box-sizing: border-box;
    }
  }
}
</style>