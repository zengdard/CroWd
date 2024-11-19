<template>
  <header class="header">
    <nav class="nav-container">
      <div class="nav-content">
        <!-- Logo et Nom -->
        <div class="logo-container">
          <img src="./../assets/latexeditor-high-resolution-logo-transparent.png" alt="Logo" class="logo" />
          <span class="app-title">LaTeXEditor</span>
        </div>

        <!-- Menu burger pour mobile -->
        <button class="mobile-menu-button" @click="isMenuOpen = !isMenuOpen">
          <span class="menu-icon"></span>
        </button>

        <!-- Navigation -->
        <div class="nav-links" :class="{ 'nav-open': isMenuOpen }">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          <router-link to="/editor" class="nav-link" active-class="active">Editor</router-link>
          <router-link to="/learning" class="nav-link" active-class="active">Learning</router-link>
        </div>

        <!-- Boutons Premium et Déconnexion -->
        <div class="right-buttons">
          <div v-if="isPremium" class="premium-features">
            <router-link to="/text-to-latex" class="premium-button">
              Text to LaTeX Assistant
            </router-link>
            <router-link to="/image-to-latex" class="premium-button">
              Image to LaTeX Converter
            </router-link>
          </div>
          <div v-else>
            <router-link to="/premium" class="upgrade-button">
              Upgrade to Premium
            </router-link>
          </div>
          <button v-if="isAuthenticated" @click="handleLogout" class="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const isMenuOpen = ref(false);

const props = withDefaults(defineProps<{
  isPremium?: boolean;
}>(), {
  isPremium: false
});

const isAuthenticated = computed(() => authStore.isAuthenticated);

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
/* Styles existants... */

.right-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #ff0000;
}

@media (max-width: 768px) {
  .right-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .logout-button {
    width: 100%;
    margin-top: 0.5rem;
  }
}

/* Ajoutez ces styles pour améliorer la réactivité */
@media (max-width: 1024px) {
  .premium-features {
    flex-direction: column;
    gap: 0.5rem;
  }

  .premium-button,
  .upgrade-button {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
  }

  .nav-links {
    width: 100%;
    flex-direction: column;
    padding: 1rem 0;
  }

  .right-buttons {
    width: 100%;
    padding: 1rem 0;
  }
}
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.logo {
  height: 2rem;
  width: auto;
  object-fit: contain;
}

.app-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  white-space: nowrap;
}

/* Menu mobile */
.mobile-menu-button {
  display: block;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 101;
}

.menu-icon {
  display: block;
  width: 1.5rem;
  height: 2px;
  background-color: #1a1a1a;
  position: relative;
  transition: all 0.3s;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #1a1a1a;
  transition: all 0.3s;
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  bottom: -6px;
}

/* Navigation */
.nav-links {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  background-color: white;
  padding: 5rem 2rem 2rem;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-links.nav-open {
  right: 0;
}

.nav-link {
  color: #4a5568;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.active {
  color: #1a1a1a;
  background-color: #f3f4f6;
}

.upgrade-button {
  background-color: #ffd700;
  color: #000;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.upgrade-button:hover {
  background-color: #ffed4a;
}

.premium-button {
  background-color: #4a5568;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  margin-left: 8px;
  transition: background-color 0.3s;
}

.premium-button:hover {
  background-color: #2d3748;
}


/* Bouton Premium */
.premium-button {
  background-color: #9333ea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  white-space: nowrap;
}

.premium-button:hover {
  background-color: #7e22ce;
  transform: translateY(-1px);
}

.premium-button:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (min-width: 768px) {
  .nav-container {
    padding: 1rem 2rem;
  }

  .mobile-menu-button {
    display: none;
  }

  .nav-links {
    position: static;
    height: auto;
    padding: 0;
    background: none;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
    flex: 1;
    justify-content: center;
  }

  .nav-link {
    padding: 0.5rem 0.75rem;
  }

  .premium-container {
    margin-left: auto;
  }
}

@media (min-width: 1024px) {
  .nav-links {
    gap: 2rem;
  }

  .app-title {
    font-size: 1.25rem;
  }
}

/* Animation du menu burger */
.nav-open .menu-icon {
  background-color: transparent;
}

.nav-open .menu-icon::before {
  transform: rotate(45deg);
  top: 0;
}

.nav-open .menu-icon::after {
  transform: rotate(-45deg);
  bottom: 0;
}
</style>