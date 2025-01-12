<script setup lang="ts">
import { computed } from 'vue';
import type { Project } from '@/types';

const props = defineProps<{
  project: Project;
}>();

const progress = computed(() => {
  return Math.min((props.project.currentAmount / props.project.goal) * 100, 100);
});

const daysLeft = computed(() => {
  const end = new Date(props.project.endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
});
</script>

<template>
  <router-link 
    :to="{ name: 'project-detail', params: { id: project.id }}" 
    class="project-card"
  >
    <div class="card-image">
      <img 
        :src="project.imageUrl || '/placeholder-project.jpg'" 
        :alt="project.title"
      />
      <div class="category-badge">{{ project.category }}</div>
    </div>

    <div class="card-content">
      <h3 class="title">{{ project.title }}</h3>
      <p class="description">{{ project.description }}</p>
      
      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        
        <div class="stats">
          <div class="stat">
            <span class="stat-value">${{ project.currentAmount.toLocaleString() }}</span>
            <span class="stat-label">raised of ${{ project.goal.toLocaleString() }}</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ daysLeft }}</span>
            <span class="stat-label">days left</span>
          </div>
        </div>
      </div>

      <div class="creator">
        <img 
          :src="project.creator.avatar || '/placeholder-avatar.jpg'" 
          :alt="project.creator.username"
          class="creator-avatar"
        />
        <span class="creator-name">by {{ project.creator.username }}</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.project-card {
  display: block;
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
  padding-top: 56.25%;
  background: #f3f4f6;
}

.card-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.card-content {
  padding: 1.5rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.description {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.progress-bar {
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: #dc2626;
  transition: width 0.3s ease;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-weight: 600;
  color: #111827;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.creator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.creator-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  object-fit: cover;
}

.creator-name {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
