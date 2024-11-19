<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute, RouterView } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sections = [
  {
    id: 'basics',
    title: 'LaTeX Basics',
    description: 'Learn the fundamentals of LaTeX math expressions',
    path: '/learning/basics'
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    description: 'Advanced mathematical notation and complex formulas',
    path: '/learning/advanced'
  },
  {
    id: 'examples',
    title: 'Real-world Examples',
    description: 'Common mathematical expressions used in various fields',
    path: '/learning/examples'
  }
]

const currentSection = ref(sections[0])

const selectSection = (section: typeof sections[0]) => {
  currentSection.value = section
  router.push(section.path)
}

// Trouver la section actuelle basée sur la route
const findCurrentSection = () => {
  const path = route.path
  const section = sections.find(s => path.includes(s.id))
  if (section) {
    currentSection.value = section
  }
}

// Rediriger vers la première section si on est sur la route parent
onMounted(() => {
  if (route.path === '/learning') {
    router.push(sections[0].path)
  } else {
    findCurrentSection()
  }
})
</script>

<template>
  <div class="learning-container">
    <!-- Header -->
    <div class="learning-header">
      <div class="header-content">
        <h1>Learn LaTeX</h1>
      </div>
    </div>

    <div class="main-content">
      <div class="content-wrapper">
        <!-- Navigation Tabs -->
        <div class="tabs-container">
          <nav class="tabs-nav">
            <button
              v-for="section in sections"
              :key="section.id"
              @click="selectSection(section)"
              :class="['tab-button', currentSection.id === section.id ? 'active' : '']"
            >
              {{ section.title }}
            </button>
          </nav>
        </div>

        <!-- Description -->
        <div class="section-description">
          <p>{{ currentSection.description }}</p>
        </div>

        <!-- Content -->
        <div class="content-container">
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </div>

        <!-- Navigation Controls -->
        <div class="navigation-controls">
          <button
            v-if="currentSection.id !== sections[0].id"
            @click="selectSection(sections[sections.findIndex(s => s.id === currentSection.id) - 1])"
            class="nav-button prev"
          >
            ← Previous Section
          </button>
          <div class="spacer"></div>
          <button
            v-if="currentSection.id !== sections[sections.length - 1].id"
            @click="selectSection(sections[sections.findIndex(s => s.id === currentSection.id) + 1])"
            class="nav-button next"
          >
            Next Section →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learning-container {
  min-height: 100vh;
  background-color: #f9fafb;
}

.learning-header {
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

.header-content h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.content-wrapper {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.tabs-container {
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.tabs-nav {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.tab-button {
  padding: 0.75rem 1.25rem;
  border: none;
  background: none;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  border-radius: 0.375rem;
}

.tab-button:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.tab-button.active {
  background-color: #f3f4f6;
  color: #111827;
  font-weight: 600;
}

.section-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.content-container {
  min-height: 400px;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
}

.navigation-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.nav-button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #374151;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.spacer {
  flex: 1;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .tabs-nav {
    flex-wrap: wrap;
  }
  
  .tab-button {
    flex: 1 1 auto;
    text-align: center;
  }
  
  .navigation-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-button {
    width: 100%;
  }
}
</style>