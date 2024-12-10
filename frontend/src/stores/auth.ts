// frontend/src/stores/auth.ts
import { defineStore } from 'pinia'
import api from '@/utils/axios'

interface User {
  id: string
  username: string
  email: string
  profile_image?: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false
  }),

  actions: {
    init() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.fetchUser();
      }
    },

    async fetchUser() {
      try {
        const response = await api.get('/api/auth/me');
        this.user = response.data;
      } catch (error) {
        this.logout();
      }
    },

    async login(credentials: any) {
      try {
        const response = await api.post('/auth/login', credentials);
        this.setToken(response.data.token);
        this.setUser(response.data.user);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async register(userData: any) {
      try {
        const response = await api.post('/auth/register', userData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    setUser(user: any) {
      this.user = user;
      this.isAuthenticated = true;
    },

    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    updateUser(userData: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...userData }
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  }
})