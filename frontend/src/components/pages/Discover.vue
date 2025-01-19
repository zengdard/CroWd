<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')

const projects = ref([
  {
    id: 1,
    title: 'Eco-Friendly Ocean Cleaner',
    creator: 'Marine Solutions Inc.',
    creatorAvatar: 'https://ui-avatars.com/api/?name=Marine+Solutions&background=random',
    description: 'Revolutionary device to clean ocean pollution using sustainable energy and innovative filtration technology',
    raised: 15000,
    goal: 50000,
    backers: 234,
    daysLeft: 15,
    image: 'https://picsum.photos/800/600?random=1',
    category: 'Environment',
    tags: ['Eco-friendly', 'Innovation', 'Technology'],
    featured: true,
    progress: 30
  },
  {
    id: 2,
    title: 'Smart Urban Garden',
    creator: 'Green Tech',
    creatorAvatar: 'https://ui-avatars.com/api/?name=Green+Tech&background=random',
    description: 'Automated vertical garden for urban spaces',
    raised: 25000,
    goal: 30000,
    backers: 456,
    daysLeft: 7,
    image: 'https://picsum.photos/800/600?random=2',
    category: 'Technology',
    tags: ['Smart Home', 'Agriculture', 'IoT'],
    featured: false
  },
  // Add more sample projects
])

const categories = ref([
  'All', 'Technology', 'Environment', 'Art', 'Food', 'Games', 'Music'
])

const selectedCategory = ref('All')

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchesCategory = selectedCategory.value === 'All' || 
                          project.category === selectedCategory.value
    const matchesSearch = project.title.toLowerCase()
                          .includes(searchQuery.value.toLowerCase()) ||
                         project.description.toLowerCase()
                          .includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const calculateTimeLeft = (daysLeft: number) => {
  if (daysLeft > 30) return `${Math.floor(daysLeft / 30)} mois restants`
  if (daysLeft > 0) return `${daysLeft} jours restants`
  return 'Projet terminé'
}
</script>

<template>
  <div class="discover-container">
    <header class="discover-header">
      <h1>Découvrez des Projets Innovants</h1>
      
      <div class="search-bar">
        <input 
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher un projet..."
          class="search-input"
        >
      </div>

      <div class="category-filters">
        <button 
          v-for="category in categories" 
          :key="category"
          :class="['category-btn', { active: selectedCategory === category }]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </header>

    <div class="projects-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="project-card"
        :class="{ 'featured': project.featured }"
      >
        <div class="project-image">
          <img :src="project.image" :alt="project.title">
          <div class="category-tag">{{ project.category }}</div>
          <div v-if="project.featured" class="featured-badge">⭐ Featured</div>
        </div>

        <div class="project-info">
          <div class="project-header">
            <h3>{{ project.title }}</h3>
            <div class="tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>

          <p class="creator">
            <img :src="project.creatorAvatar" class="creator-avatar">
            par {{ project.creator }}
          </p>

          <p class="description">{{ project.description }}</p>

          <div class="progress-section">
            <div class="progress-bar">
              <div 
                class="progress" 
                :style="{ width: `${(project.raised / project.goal) * 100}%` }"
              ></div>
            </div>
            <div class="progress-stats">
              <span class="percentage">{{ Math.round((project.raised / project.goal) * 100) }}%</span>
              <span class="goal">objectif: ${{ project.goal.toLocaleString() }}</span>
            </div>
          </div>

          <div class="stats">
            <div class="stat">
              <span class="value">${{ project.raised.toLocaleString() }}</span>
              <span class="label">collectés</span>
            </div>
            <div class="stat">
              <span class="value">{{ project.backers }}</span>
              <span class="label">contributeurs</span>
            </div>
            <div class="stat">
              <span class="value time-left">{{ calculateTimeLeft(project.daysLeft) }}</span>
            </div>
          </div>

          <router-link :to="`/projects/${project.id}`" class="view-project">
            Voir le projet
            <span class="arrow">→</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discover-container {
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.search-bar {
  margin: 2rem 0;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 1rem 1.5rem;
  border: 2px solid #374151;
  border-radius: 2rem;
  background: #1f2937;
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.project-card {
  position: relative;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.project-card.featured {
  border: 2px solid #ef4444;
}

.featured-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-weight: 600;
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.5rem 0;
}

.tag {
  background: #374151;
  color: #9ca3af;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
}

.creator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.creator-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.progress-section {
  margin: 1.5rem 0;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.view-project {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef4444;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  transition: gap 0.3s ease;
}

.view-project:hover {
  gap: 1rem;
}

.arrow {
  transition: transform 0.3s ease;
}

.view-project:hover .arrow {
  transform: translateX(4px);
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