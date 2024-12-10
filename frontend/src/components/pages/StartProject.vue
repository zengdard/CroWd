<template>
  <div class="start-project">
    <div class="container">
      <h1>Lancez votre projet</h1>
      
      <form @submit.prevent="submitProject" class="project-form">
        <div class="form-group">
          <label class="form-label">Titre du projet</label>
          <input 
            v-model="project.title" 
            type="text" 
            class="form-input"
            required
          >
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea 
            v-model="project.description" 
            class="form-input"
            rows="6"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Objectif de financement (€)</label>
          <input 
            v-model.number="project.goal_amount" 
            type="number" 
            class="form-input"
            min="1"
            required
          >
        </div>

        <div class="rewards">
          <h2>Récompenses</h2>
          <div v-for="(reward, index) in project.rewards" :key="index" class="reward-item">
            <div class="form-group">
              <label class="form-label">Description de la récompense</label>
              <input 
                v-model="reward.description" 
                type="text" 
                class="form-input"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-label">Montant minimum (€)</label>
              <input 
                v-model.number="reward.amount_required" 
                type="number" 
                class="form-input"
                min="1"
                required
              >
            </div>
            <button 
              type="button" 
              class="btn btn-danger"
              @click="removeReward(index)"
            >
              Supprimer
            </button>
          </div>
          <button 
            type="button" 
            class="btn btn-secondary"
            @click="addReward"
          >
            Ajouter une récompense
          </button>
        </div>

        <button type="submit" class="btn btn-primary">
          Créer le projet
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

interface Reward {
  description: string;
  amount_required: number;
}

interface Project {
  title: string;
  description: string;
  goal_amount: number;
  rewards: Reward[];
}

export default defineComponent({
  name: 'StartProject',
  
  setup() {
    const router = useRouter();
    
    const project = reactive<Project>({
      title: '',
      description: '',
      goal_amount: 0,
      rewards: [{ description: '', amount_required: 0 }]
    });

    const addReward = () => {
      project.rewards.push({ description: '', amount_required: 0 });
    };

    const removeReward = (index: number) => {
      project.rewards.splice(index, 1);
    };

    const submitProject = async () => {
      try {
        const response = await axios.post('/api/projects', project);
        router.push(`/project/${response.data.id}`);
      } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
      }
    };

    return {
      project,
      addReward,
      removeReward,
      submitProject
    };
  }
});
</script>

<style scoped>
.start-project {
  padding: 2rem 0;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-heading);
  margin-bottom: 2rem;
}

.project-form {
  max-width: 800px;
  margin: 0 auto;
}

.rewards {
  margin: 2rem 0;
  padding: 2rem;
  background: var(--color-background-soft);
  border-radius: var(--border-radius);
}

h2 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 1.5rem;
}

.reward-item {
  padding: 1.5rem;
  background: var(--color-background);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
}

.btn {
  margin-top: 1rem;
}

.btn-danger {
  background: var(--color-danger);
  color: white;
}

.btn-danger:hover {
  background: var(--color-danger-hover);
}
</style>