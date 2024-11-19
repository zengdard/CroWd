import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/pages/HomePage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/pages/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/pages/RegisterPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;