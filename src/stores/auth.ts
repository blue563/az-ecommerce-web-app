import { defineStore } from 'pinia'
import { login as loginRequest } from '@/api/auth'
import type { LoginCredentials } from '@/types/auth'

const TOKEN_KEY = 'shopvue_token'

interface AuthState {
    token: string | null
    username: string | null
    error: string | null
    isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem(TOKEN_KEY),
        username: localStorage.getItem('shopvue_username'),
        isLoading: false,
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => Boolean(state.token),
    },

    actions: {
        async login(credentials: LoginCredentials) {
            this.isLoading = true
            this.error = null

            try {
                const { token } = await loginRequest(credentials)
                this.token = token
                this.username = credentials.username
                localStorage.setItem(TOKEN_KEY, token)
                localStorage.setItem('shopvue_username', credentials.username)
                
                return true
            } catch (err) {
                this.error = 'Invalid username or password.'
                return false
            } finally {
                this.isLoading = false
            }
        },

        logout() {
            this.token = null
            this.username = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem('shopvue_username')
        }
    }
})