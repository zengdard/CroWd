Discover.vue<script setup lang="ts">
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'Eco-Friendly Ocean Cleaner',
    creator: 'Marine Solutions Inc.',
    description: 'Revolutionary device to clean ocean pollution',
    raised: 15000,
    goal: 50000,
    backers: 234,
    daysLeft: 15,
    image: 'ocean-cleaner.jpg',
    category: 'Environment'
  },
  {
    id: 2,
    title: 'Smart Urban Garden',
    creator: 'Green Tech',
    description: 'Automated vertical garden for urban spaces',
    raised: 25000,
    goal: 30000,
    backers: 456,
    daysLeft: 7,
    image: 'urban-garden.jpg',
    category: 'Technology'
  },
  // Add more sample projects
])

const categories = ref([
  'All', 'Technology', 'Environment', 'Art', 'Food', 'Games', 'Music'
])

const selectedCategory = ref('All')

const filterByCategory = (category: string) => {
  selectedCategory.value = category
}
</script>

<template>
  <div class="discover-container">
    <header class="discover-header">
      <h1>Discover Amazing Projects</h1>
      <div class="category-filters">
        <button 
          v-for="category in categories" 
          :key="category"
          :class="['category-btn', { active: selectedCategory === category }]"
          @click="filterByCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </header>

    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-image">
          <img :src="project.image" :alt="project.title">
          <div class="category-tag">{{ project.category }}</div>
        </div>
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p class="creator">by {{ project.creator }}</p>
          <p class="description">{{ project.description }}</p>
          <div class="progress-bar">
            <div 
              class="progress" 
              :style="{ width: `${(project.raised / project.goal) * 100}%` }"
            ></div>
          </div>
          <div class="stats">
            <div class="stat">
              <span class="value">${{ project.raised.toLocaleString() }}</span>
              <span class="label">raised of ${{ project.goal.toLocaleString() }}</span>
            </div>
            <div class="stat">
              <span class="value">{{ project.backers }}</span>
              <span class="label">backers</span>
            </div>
            <div class="stat">
              <span class="value">{{ project.daysLeft }}</span>
              <span class="label">days left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.discover-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.discover-header {
  text-align: center;
  margin-bottom: 3rem;
}

.discover-header h1 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.category-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-btn {
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  border: 1px solid #dc2626;
  background: transparent;
  color: #dc2626;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn.active,
.category-btn:hover {
  background: #dc2626;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(220, 38, 38, 0.9);
  color: white;
  border-radius: 15px;
  font-size: 0.875rem;
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.creator {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.description {
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #dc2626, #ef4444);
  transition: width 0.3s ease;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.value {
  font-weight: bold;
  color: #1f2937;
}

.label {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>