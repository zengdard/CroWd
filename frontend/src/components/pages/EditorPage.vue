<template>
  <div class="latex-editor">
    <div class="editor-container">
      <!-- Éditeur -->
      <div class="editor-panel">
        <div class="editor-input">
          <h2>LaTeX Editor</h2>
          <textarea
            v-model="latexInput"
            placeholder="Enter your LaTeX expression here..."
            @input="updatePreview"
          ></textarea>
        </div>
        
        <div class="toolbar-container">
          <div class="toolbar-section" v-for="(section, index) in toolbarSections" :key="index">
            <h4 class="section-title">{{ section.title }}</h4>
            <div class="toolbar-buttons">
              <button
                v-for="template in section.templates"
                :key="template.symbol"
                @click="insertTemplate(template.symbol)"
                class="template-button"
                :title="template.description"
              >
                <div v-html="renderLatex(template.symbol)"></div>
                <span class="tooltip">{{ template.description }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Dans la section export-options -->
<div class="export-section">
  <h3>Export Options</h3>
  <div class="export-options">
    <div class="format-selector">
      <label>Format:</label>
      <select v-model="exportFormat">
        <option value="png">PNG Image</option>
        <option value="svg">SVG Vector</option>
        <option value="latex">LaTeX Code</option>
      </select>
    </div>
    
    <!-- Nouvelles options de personnalisation -->
    <div class="customization-options">
      <div class="color-picker">
        <label>Formula Color:</label>
        <input type="color" v-model="formulaColor">
      </div>
      <div class="color-picker">
        <label>Background Color:</label>
        <input type="color" v-model="backgroundColor">
      </div>
    </div>
    
    <button class="export-button" @click="handleExport">
      <span class="icon">⬇️</span>
      Export Formula
    </button>
  </div>
</div>

    
    
     <!-- Prévisualisation -->
    <div class="preview-panel">
      <h2>Preview</h2>
      <div ref="previewContainer" class="preview-content">
        <div ref="previewBox" v-html="renderedLatex"></div>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted,computed } from 'vue';
import katex from 'katex';
import html2canvas from 'html2canvas';

// Nouvelles références
const formulaColor = ref('#000000');
const backgroundColor = ref('#FFFFFF');

// Modifier le computed renderedLatex pour inclure les couleurs
const renderedLatex = computed(() => {
  try {
    if (!latexInput.value) {
      return katex.renderToString('\\text{Preview will appear here...}', {
        displayMode: true,
        throwOnError: false
      });
    }
    // Ajouter la couleur à la formule
    const coloredLatex = `{\\color{${formulaColor.value}} ${latexInput.value}}`;
    return katex.renderToString(coloredLatex, {
      displayMode: true,
      throwOnError: false
    });
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    return 'Error rendering LaTeX';
  }
});

// Modifier la fonction handleExport
const handleExport = async () => {
  if (!previewContainer.value) return;

  try {
    if (exportFormat.value === 'latex') {
      const blob = new Blob([latexInput.value], { type: 'text/plain' });
      downloadFile(blob, 'formula.tex');
    } else if (exportFormat.value === 'png') {
      // Appliquer la couleur d'arrière-plan avant l'export
      previewContainer.value.style.backgroundColor = backgroundColor.value;
      
      const canvas = await html2canvas(previewContainer.value, {
        backgroundColor: backgroundColor.value
      });
      canvas.toBlob((blob) => {
        if (blob) downloadFile(blob, 'formula.png');
      });
    } else if (exportFormat.value === 'svg') {
      const svgData = new XMLSerializer().serializeToString(previewContainer.value);
      // Ajouter la couleur d'arrière-plan au SVG
      const svgWithBg = svgData.replace('<svg', `<svg style="background-color: ${backgroundColor.value}"`);
      const blob = new Blob([svgWithBg], { type: 'image/svg+xml' });
      downloadFile(blob, 'formula.svg');
    }
  } catch (error) {
    console.error('Export failed:', error);
  }
};

