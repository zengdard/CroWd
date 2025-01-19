// frontend/src/stores/auth.ts
import { defineStore } from 'pinia'
import { authService, type LoginCredentials, type RegisterData } from '@/services/auth.service'
import router from '@/router'

interface User {
  id: number
  email: string
  username: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: {
      id: 1,
      email: 'test@test.com',
      username: ''
    },
    token: localStorage.getItem('token'),
    isAuthenticated: true
  }),

  actions: {
    async login(credentials: LoginCredentials) {
      const { user, token } = await authService.login(credentials)
      this.setAuthData(user, token)
      await router.push('/')
    },

    async register(data: RegisterData) {
      const { user, token } = await authService.register(data)
      this.setAuthData(user, token)
      await router.push('/')
    },

    async logout() {
      await authService.logout()
      this.clearAuthData()
      await router.push('/login')
    },

    async fetchCurrentUser() {
      if (this.token) {
        try {
          const user = await authService.getCurrentUser()
          this.user = user
        } catch {
          this.clearAuthData()
        }
      }
    },

    setAuthData(user: User, token: string) {
      this.user = user
      this.token = token
      this.isAuthenticated = true
      localStorage.setItem('token', token)
    },

    clearAuthData() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})