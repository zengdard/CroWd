<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import { useAuthStore } from '@/stores/auth';
import type { Project } from '@/types';

const router = useRouter();
const projectStore = useProjectStore();
const authStore = useAuthStore();

const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref('');

const stats = ref({
  totalProjects: 0,
  totalFunding: 0,
  activeProjects: 0,
  successRate: 0
});

onMounted(async () => {
  try {
    if (!authStore.user) {
      router.push('/login');
      return;
    }

    await fetchCreatorProjects();
    calculateStats();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

const fetchCreatorProjects = async () => {
  if (authStore.user) {
    const response = await projectStore.getProjectsByCreator(authStore.user.id);
    projects.value = response;
  }
};

const calculateStats = () => {
  stats.value = {
    totalProjects: projects.value.length,
    totalFunding: projects.value.reduce((sum, project) => sum + project.currentAmount, 0),
    activeProjects: projects.value.filter(p => p.status === 'active').length,
    successRate: calculateSuccessRate()
  };
};

const calculateSuccessRate = () => {
  const completedProjects = projects.value.filter(p => p.status === 'completed');
  return completedProjects.length > 0
    ? (completedProjects.filter(p => p.currentAmount >= p.goal).length / completedProjects.length) * 100
    : 0;
};

const handleEditProject = (projectId: number) => {
  router.push(`/projects/${projectId}/edit`);
};

const handleCreateProject = () => {
  router.push('/projects/new');
};
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Creator Dashboard</h1>
      <button @click="handleCreateProject" class="create-button">
        Create New Project
      </button>
    </div>

    <div v-if="loading" class="loading">
      Loading your projects...
    </div>

    <template v-else-if="!error">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Projects</h3>
          <p>{{ stats.totalProjects }}</p>
        </div>
        <div class="stat-card">
          <h3>Total Funding</h3>
          <p>${{ stats.totalFunding.toLocaleString() }}</p>
        </div>
        <div class="stat-card">
          <h3>Active Projects</h3>
          <p>{{ stats.activeProjects }}</p>
        </div>
        <div class="stat-card">
          <h3>Success Rate</h3>
          <p>{{ stats.successRate.toFixed(1) }}%</p>
        </div>
      </div>

      <div class="projects-section">
        <h2>Your Projects</h2>
        <div class="projects-list" v-if="projects.length > 0">
          <div v-for="project in projects" :key="project.id" class="project-card">
            <div class="project-info">
              <h3>{{ project.title }}</h3>
              <p class="status" :class="project.status">{{ project.status }}</p>
              <div class="progress">
                <div class="progress-text">
                  <span>${{ project.currentAmount.toLocaleString() }}</span>
                  <span>of ${{ project.goal.toLocaleString() }}</span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress-fill"
                    :style="{ width: `${(project.currentAmount / project.goal) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="project-actions">
              <button @click="handleEditProject(project.id)" class="edit-button">
                Edit Project
              </button>
              <router-link :to="`/projects/${project.id}`" class="view-button">
                View Project
              </router-link>
            </div>
          </div>
        </div>
        <div v-else class="no-projects">
          <p>You haven't created any projects yet.</p>
          <button @click="handleCreateProject" class="create-button">
            Create Your First Project
          </button>
        </div>
      </div>
    </template>

    <div v-else class="error">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.projects-section {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.project-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.project-info {
  flex: 1;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status.active {
  background: #dcfce7;
  color: #15803d;
}

.status.completed {
  background: #dbeafe;
  color: #1e40af;
}

.status.draft {
  background: #f3f4f6;
  color: #4b5563;
}

.progress {
  margin-top: 0.5rem;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.progress-bar {
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #dc2626;
  transition: width 0.3s ease;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
}

.create-button, .edit-button, .view-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
}

.create-button {
  background: #dc2626;
  color: white;
  border: none;
}

.edit-button {
  background: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.view-button {
  background: white;
  color: #dc2626;
  border: 1px solid #dc2626;
}

.loading, .error, .no-projects {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

@media (max-width: 640px) {
  .project-card {
    flex-direction: column;
    gap: 1rem;
  }

  .project-actions {
    width: 100%;
    justify-content: stretch;
  }

  .create-button, .edit-button, .view-button {
    flex: 1;
    text-align: center;
  }
}
</style>
