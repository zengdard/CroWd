<!-- src/components/projects/ProjectCard.vue -->
<template>
    <div class="project-card">
      <img :src="project.images[0]" :alt="project.title">
      <div class="project-info">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <div class="progress">
          <div class="progress-bar" :style="progressStyle"></div>
        </div>
        <div class="stats">
          <span>{{ fundingPercentage }}% financé</span>
          <span>{{ daysLeft }} jours restants</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import type { Project } from '@/types/Project';
  
  const props = defineProps<{
    project: Project;
  }>();
  
  const fundingPercentage = computed(() => {
    return Math.round((props.project.currentAmount / props.project.goalAmount) * 100);
  });
  
  const progressStyle = computed(() => {
    return `width: ${fundingPercentage.value}%`;
  });
  
  const daysLeft = computed(() => {
    const diff = new Date(props.project.endDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  });
  </script>