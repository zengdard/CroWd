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
    path: '/start-project',
    name: 'start-project',
    component: () => import('../components/pages/StartProject.vue'),
    meta: { requiresAuth: true } // Ajout d'une protection pour nécessiter l'authentification
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/pages/About.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard pour les routes protégées
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;