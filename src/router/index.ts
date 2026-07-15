import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/product/:id', name: 'product-detail', component: () => import('@/views/ProductDetailView.vue')},
        { path: '/login', name: 'login', component:() => import('@/views/LoginView.vue')},
        { path: '/cart', name: 'cart', component: () => import('@/views/CartView.vue'), meta: {requiresAuth: true}},
        { path: '/wishlist', name: 'wishlist', component: () => import('@/views/WishlistView.vue'), meta: {requiresAuth: true}}
    ]
})

//to be sure user can't use wishlist and cart if it's not logged
router.beforeEach((to) => {
    if(to.meta.requiresAuth) {
        const auth = useAuthStore()
        if (!auth.isAuthenticated) {
            return { name: 'login', query: {redirect: to.fullPath} }
        }
    }
})

export default router