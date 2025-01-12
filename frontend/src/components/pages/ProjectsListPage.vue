<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProjectStore } from '@/stores/project';
import ProjectCard from '../ProjectCard.vue';
import ProjectFilters from '../ProjectFilters.vue';
import type { Project } from '@/types';

const projectStore = useProjectStore();
const searchQuery = ref('');
const selectedCategory = ref('all');

const filteredProjects = computed(() => {
  return projectStore.projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'all' || project.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});
</script>

<template>
  <div class="projects-page">
    <div class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search projects..."
        class="search-input"
      />
      <ProjectFilters v-model="selectedCategory" />
    </div>

    <div class="projects-grid">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.search-section {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
</style>
