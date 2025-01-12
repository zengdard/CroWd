<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'tech', label: 'Technology' },
  { value: 'art', label: 'Art & Design' },
  { value: 'music', label: 'Music' },
  { value: 'games', label: 'Games' },
  { value: 'film', label: 'Film & Video' },
  { value: 'publishing', label: 'Publishing' },
  { value: 'food', label: 'Food & Craft' },
];

const handleChange = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="filters">
    <div class="categories">
      <button
        v-for="category in categories"
        :key="category.value"
        :class="['category-button', { active: modelValue === category.value }]"
        @click="handleChange(category.value)"
      >
        {{ category.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.filters {
  margin-bottom: 2rem;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-button {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  background: white;
  color: #4b5563;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-button:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.category-button.active {
  background: #dc2626;
  border-color: #dc2626;
  color: white;
}

@media (max-width: 640px) {
  .categories {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
  }

  .category-button {
    white-space: nowrap;
  }
}
</style>