const toolbarSections = [
  {
    title: "Basic Math",
    templates: [
      { symbol: '\\frac{a}{b}', description: 'Fraction' },
      { symbol: '\\sqrt{x}', description: 'Square Root' },
      { symbol: '\\sqrt[n]{x}', description: 'Nth Root' },
      { symbol: 'x^2', description: 'Power' },
      { symbol: 'x_i', description: 'Subscript' },
    ]
  },
  {
    title: "Calculus",
    templates: [
      { symbol: '\\sum_{i=1}^n', description: 'Summation' },
      { symbol: '\\int_{a}^b', description: 'Integral' },
      { symbol: '\\frac{d}{dx}', description: 'Derivative' },
      { symbol: '\\lim_{x \\to \\infty}', description: 'Limit' },
      { symbol: '\\partial', description: 'Partial Derivative' },
    ]
  },
  {
    title: "Greek Letters",
    templates: [
      { symbol: '\\alpha', description: 'Alpha' },
      { symbol: '\\beta', description: 'Beta' },
      { symbol: '\\gamma', description: 'Gamma' },
      { symbol: '\\pi', description: 'Pi' },
      { symbol: '\\sigma', description: 'Sigma' },
    ]
  },
  {
    title: "Operators",
    templates: [
      { symbol: '\\pm', description: 'Plus-Minus' },
      { symbol: '\\times', description: 'Multiplication' },
      { symbol: '\\div', description: 'Division' },
      { symbol: '\\neq', description: 'Not Equal' },
      { symbol: '\\approx', description: 'Approximately' },
    ]
  },
  {
    title: "Matrices",
    templates: [
      { 
        symbol: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
        description: '2x2 Matrix'
      },
      { 
        symbol: '\\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}',
        description: 'Column Vector'
      },
      { 
        symbol: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}',
        description: 'Determinant'
      },
    ]
  }
];

const renderLatex = (latex: string) => {
  try {
    return katex.renderToString(latex, {
      displayMode: false,
      throwOnError: false
    });
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    return latex;
  }
};


const emit = defineEmits(['insert']);

const latexInput = ref('');
const exportFormat = ref('png');
const previewContainer = ref<HTMLElement | null>(null);

const commonTemplates = [
  { symbol: '\\frac{a}{b}', label: 'Fraction' },
  { symbol: '\\sqrt{x}', label: 'Square Root' },
  { symbol: '\\sum_{i=1}^n', label: 'Sum' },
  { symbol: '\\int_{a}^b', label: 'Integral' },
  { symbol: '\\lim_{x \\to \\infty}', label: 'Limit' },
];

const updatePreview = () => {
  // La mise à jour est automatique grâce à la directive v-katex-render
};



const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const insertTemplate = (template: string) => {
  latexInput.value += template;
  emit('insert', template);
  updatePreview();
};
</script>

<style>
.latex-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.editor-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.editor-panel, .preview-panel {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

textarea {
  width: 100%;
  height: 200px;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.3s ease;
}

textarea:focus {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  outline: none;
}

.preview-content {
  min-height: 200px;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  overflow-x: auto;
}

.preview-content .katex-display {
  margin: 0;
  padding: 10px;
}

.preview-content:empty::before {
  content: 'Type some LaTeX to see preview';
  color: #a0aec0;
}


.preview-content {
  min-height: 200px;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.template-button {
  padding: 0.5rem 1rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.template-button:hover {
  background: #3182ce;
  transform: translateY(-1px);
}

.export-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.export-button:hover {
  background: #38a169;
  transform: translateY(-1px);
}

.format-selector select {
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  min-width: 150px;
}

/* Styles responsifs */
@media (max-width: 768px) {
  .editor-container {
    grid-template-columns: 1fr;
  }
  
  .latex-editor {
    padding: 1rem;
  }
}
</style>