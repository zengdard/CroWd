<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  project: {
    current_amount: number;
    goal_amount: number;
    backers_count: number;
    end_date: string;
    rewards: Array<{
      id: string;
      title: string;
      description: string;
      amount: number;
      estimated_delivery: string;
      backers_count: number;
    }>;
  };
}>();

const emit = defineEmits<{
  (e: 'contribute', reward: any): void;
}>();

const progress = computed(() => {
  return (props.project.current_amount / props.project.goal_amount) * 100;
});

const daysLeft = computed(() => {
  const end = new Date(props.project.end_date);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long'
  });
};
</script>

<template>
  <div class="project-sidebar">
    <div class="funding-status">
      <div class="progress-bar">
        <div 
          class="progress" 
          :style="{ width: `${Math.min(progress, 100)}%` }"
        ></div>
      </div>
      
      <div class="stats">
        <div class="stat">
          <span class="amount">{{ formatCurrency(project.current_amount) }}</span>
          <span class="label">sur {{ formatCurrency(project.goal_amount) }}</span>
        </div>
        
        <div class="stat">
          <span class="amount">{{ project.backers_count }}</span>
          <span class="label">contributeurs</span>
        </div>
        
        <div class="stat">
          <span class="amount">{{ daysLeft }}</span>
          <span class="label">jours restants</span>
        </div>
      </div>
    </div>

    <div class="rewards">
      <h2>Récompenses</h2>
      <div 
        v-for="reward in project.rewards" 
        :key="reward.id"
        class="reward-card"
        @click="emit('contribute', reward)"
      >
        <div class="reward-amount">{{ formatCurrency(reward.amount) }}</div>
        <h3>{{ reward.title }}</h3>
        <p>{{ reward.description }}</p>
        <div class="reward-meta">
          <span>Livraison estimée: {{ formatDate(reward.estimated_delivery) }}</span>
          <span>{{ reward.backers_count }} contributeurs</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-sidebar {
  position: sticky;
  top: 2rem;
}

.funding-status {
  background: var(--color-background-soft);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
}

.progress-bar {
  height: 0.5rem;
  background: var(--color-background-muted);
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
}

.progress {
  height: 100%;
  background: var(--color-primary);
  border-radius: 0.25rem;
  transition: width 0.3s ease;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}

.amount {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-heading);
}

.label {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.rewards h2 {
  font-size: 1.25rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.reward-card {
  background: var(--color-background-soft);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.reward-card:hover {
  transform: translateY(-2px);
}

.reward-amount {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.reward-card h3 {
  font-size: 1.125rem;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.reward-card p {
  color: var(--color-text);
  margin-bottom: 1rem;
}

.reward-meta {
  font-size: 0.875rem;
  color: var(--color-text-light);
  display: flex;
  justify-content: space-between;
}
</style> 