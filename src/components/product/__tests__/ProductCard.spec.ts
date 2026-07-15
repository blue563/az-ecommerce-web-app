import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import ProductCard from '../ProductCard.vue'
import type { Product } from '@/types/product'

const product: Product = {
    id: 1,
    title: 'Test Product',
    price: 42.5,
    description: 'desc',
    category: 'electronics',
    image: 'https://example.com/img.jpg',
    rating: { rate: 4, count: 10 },
}

async function mountWithRouter() {
    const router = createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/', name: 'home', component: { template: '<div />' } },
            { path: '/product/:id', name: 'product-detail', component: { template: '<div />' } },
        ],
    })
    router.push('/')
    await router.isReady()

    return mount(ProductCard, { props: { product }, global: { plugins: [router] } })
}

describe('ProductCard', () => {
    it('renders title, price, image alt', async () => {
        const wrapper = await mountWithRouter()
        expect(wrapper.text()).toContain('Test Product')
        expect(wrapper.get('img').attributes('alt')).toBe('Test Product')
    })
})