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
 <header class="bg-white shadow-sm fixed w-full top-0 z-50">
   <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div class="flex justify-between h-16">
       <!-- Logo -->
       <div class="flex-shrink-0 flex items-center">
         <router-link to="/" class="flex items-center">
           <span class="text-2xl mr-2">🦀</span>
           <span class="font-bold text-xl text-red-600">CrabFunding</span>
         </router-link>
       </div>

       <!-- Desktop Navigation -->
       <div class="hidden sm:flex sm:space-x-8 items-center">
         <router-link
           v-for="item in navigation"
           :key="item.name"
           :to="item.href"
           class="text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
         >
           {{ item.name }}
         </router-link>
         
         <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
           Sign In
         </button>
       </div>

       <!-- Mobile menu button -->
       <div class="flex items-center sm:hidden">
         <button
           @click="toggleMenu"
           class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
         >
           <span class="sr-only">Open main menu</span>
           <svg
             class="h-6 w-6"
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
     </div>

     <!-- Mobile Navigation -->
     <div
       v-show="isMenuOpen"
       class="sm:hidden"
     >
       <div class="pt-2 pb-3 space-y-1">
         <router-link
           v-for="item in navigation"
           :key="item.name"
           :to="item.href"
           class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50"
         >
           {{ item.name }}
         </router-link>
         <button class="w-full text-left px-3 py-2 text-base font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
           Sign In
         </button>
       </div>
     </div>
   </nav>
 </header>
</template>

<style scoped>
.router-link-active {
 color: #dc2626;
}
</style>