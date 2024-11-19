<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

const navigation = [
 { name: 'Discover', href: '/discover' },
 { name: 'Start Project', href: '/start' }, 
 { name: 'About', href: '/about' },
 { name: 'How It Works', href: '/how-it-works' }
]

const toggleMenu = () => {
 isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
 <header>
   <nav>
     <div class="nav-container">
       <!-- Logo -->
       <router-link to="/" class="logo">
         <span class="crab">🦀</span>
         <span class="brand">CrabFunding</span>
       </router-link>

       <!-- Desktop Navigation -->
       <div class="desktop-nav">
         <router-link
           v-for="item in navigation"
           :key="item.name"
           :to="item.href"
           class="nav-link"
         >
           {{ item.name }}
         </router-link>
         
         <button class="sign-in-btn">
           Sign In
         </button>
       </div>

       <!-- Mobile Menu Button -->
       <button class="mobile-menu-btn" @click="toggleMenu">
         <span class="sr-only">Open menu</span>
         <svg
           class="menu-icon"
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
         >
           <path
             v-if="isMenuOpen"
             stroke-linecap="round"
             stroke-linejoin="round"
             stroke-width="2"
             d="M6 18L18 6M6 6l12 12"
           />
           <path
             v-else
             stroke-linecap="round"
             stroke-linejoin="round"
             stroke-width="2"
             d="M4 6h16M4 12h16M4 18h16"
           />
         </svg>
       </button>
     </div>

     <!-- Mobile Navigation -->
     <div class="mobile-nav" v-show="isMenuOpen">
       <router-link
         v-for="item in navigation"
         :key="item.name"
         :to="item.href"
         class="mobile-nav-link"
       >
         {{ item.name }}
       </router-link>
       <button class="mobile-sign-in">
         Sign In
       </button>
     </div>
   </nav>
 </header>
</template>

<style scoped>
header {
 background: white;
 box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
 position: fixed;
 width: 100%;
 top: 0;
 z-index: 50;
}

nav {
 max-width: 80rem;
 margin: 0 auto;
 padding: 0 1rem;
}

.nav-container {
 display: flex;
 justify-content: space-between;
 height: 4rem;
 align-items: center;
}

.logo {
 display: flex;
 align-items: center;
 text-decoration: none;
}

.crab {
 font-size: 1.5rem;
 margin-right: 0.5rem;
}

.brand {
 font-weight: 700;
 font-size: 1.25rem;
 color: #dc2626;
}

.desktop-nav {
 display: none;
 align-items: center;
 gap: 2rem;
}

@media (min-width: 640px) {
 .desktop-nav {
   display: flex;
 }
}

.nav-link {
 color: #4b5563;
 text-decoration: none;
 padding: 0.5rem 0.75rem;
 border-radius: 0.375rem;
 font-size: 0.875rem;
 font-weight: 500;
 transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
 color: #dc2626;
}

.sign-in-btn {
 background: #dc2626;
 color: white;
 padding: 0.5rem 1rem;
 border-radius: 0.375rem;
 border: none;
 font-weight: 500;
 cursor: pointer;
 transition: background 0.2s;
}

.sign-in-btn:hover {
 background: #b91c1c;
}

.mobile-menu-btn {
 display: flex;
 align-items: center;
 padding: 0.5rem;
 border-radius: 0.375rem;
 border: none;
 color: #6b7280;
 background: transparent;
 cursor: pointer;
}

@media (min-width: 640px) {
 .mobile-menu-btn {
   display: none;
 }
}

.menu-icon {
 height: 1.5rem;
 width: 1.5rem;
}

.mobile-nav {
 display: flex;
 flex-direction: column;
 padding: 0.5rem 0 0.75rem;
 gap: 0.25rem;
}

.mobile-nav-link {
 display: block;
 padding: 0.5rem 0.75rem;
 color: #4b5563;
 text-decoration: none;
 font-weight: 500;
 border-radius: 0.375rem;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
 color: #dc2626;
 background: #f3f4f6;
}

.mobile-sign-in {
 margin: 0.5rem 0.75rem 0;
 padding: 0.5rem;
 background: #dc2626;
 color: white;
 border: none;
 border-radius: 0.375rem;
 font-weight: 500;
 text-align: left;
 cursor: pointer;
}

.mobile-sign-in:hover {
 background: #b91c1c;
}

</style>