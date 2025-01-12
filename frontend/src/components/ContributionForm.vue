<script setup lang="ts">
import { ref } from 'vue';
import { useContributionStore } from '@/stores/contribution';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
  projectId: number;
}>();

const contributionStore = useContributionStore();
const authStore = useAuthStore();
const amount = ref(0);
const message = ref('');
const error = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  if (!authStore.isAuthenticated) {
    error.value = 'Please login to contribute';
    return;
  }

  if (amount.value <= 0) {
    error.value = 'Please enter a valid amount';
    return;
  }

  try {
    loading.value = true;
    await contributionStore.createContribution({
      projectId: props.projectId,
      amount: amount.value,
      message: message.value
    });
    amount.value = 0;
    message.value = '';
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="contribution-form">
    <h3>Make a Contribution</h3>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="amount">Amount ($)</label>
        <input
          id="amount"
          v-model.number="amount"
          type="number"
          min="1"
          step="1"
          required
        >
      </div>

      <div class="form-group">
        <label for="message">Message (optional)</label>
        <textarea
          id="message"
          v-model="message"
          rows="3"
        ></textarea>
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="submit-button"
      >
        {{ loading ? 'Processing...' : 'Contribute' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.contribution-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.error {
  color: #dc3545;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
