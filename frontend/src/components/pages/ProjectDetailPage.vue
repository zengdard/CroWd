<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import { useContributionStore } from '@/stores/contribution';
import ContributionForm from '../ContributionForm.vue';
import CommentSection from '../CommentSection.vue';
import ProjectProgress from '../ProjectProgress.vue';

const route = useRoute();
const projectStore = useProjectStore();
const contributionStore = useContributionStore();
const loading = ref(true);

onMounted(async () => {
  const projectId = Number(route.params.id);
  await projectStore.fetchProject(projectId);
  await contributionStore.fetchProjectContributions(projectId);
  loading.value = false;
});
</script>

<template>
  <div class="project-detail">
    <div v-if="loading" class="loading">Loading...</div>
    
    <template v-else-if="projectStore.currentProject">
      <div class="project-header">
        <h1>{{ projectStore.currentProject.title }}</h1>
        <img 
          v-if="projectStore.currentProject.imageUrl" 
          :src="projectStore.currentProject.imageUrl" 
          :alt="projectStore.currentProject.title"
        >
      </div>

      <div class="project-content">
        <div class="project-info">
          <ProjectProgress :project="projectStore.currentProject" />
          <p class="description">{{ projectStore.currentProject.description }}</p>
        </div>

        <div class="project-sidebar">
          <ContributionForm :projectId="projectStore.currentProject.id" />
        </div>
      </div>

      <CommentSection :projectId="projectStore.currentProject.id" />
    </template>

    <div v-else class="error">
      Project not found
    </div>
  </div>
</template>

<style scoped>
.project-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.project-header {
  margin-bottom: 2rem;
}

.project-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.project-info {
  padding-right: 2rem;
}

@media (max-width: 768px) {
  .project-content {
    grid-template-columns: 1fr;
  }

  .project-info {
    padding-right: 0;
  }
}
</style>
