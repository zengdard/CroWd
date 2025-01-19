<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const userProfile = ref({
  name: 'John Doe',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  coverImage: 'https://picsum.photos/1200/400',
  bio: 'Passionate about creating innovative projects',
  location: 'Paris, France',
  joinedDate: '2023',
  contributions: [
    { id: 1, project: 'Eco Garden', amount: 150, date: '2023-12-01' },
    { id: 2, project: 'Smart Home', amount: 300, date: '2023-11-15' },
  ],
  projects: [
    {
      id: 1,
      title: 'Urban Farming Kit',
      image: 'https://picsum.photos/300/200?random=1',
      raised: 12000,
      goal: 15000,
      backers: 124,
      status: 'active'
    },
    {
      id: 2,
      title: 'Smart Recycling Bin',
      image: 'https://picsum.photos/300/200?random=2',
      raised: 8000,
      goal: 10000,
      backers: 89,
      status: 'completed'
    }
  ],
  stats: {
    totalContributed: 450,
    projectsCreated: 2,
    projectsBacked: 5,
    totalRaised: 20000
  }
})

const calculateProgress = (raised: number, goal: number) => {
  return Math.round((raised / goal) * 100)
}
</script>

<template>
  <div class="profile-container">
    <div class="profile-header">
      <img :src="userProfile.coverImage" alt="Cover" class="cover-image">
      <div class="profile-info">
        <img :src="userProfile.avatar" alt="Avatar" class="profile-avatar">
        <div class="profile-details">
          <h1>{{ userProfile.name }}</h1>
          <p class="bio">{{ userProfile.bio }}</p>
          <div class="profile-meta">
            <span>📍 {{ userProfile.location }}</span>
            <span>🗓 Membre depuis {{ userProfile.joinedDate }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="stat-card">
        <h3>Total Contribué</h3>
        <div class="stat-value">${{ userProfile.stats.totalContributed }}</div>
      </div>
      <div class="stat-card">
        <h3>Projets Créés</h3>
        <div class="stat-value">{{ userProfile.stats.projectsCreated }}</div>
      </div>
      <div class="stat-card">
        <h3>Projets Soutenus</h3>
        <div class="stat-value">{{ userProfile.stats.projectsBacked }}</div>
      </div>
      <div class="stat-card">
        <h3>Total Levé</h3>
        <div class="stat-value">${{ userProfile.stats.totalRaised }}</div>
      </div>
    </div>

    <div class="content-grid">
      <section class="projects-section">
        <h2>Mes Projets</h2>
        <div class="projects-grid">
          <div v-for="project in userProfile.projects" :key="project.id" class="project-card">
            <img :src="project.image" :alt="project.title">
            <div class="project-info">
              <h3>{{ project.title }}</h3>
              <div class="progress-bar">
                <div class="progress" :style="{ width: `${calculateProgress(project.raised, project.goal)}%` }"></div>
              </div>
              <div class="project-stats">
                <span>${{ project.raised }} levés</span>
                <span>{{ project.backers }} contributeurs</span>
                <span class="status" :class="project.status">{{ project.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="contributions-section">
        <h2>Mes Contributions</h2>
        <div class="contributions-list">
          <div v-for="contribution in userProfile.contributions" 
               :key="contribution.id" 
               class="contribution-card">
            <div class="contribution-info">
              <h4>{{ contribution.project }}</h4>
              <p>{{ new Date(contribution.date).toLocaleDateString() }}</p>
            </div>
            <div class="contribution-amount">
              ${{ contribution.amount }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  position: relative;
  margin-bottom: 2rem;
  border-radius: 1rem;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.profile-info {
  position: relative;
  margin-top: -60px;
  padding: 0 2rem;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #1f2937;
}

.profile-details {
  margin-top: 1rem;
}

.profile-meta {
  display: flex;
  gap: 2rem;
  color: #6b7280;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #1f2937;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #ef4444;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.project-card {
  background: #1f2937;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.project-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-info {
  padding: 1rem;
}

.progress-bar {
  height: 8px;
  background: #374151;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress {
  height: 100%;
  background: #ef4444;
  transition: width 0.3s ease;
}

.project-stats {
  display: flex;
  justify-content: space-between;
  color: #9ca3af;
  font-size: 0.875rem;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
}

.status.active {
  background: #059669;
  color: white;
}

.status.completed {
  background: #6366f1;
  color: white;
}

.contribution-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #1f2937;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.contribution-amount {
  font-weight: bold;
  color: #ef4444;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>