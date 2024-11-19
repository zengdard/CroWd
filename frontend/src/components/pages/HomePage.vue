<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
  {
    title: 'Easy LaTeX Editing',
    description: 'Create and edit LaTeX formulas with real-time preview',
    icon: '📝'
  },
  {
    title: 'Interactive Learning',
    description: 'Learn LaTeX through interactive tutorials and exercises',
    icon: '📚'
  },
  {
    title: 'Formula Library',
    description: 'Save and organize your frequently used formulas',
    icon: '📖'
  }
]

const goToEditor = () => {
  router.push('/editor')
}
</script>

<template>
  <div class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
          <div class="text-center">
            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block">Create Beautiful</span>
              <span class="block text-indigo-600">LaTeX Formulas</span>
            </h1>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
              A simple and powerful editor for creating and learning LaTeX mathematical formulas.
            </p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center">
              <div class="rounded-md shadow">
                <button
                  @click="goToEditor"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Start Creating
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
                      <span class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg text-4xl">
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
/* Reset et styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.5;
  color: #1f2937;
  background: linear-gradient(135deg, #f6f8fd 0%, #ffffff 100%);
}

/* Container principal avec un fond subtil */
.relative {
  position: relative;
  background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.1) 0%, transparent 60%);
  min-height: 100vh;
}

/* Layout principal */
.max-w-7xl {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Animation pour le titre */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Titre avec animation */
h1 {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.2;
  animation: slideUp 0.8s ease-out forwards;
}

h1 span.block {
  display: block;
}

h1 span.block:last-child {
  background: linear-gradient(120deg, #4f46e5, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

/* Description avec animation */
p {
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: #4b5563;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  animation: slideUp 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

/* Bouton moderne avec effet hover */
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);
  animation: slideUp 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);
}

/* Section des fonctionnalités */
.mt-20 {
  margin-top: 6rem;
  animation: slideUp 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

.grid {
  display: grid;
  gap: 2.5rem;
  padding: 0 1rem;
}

/* Cartes des fonctionnalités avec effet hover */
.flow-root {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  height: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.flow-root:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(79, 70, 229, 0.15);
}

/* Icône des fonctionnalités */
.flow-root .inline-flex {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.2);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

/* Titres et descriptions des fonctionnalités */
.flow-root h3 {
  margin-top: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.flow-root p {
  margin-top: 1rem;
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
}

/* Effet de particules en arrière-plan */
.flow-root::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.flow-root:hover::before {
  opacity: 1;
}

/* Media queries pour le responsive */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  h1 {
    font-size: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  h1 {
    font-size: 4rem;
  }
  
  .max-w-7xl {
    padding: 3rem 2rem;
  }
}

/* Animation pour le scroll */
@media (prefers-reduced-motion: no-preference) {
  .scroll-smooth {
    scroll-behavior: smooth;
  }
}
</style>