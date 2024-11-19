import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { useAuthStore } from '@/stores/auth';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    // Créer un nouvel objet AxiosHeaders
    if (!(config.headers instanceof AxiosHeaders)) {
      config.headers = new AxiosHeaders(config.headers);
    }
    
    // Définir l'en-tête d'autorisation
    config.headers.set('Authorization', `Bearer ${authStore.token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default api;