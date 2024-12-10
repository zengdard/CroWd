<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  project: any;
  reward: {
    amount: number;
    title: string;
    description: string;
  };
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', amount: number): void;
}>();

const amount = ref(props.reward.amount);

watch(() => props.reward, () => {
  amount.value = props.reward.amount;
});

const handleSubmit = () => {
  emit('submit', amount.value);
};
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h2>Soutenir ce projet</h2>
        <button class="close-button" @click="emit('close')">&times;</button>
      </div>

      <div class="modal-content">
        <div class="reward-info">
          <h3>{{ reward.title }}</h3>
          <p>{{ reward.description }}</p>
        </div>

        <div class="contribution-form">
          <div class="form-group">
            <label>Montant de votre contribution</label>
            <div class="amount-input">
              <span class="currency">€</span>
              <input
                type="number"
                v-model="amount"
                :min="reward.amount"
                step="1"
                class="form-input"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button 
          class="btn btn-secondary" 
          @click="emit('close')"
        >
          Annuler
        </button>
        <button 
          class="btn btn-primary" 
          @click="handleSubmit"
        >
          Contribuer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: var(--border-radius);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-light);
}

.modal-content {
  padding: 1.5rem;
}

.reward-info {
  margin-bottom: 1.5rem;
}

.reward-info h3 {
  font-size: 1.25rem;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.amount-input {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 1rem;
  color: var(--color-text);
}

.amount-input input {
  padding-left: 2rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style> 