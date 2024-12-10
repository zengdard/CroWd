<script setup lang="ts">
defineProps<{
  project: {
    description: string;
    updates: Array<{
      id: string;
      title: string;
      content: string;
      date: string;
    }>;
  };
}>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<template>
  <div class="project-content">
    <section class="description">
      <h2>À propos du projet</h2>
      <div class="content" v-html="project.description"></div>
    </section>

    <section v-if="project.updates.length" class="updates">
      <h2>Mises à jour</h2>
      <div 
        v-for="update in project.updates" 
        :key="update.id" 
        class="update"
      >
        <h3>{{ update.title }}</h3>
        <time>{{ formatDate(update.date) }}</time>
        <div class="content" v-html="update.content"></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.project-content {
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

section {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 1.5rem;
}

.content {
  color: var(--color-text);
  line-height: 1.6;
}

.updates .update {
  padding: 1.5rem;
  background: var(--color-background-soft);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
}

.update h3 {
  font-size: 1.25rem;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.update time {
  display: block;
  color: var(--color-text-light);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
</style> 