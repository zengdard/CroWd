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
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('../components/pages/Discover.vue')
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('../components/pages/StartProject.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/how-it-works',
    name: 'howItWorks',
    component: () => import('../components/pages/HowItWorks.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/pages/About.vue')
  },
  {
    path: '/help',
    name: 'helpCenter',
    component: () => import('../components/pages/support/HelpCenter.vue')
  },
  {
    path: '/trust-safety',
    name: 'trustAndSafety',
    component: () => import('../components/pages/support/TrustAndSafety.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../components/pages/support/Contact.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../components/pages/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;