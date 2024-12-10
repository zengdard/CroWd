<script setup lang="ts">
defineProps<{
  project: {
    title: string;
    creator: {
      username: string;
      profile_image?: string;
    };
    category: string;
    image_url: string;
  };
}>();
</script>

<template>
  <div class="project-header">
    <div class="container">
      <div class="project-info">
        <h1>{{ project.title }}</h1>
        <div class="meta">
          <div class="creator">
            <img 
              :src="project.creator.profile_image || '/default-avatar.png'" 
              :alt="project.creator.username"
              class="creator-avatar"
            >
            <span>Par {{ project.creator.username }}</span>
          </div>
          <span class="category">{{ project.category }}</span>
        </div>
      </div>
      <div class="project-image">
        <img :src="project.image_url" :alt="project.title">
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-header {
  background: var(--color-background-soft);
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.project-info {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 2rem;
  color: var(--color-text-light);
}

.creator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.creator-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.project-image img {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
}
</style> 