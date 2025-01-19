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
    path: '/projects',
    name: 'projects',
    component: () => import('../components/pages/ProjectsListPage.vue')
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('../components/pages/ProjectDetailPage.vue')
  },
  {
    path: '/projects/new',
    name: 'project-create',
    component: () => import('../components/pages/ProjectCreatePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:id/edit',
    name: 'project-edit',
    component: () => import('../components/pages/ProjectEditPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/pages/CreatorDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../components/pages/SettingsPage.vue'),
    meta: { requiresAuth: true }
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

// Commentez ou supprimez temporairement le guard de navigation
router.beforeEach((to) => {
  // Commentez tout le bloc de vérification
  /*
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }
  */
  return true
})

export default router;