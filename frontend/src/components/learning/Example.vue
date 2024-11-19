<script setup lang="ts">
import { ref, computed } from 'vue'; // Ajout de l'import de computed
import katex from 'katex';

interface Example {
  id: string;
  title: string;
  description: string;
  latex: string;
  field: string;
}

// Interface pour la directive KaTeX
interface KatexBinding {
  value: string;
}

const examples: Example[] = [
  {
    id: 'calculus1',
    title: 'Derivative of exponential function',
    description: 'The derivative of e^x is one of the most fundamental examples in calculus, showing why e is such a special number.',
    latex: '\\frac{d}{dx}e^x = e^x',
    field: 'Calculus'
  },
  {
    id: 'linear1',
    title: 'Matrix multiplication',
    description: 'A common matrix multiplication example showing the process of multiplying two 2x2 matrices.',
    latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{pmatrix}',
    field: 'Linear Algebra'
  },
  {
    id: 'stats1',
    title: 'Normal distribution',
    description: 'The probability density function of the normal distribution, fundamental in statistics.',
    latex: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
    field: 'Statistics'
  },
  {
    id: 'physics1',
    title: 'Einstein field equations',
    description: 'The famous equation relating spacetime curvature to mass and energy.',
    latex: 'G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu}',
    field: 'Physics'
  }
];

const selectedField = ref<string>('all');
const fields = ['all', 'Calculus', 'Linear Algebra', 'Statistics', 'Physics'];

const filteredExamples = computed(() => {
  if (selectedField.value === 'all') return examples;
  return examples.filter(ex => ex.field === selectedField.value);
});

// Directive KaTeX avec types
const vKatexRender = {
  mounted(el: HTMLElement, binding: KatexBinding): void {
    katex.render(binding.value, el, {
      displayMode: true,
      throwOnError: false
    });
  },
  updated(el: HTMLElement, binding: KatexBinding): void {
    katex.render(binding.value, el, {
      displayMode: true,
      throwOnError: false
    });
  }
};
</script>

<template>
  <div class="examples-page">
    <h1>Mathematical Examples</h1>
    <p class="intro">
      Explore common mathematical expressions used across different fields of study.
      These examples show how LaTeX can be used to write complex mathematical notation.
    </p>

    <div class="field-filter">
      <select v-model="selectedField">
        <option v-for="field in fields" :key="field" :value="field">
          {{ field }}
        </option>
      </select>
    </div>

    <div class="examples-grid">
      <div v-for="example in filteredExamples" :key="example.id" class="example-card">
        <h3>{{ example.title }}</h3>
        <span class="field-tag">{{ example.field }}</span>
        <p>{{ example.description }}</p>
        <div class="formula" v-katex-render="example.latex"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.examples-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.intro {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.field-filter {
  margin-bottom: 2rem;
}

.field-filter select {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.example-card {
  padding: 1.5rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.example-card h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.field-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #f0f0f0;
  border-radius: 16px;
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
}

.formula {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
}
</style>