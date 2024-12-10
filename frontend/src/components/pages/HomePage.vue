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
 router.push('/discover')
}
</script>

<template>
 <div class="hero">
   <div class="container">
     <div class="hero-content">
       <main class="main-content">
         <div class="text-center">
           <h1>
             <span>Fund Your Dreams with</span>
             <span class="highlight">CrabFunding</span>
           </h1>
           
           <p class="hero-description">
             The community-driven platform where innovative ideas come to life through collective support.
           </p>

           <div class="cta-wrapper">
             <button @click="goToProjects" class="cta-button">
               Discover Project
             </button>
           </div>
         </div>
       </main>

       <div class="features-section">
         <div class="features-grid">
           <div
             v-for="feature in features"
             :key="feature.title"
             class="feature-card"
           >
             <div class="feature-content">
               <div class="feature-icon-wrapper">
                 <span class="feature-icon">{{ feature.icon }}</span>
               </div>
               <h3 class="feature-title">{{ feature.title }}</h3>
               <p class="feature-description">{{ feature.description }}</p>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<style scoped>
.hero {
 position: relative;
 background: radial-gradient(circle at top right, rgba(220, 38, 38, 0.1) 0%, transparent 60%);
 overflow: hidden;
}

.container {
 max-width: 80rem;
 margin: 0 auto;
 padding: 0 1rem;
}

.hero-content {
 position: relative;
 z-index: 10;
 padding: 2rem 0;
}

.main-content {
 margin-top: 2.5rem;
 padding: 0 1rem;
}

@media (min-width: 640px) {
 .main-content {
   margin-top: 3rem;
 }
}

@media (min-width: 768px) {
 .main-content {
   margin-top: 4rem;
 }
}

h1 {
 font-size: 2.25rem;
 font-weight: 800;
 line-height: 1.2;
 letter-spacing: -0.025em;
 color: #111827;
}

@media (min-width: 640px) {
 h1 {
   font-size: 3rem;
 }
}

@media (min-width: 768px) {
 h1 {
   font-size: 3.75rem;
 }
}

h1 span {
 display: block;
}

.highlight {
 background: linear-gradient(120deg, #dc2626, #ef4444);
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
}

.hero-description {
 margin-top: 1.5rem;
 font-size: 1rem;
 color: #6b7280;
 max-width: 36rem;
 margin-left: auto;
 margin-right: auto;
}

@media (min-width: 640px) {
 .hero-description {
   margin-top: 1.25rem;
   font-size: 1.125rem;
 }
}

@media (min-width: 768px) {
 .hero-description {
   font-size: 1.25rem;
 }
}

.cta-wrapper {
 margin-top: 2rem;
}

@media (min-width: 640px) {
 .cta-wrapper {
   display: flex;
   justify-content: center;
 }
}

.cta-button {
 display: inline-flex;
 align-items: center;
 justify-content: center;
 padding: 0.75rem 2rem;
 font-size: 1rem;
 font-weight: 500;
 color: white;
 background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
 border: none;
 border-radius: 0.375rem;
 cursor: pointer;
 transition: all 0.2s;
 box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);
}

@media (min-width: 768px) {
 .cta-button {
   padding: 1rem 2.5rem;
   font-size: 1.125rem;
 }
}

.cta-button:hover {
 transform: translateY(-2px);
 box-shadow: 0 6px 20px rgba(220, 38, 38, 0.3);
}

.features-section {
 margin-top: 5rem;
 padding: 0 1rem;
}

.features-grid {
 display: grid;
 grid-template-columns: 1fr;
 gap: 2rem;
}

@media (min-width: 640px) {
 .features-grid {
   grid-template-columns: repeat(2, 1fr);
 }
}

@media (min-width: 1024px) {
 .features-grid {
   grid-template-columns: repeat(3, 1fr);
 }
}

.feature-card {
 padding-top: 1.5rem;
}

.feature-content {
 background: #f9fafb;
 border-radius: 0.5rem;
 padding: 1.5rem;
 height: 100%;
 position: relative;
 transition: transform 0.2s;
}

.feature-content:hover {
 transform: translateY(-5px);
}

.feature-icon-wrapper {
 display: inline-flex;
 align-items: center;
 justify-content: center;
 padding: 0.75rem;
 background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
 border-radius: 0.375rem;
 box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);
 margin-top: -2.5rem;
}

.feature-icon {
 font-size: 2rem;
}

.feature-title {
 margin-top: 2rem;
 font-size: 1.125rem;
 font-weight: 500;
 color: #111827;
}

.feature-description {
 margin-top: 1.25rem;
 color: #6b7280;
}
</style>