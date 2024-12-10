<template>
  <div class="project-page">
    <div v-if="loading" class="loading">
      Chargement...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <template v-else-if="project">
      <ProjectHeader :project="project" />

      <div class="project-layout">
        <ProjectContent :project="project" />
        <ProjectSidebar 
          :project="project" 
          @contribute="handleContribute"
        />
      </div>

      <ContributionModal
        v-if="showContributionModal"
        :reward="selectedReward"
        :project="project"
        @close="closeModal"
        @submit="handleContributionSubmit"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/utils/axios'
import ProjectHeader from '@/components/project/ProjectHeader.vue'
import ProjectContent from '@/components/project/ProjectContent.vue'
import ProjectSidebar from '@/components/project/ProjectSidebar.vue'
import ContributionModal from '@/components/project/ContributionModal.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const project = ref(null)
const loading = ref(true)
const error = ref(null)
const showContributionModal = ref(false)
const selectedReward = ref(null)

const fetchProject = async () => {
  try {
    loading.value = true
    const response = await api.get(`/api/projects/${route.params.id}`)
    project.value = response.data
  } catch (err) {
    error.value = 'Erreur lors du chargement du projet'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleContribute = (reward: any) => {
  if (!authStore.isAuthenticated) {
    router.push({
      path: '/login',
      query: { redirect: route.fullPath }
    })
    return
  }
  selectedReward.value = reward
  showContributionModal.value = true
}

const closeModal = () => {
  showContributionModal.value = false
  selectedReward.value = null
}

const handleContributionSubmit = async (amount: number) => {
  try {
    await api.post('/api/contributions', {
      projectId: project.value.id,
      rewardId: selectedReward.value.id,
      amount
    })
    await fetchProject() // Rafraîchir les données du projet
    closeModal()
  } catch (err) {
    console.error('Erreur lors de la contribution:', err)
  }
}

onMounted(fetchProject)
</script>

<style scoped>
.project-page {
  padding: 2rem 0;
}

.project-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: var(--color-danger);
}

@media (max-width: 768px) {
  .project-layout {
    grid-template-columns: 1fr;
  }
}
</style> 