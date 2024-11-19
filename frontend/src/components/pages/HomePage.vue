<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
 {
   title: 'Secure Funding',
   description: 'Start your project and receive secure funding from supporters',
   icon: '🦀'
 },
 {
   title: 'Track Progress',
   description: 'Keep backers updated with milestones and project updates',
   icon: '📊'
 },
 {
   title: 'Community Support',
   description: 'Connect with a community of creators and backers',
   icon: '🤝'
 }
]

const goToProjects = () => {
 router.push('/projects')
}
</script>

<template>
 <div class="relative bg-white overflow-hidden">
   <div class="max-w-7xl mx-auto">
     <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
       <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
         <div class="text-center">
           <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
             <span class="block">Fund Your Dreams with</span>
             <span class="block text-red-600">CrabFunding</span>
           </h1>
           <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
             The community-driven platform where innovative ideas come to life through collective support.
           </p>
           <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
             <div class="rounded-md shadow">
               <button
                 @click="goToProjects"
                 class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
               >
                 Start Project
               </button>
             </div>
           </div>
         </div>
       </main>

       <div class="mt-20">
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
             <div
               v-for="feature in features"
               :key="feature.title"
               class="pt-6"
             >
               <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                 <div class="-mt-6">
                   <div>
                     <span class="inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg text-4xl">
                       {{ feature.icon }}
                     </span>
                   </div>
                   <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                     {{ feature.title }}
                   </h3>
                   <p class="mt-5 text-base text-gray-500">
                     {{ feature.description }}
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<style>
/* Keeping most styles the same but changing the theme colors */
.relative {
 background: radial-gradient(circle at top right, rgba(220, 38, 38, 0.1) 0%, transparent 60%);
}

h1 span.block:last-child {
 background: linear-gradient(120deg, #dc2626, #ef4444);
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
}

button {
 background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
 box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);
}

button:hover {
 box-shadow: 0 6px 20px rgba(220, 38, 38, 0.3);
}

.flow-root .inline-flex {
 background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
}

.flow-root::before {
 background: radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%);
}

/* Rest of the styles remain unchanged */
</style>