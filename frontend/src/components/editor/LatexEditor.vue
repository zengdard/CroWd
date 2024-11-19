<template>
  <div class="latex-editor">
    <div class="grid grid-cols-2 gap-4">
      <!-- Éditeur -->
      <div class="editor-panel">
        <div class="mb-4">
          <h2 class="text-xl font-bold mb-2">LaTeX Editor</h2>
          <textarea
            v-model="latexInput"
            class="w-full h-64 p-4 border rounded-lg font-mono"
            placeholder="Enter your LaTeX expression here..."
          ></textarea>
        </div>
        <div class="toolbar flex gap-2">
          <button
            v-for="template in commonTemplates"
            :key="template.symbol"
            @click="insertTemplate(template.symbol)"
            class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {{ template.label }}
          </button>
        </div>
      </div>

      <!-- Prévisualisation -->
      <div class="preview-panel">
        <h2 class="text-xl font-bold mb-2">Preview</h2>
        <div 
          class="preview-content p-4 border rounded-lg min-h-[16rem] flex items-center justify-center"
        >
          <vue-katex
            :expression="latexInput || ''"
            :display-mode="true"
            :throw-on-error="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import '@hsorby/vue3-katex/dist/vue3-katex.css';

interface LatexTemplate {
  label: string;
  symbol: string;
}

const latexInput = ref('');

const commonTemplates: LatexTemplate[] = [
  { label: 'Fraction', symbol: '\\frac{}{}'  },
  { label: 'Square Root', symbol: '\\sqrt{}' },
  { label: 'Integral', symbol: '\\int_{a}^{b}' },
  { label: 'Sum', symbol: '\\sum_{i=1}^{n}' },
];

const insertTemplate = (template: string) => {
  latexInput.value += template;
};
</script>

<style scoped>
.latex-editor {
  @apply max-w-6xl mx-auto p-6;
}

.preview-content {
  background-color: white;
}
</style>