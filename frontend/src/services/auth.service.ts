import axios from '@/lib/axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

class AuthService {
  async login(credentials: LoginCredentials) {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  }

  async register(data: RegisterData) {
    const response = await axios.post('/auth/register', data);
    return response.data;
  }

  async getCurrentUser() {
    const response = await axios.get('/auth/me');
    return response.data;
  }

  async logout() {
    const response = await axios.post('/auth/logout');
    return response.data;
  }
}

export const authService = new AuthService();
