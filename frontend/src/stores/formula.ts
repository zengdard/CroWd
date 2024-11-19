import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

interface Formula {
  id: string;
  title: string;
  latex: string;
  description?: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
}

export const useFormulaStore = defineStore('formula', () => {
  const formulas = ref<Formula[]>([]);
  const currentFormula = ref<Formula | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchFormulas = async () => {
    try {
      loading.value = true;
      const { data } = await axios.get('/api/formulas');
      formulas.value = data.formulas;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createFormula = async (formula: Partial<Formula>) => {
    try {
      loading.value = true;
      const { data } = await axios.post('/api/formulas', formula);
      formulas.value.unshift(data);
      return data;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateFormula = async (id: string, updates: Partial<Formula>) => {
    try {
      loading.value = true;
      const { data } = await axios.put(`/api/formulas/${id}`, updates);
      const index = formulas.value.findIndex(f => f.id === id);
      if (index !== -1) {
        formulas.value[index] = data;
      }
      return data;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    formulas,
    currentFormula,
    loading,
    error,
    fetchFormulas,
    createFormula,
    updateFormula
  };
});