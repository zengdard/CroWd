<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)
const showDropdown = ref(false)
const dropdown = ref(null)

const navigation = [
 { name: 'Discover', href: '/discover' },
 { name: 'Start Project', href: '/start' }, 
 { name: 'About', href: '/about' },
 { name: 'How It Works', href: '/how-it-works' }
]

const toggleDropdown = () => {
 showDropdown.value = !showDropdown.value
}

const closeDropdown = (event: MouseEvent) => {
 if (dropdown.value && !dropdown.value.contains(event.target)) {
   showDropdown.value = false
 }
}

const logout = () => {
 authStore.logout()
 showDropdown.value = false
}

onMounted(() => {
 document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
 document.removeEventListener('click', closeDropdown)
})
</script>

<template>
 <header class="header">
   <div class="container">
     <router-link to="/" class="logo">
       <span class="crab">🦀</span>
       <span class="brand">CrabFunding</span>
     </router-link>

     <nav class="nav">
       <router-link to="/discover">Découvrir</router-link>
       <router-link to="/start">Lancer un projet</router-link>
     </nav>

     <div class="auth-section" v-if="!isAuthenticated">
       <router-link to="/login" class="btn btn-secondary">Connexion</router-link>
       <router-link to="/register" class="btn btn-primary">Inscription</router-link>
     </div>
     
     <div class="user-menu" v-else>
       <div class="dropdown" @click="toggleDropdown" ref="dropdown">
         <img 
           :src="user?.profile_image || '/default-avatar.png'" 
           alt="Profile" 
           class="avatar"
         >
         <div class="dropdown-menu" v-show="showDropdown">
           <router-link to="/profile">Mon profil</router-link>
           <router-link to="/dashboard">Tableau de bord</router-link>
           <router-link to="/settings">Paramètres</router-link>
           <button @click="logout">Déconnexion</button>
         </div>
       </div>
     </div>
   </div>
 </header>
</template>

<style scoped>
.header {
  background: #111827;
  border-bottom: 1px solid #374151;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.crab {
  font-size: 1.75rem;
  margin-right: 0.5rem;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ef4444;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.nav a:hover {
  color: #ef4444;
}

.auth-section {
  display: flex;
  gap: 1rem;
}

.auth-section .btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}

.btn-primary {
  background: #ef4444;
  color: white;
}

.btn-primary:hover {
  background: #dc2626;
}

.btn-secondary {
  background: transparent;
  color: #9ca3af;
  border: 1px solid #374151;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-menu {
  position: relative;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #374151;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  padding: 0.5rem;
  min-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.dropdown-menu a,
.dropdown-menu button {
  display: block;
  padding: 0.5rem 1rem;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: #9ca3af;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  background-color: #374151;
  color: #ef4444;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
}
</style>