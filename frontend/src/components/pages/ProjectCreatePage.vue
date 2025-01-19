<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = 4

const projectData = ref({
  basics: {
    title: '',
    category: '',
    shortDescription: '',
    location: ''
  },
  funding: {
    goal: null as number | null,
    duration: 30,
    rewards: [
      { title: '', description: '', amount: null as number | null, items: [] }
    ]
  },
  story: {
    description: '',
    risks: '',
    images: [] as string[],
    video: ''
  },
  preview: {
    isAgreedToTerms: false
  }
})

const availableCategories = [
  'Technology', 'Design', 'Film', 'Games', 'Music', 'Food', 'Art', 'Fashion'
]

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const addReward = () => {
  projectData.value.funding.rewards.push({
    title: '',
    description: '',
    amount: null,
    items: []
  })
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      projectData.value.story.images.push(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }
}

const submitProject = async () => {
  // TODO: Implement project submission
  console.log('Project data:', projectData.value)
  router.push('/dashboard')
}
</script>

<template>
  <div class="create-project">
    <div class="progress-bar">
      <div class="steps">
        <div 
          v-for="step in totalSteps" 
          :key="step"
          :class="['step', { active: step <= currentStep }]"
        >
          {{ step }}
        </div>
      </div>
    </div>

    <div class="form-container">
      <!-- Step 1: Project Basics -->
      <section v-show="currentStep === 1">
        <h2>Les bases du projet</h2>
        <div class="form-group">
          <label>Titre du projet</label>
          <input 
            type="text"
            v-model="projectData.basics.title"
            placeholder="Un titre accrocheur"
          >
        </div>
        <div class="form-group">
          <label>Catégorie</label>
          <select v-model="projectData.basics.category">
            <option value="">Sélectionnez une catégorie</option>
            <option v-for="category in availableCategories" :key="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Description courte</label>
          <textarea 
            v-model="projectData.basics.shortDescription"
            placeholder="Résumez votre projet en quelques phrases"
          ></textarea>
        </div>
      </section>

      <!-- Step 2: Funding -->
      <section v-show="currentStep === 2">
        <h2>Objectifs de financement</h2>
        <div class="form-group">
          <label>Objectif (€)</label>
          <input 
            type="number"
            v-model="projectData.funding.goal"
            placeholder="10000"
          >
        </div>
        <div class="form-group">
          <label>Durée de la campagne (jours)</label>
          <input 
            type="number"
            v-model="projectData.funding.duration"
            min="1"
            max="60"
          >
        </div>
        <div class="rewards-section">
          <h3>Récompenses</h3>
          <div v-for="(reward, index) in projectData.funding.rewards" :key="index" class="reward-card">
            <input 
              type="text"
              v-model="reward.title"
              placeholder="Titre de la récompense"
            >
            <textarea 
              v-model="reward.description"
              placeholder="Description de la récompense"
            ></textarea>
            <input 
              type="number"
              v-model="reward.amount"
              placeholder="Montant"
            >
          </div>
          <button @click="addReward" class="btn-secondary">
            + Ajouter une récompense
          </button>
        </div>
      </section>

      <!-- Step 3: Story -->
      <section v-show="currentStep === 3">
        <h2>Histoire du projet</h2>
        <div class="form-group">
          <label>Description détaillée</label>
          <textarea 
            v-model="projectData.story.description"
            placeholder="Racontez l'histoire de votre projet"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Risques et défis</label>
          <textarea 
            v-model="projectData.story.risks"
            placeholder="Quels sont les risques et défis potentiels ?"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Images</label>
          <input 
            type="file"
            @change="handleImageUpload"
          >
          <div class="image-preview" v-if="projectData.story.images.length">
            <img 
              v-for="(image, index) in projectData.story.images" 
              :key="index" 
              :src="image" 
              alt="Project image"
            >
          </div>
        </div>
        <div class="form-group">
          <label>Vidéo</label>
          <input 
            type="text"
            v-model="projectData.story.video"
            placeholder="Lien vers la vidéo du projet"
          >
        </div>
      </section>

      <!-- Step 4: Preview -->
      <section v-show="currentStep === 4">
        <h2>Prévisualisation</h2>
        <div class="form-group">
          <label>
            <input 
              type="checkbox"
              v-model="projectData.preview.isAgreedToTerms"
            >
            J'accepte les termes et conditions
          </label>
        </div>
        <button 
          :disabled="!projectData.preview.isAgreedToTerms"
          @click="submitProject"
        >
          Soumettre le projet
        </button>
      </section>

      <div class="navigation-buttons">
        <button 
          v-if="currentStep > 1" 
          @click="prevStep"
        >
          Précédent
        </button>
        <button 
          v-if="currentStep < totalSteps" 
          @click="nextStep"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-project {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.progress-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.steps {
  display: flex;
  gap: 1rem;
}

.step {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: center;
}

.step.active {
  background-color: #3b82f6;
  color: white;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rewards-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reward-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.image-preview {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.image-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}
</style>
