import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light',
    }),
    actions: {
        init() {
            document.documentElement.setAttribute('data-theme', this.theme)
        },
        toggle() {
            this.theme = this.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', this.theme)
            document.documentElement.setAttribute('data-theme', this.theme)
        },
    },
})