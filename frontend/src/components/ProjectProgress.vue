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

const formattedProgress = computed(() => {
  return progress.value.toFixed(1);
});

const status = computed(() => {
  if (progress.value >= 100) return 'funded';
  if (daysLeft.value === 0) return 'ended';
  return 'active';
});
</script>

<template>
  <div class="project-progress">
    <div class="progress-stats">
      <div class="stat">
        <div class="stat-value">${{ project.currentAmount.toLocaleString() }}</div>
        <div class="stat-label">raised of ${{ project.goal.toLocaleString() }}</div>
      </div>
      <div class="stat">
        <div class="stat-value">{{ formattedProgress }}%</div>
        <div class="stat-label">funded</div>
      </div>
      <div class="stat">
        <div class="stat-value">{{ daysLeft }}</div>
        <div class="stat-label">{{ daysLeft === 1 ? 'day left' : 'days left' }}</div>
      </div>
    </div>

    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${progress}%` }"
        :class="status"
      ></div>
    </div>

    <div class="status-badge" :class="status">
      {{ status === 'funded' ? 'Successfully funded!' : 
         status === 'ended' ? 'Campaign ended' : 
         'Campaign in progress' }}
    </div>
  </div>
</template>

<style scoped>
.project-progress {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.progress-bar {
  height: 0.75rem;
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

.progress-fill.funded {
  background: #059669;
}

.progress-fill.ended {
  background: #6b7280;
}

.status-badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
}

.status-badge.active {
  background: #fee2e2;
  color: #dc2626;
}

.status-badge.funded {
  background: #d1fae5;
  color: #059669;
}

.status-badge.ended {
  background: #f3f4f6;
  color: #6b7280;
}

@media (max-width: 640px) {
  .progress-stats {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .stat-value {
    font-size: 1.25rem;
  }
}
</style>
