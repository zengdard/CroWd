<template>
  <div class="converter-container">
    <div class="content-wrapper">
      <!-- En-tête -->
      <div class="header-section">
        <h1>Image to LaTeX Converter</h1>
        <p class="subtitle">Transform mathematical equations from images into LaTeX code</p>
      </div>

      <!-- Zone de dépôt -->
      <div 
        class="drop-zone"
        @dragover.prevent
        @drop.prevent="handleDrop"
        :class="{ 'drag-over': isDragging }"
        @dragenter.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
      >
        <div class="drop-zone-content">
          <i class="fas fa-cloud-upload-alt upload-icon"></i>
          <p>Drag and drop your image here or</p>
          <label class="upload-button">
    Browse Files
    <input 
      type="file" 
      accept="image/*" 
      @change="(e: Event) => handleImageUpload(e as Event)"
      ref="fileInput"
      class="hidden"
    >
  </label>
          <p class="file-info">Supported formats: PNG, JPG, JPEG</p>
        </div>
      </div>

      <!-- Prévisualisation -->
      <div v-if="previewImage" class="preview-section">
        <div class="preview-header">
          <h3>Preview</h3>
          <button @click="clearImage" class="clear-button">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <img :src="previewImage" class="preview-image" alt="Preview" />
      </div>

      <!-- Chargement -->
      <div v-if="isProcessing" class="processing-section">
        <div class="spinner"></div>
        <p>Converting your image to LaTeX...</p>
      </div>

      <!-- Résultat -->
      <div v-if="latexResult" class="result-section">
        <div class="result-header">
          <h3>LaTeX Code</h3>
          <div class="action-buttons">
            <button @click="copyToClipboard" class="icon-button" :title="copyStatus">
              <i class="fas fa-copy"></i>
            </button>
            <button @click="copyToEditor" class="editor-button">
              Open in Editor
              <i class="fas fa-external-link-alt"></i>
            </button>
          </div>
        </div>
        <div class="latex-code">
          <code>{{ latexResult }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';


interface FileEvent extends Event {
  target: HTMLInputElement;
  dataTransfer?: DataTransfer;
}


const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);
const previewImage = ref<string>('');
const latexResult = ref<string>('');
const isProcessing = ref<boolean>(false);
const isDragging = ref<boolean>(false);
const copyStatus = ref<string>('Copy to clipboard');

const handleDrop = (event: DragEvent): void => {
  isDragging.value = false;
  const file = event.dataTransfer?.files[0];
  if (file && file.type.startsWith('image/')) {
    handleFile(file);
  }
};
const handleImageUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) handleFile(file);
};

const handleFile = async (file: File): Promise<void> => {
  previewImage.value = URL.createObjectURL(file);
  isProcessing.value = true;

  try {
    await processImage(file);
  } catch (error) {
    console.error('Error processing image:', error);
  } finally {
    isProcessing.value = false;
  }
};

const processImage = async (file: File): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  latexResult.value = "\\frac{1}{2}\\pi r^2";
};

const copyToEditor = () => {
  router.push({
    path: '/editor',
    query: { latex: latexResult.value }
  });
};

const clearImage = () => {
  previewImage.value = '';
  latexResult.value = '';
  if (fileInput.value) fileInput.value.value = '';
};

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(latexResult.value);
  copyStatus.value = 'Copied!';
  setTimeout(() => {
    copyStatus.value = 'Copy to clipboard';
  }, 2000);
};
</script>

<style scoped>
.converter-container {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 2rem;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.header-section h1 {
  color: #1a202c;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #4a5568;
  font-size: 1.1rem;
}

.drop-zone {
  border: 2px dashed #cbd5e0;
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: white;
  cursor: pointer;
}

.drop-zone:hover {
  border-color: #4299e1;
}

.drag-over {
  border-color: #4299e1;
  background-color: #ebf8ff;
}

.upload-icon {
  font-size: 3rem;
  color: #4299e1;
  margin-bottom: 1rem;
}

.upload-button {
  display: inline-block;
  background-color: #4299e1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 1rem 0;
}

.upload-button:hover {
  background-color: #3182ce;
}

.file-info {
  color: #718096;
  font-size: 0.9rem;
}

.preview-section {
  margin-top: 2rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.clear-button {
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 0.5rem;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 0.5rem;
}

.processing-section {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  margin-top: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4299e1;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.result-section {
  margin-top: 2rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.icon-button {
  background: none;
  border: none;
  color: #4299e1;
  cursor: pointer;
  padding: 0.5rem;
}

.editor-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4299e1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.editor-button:hover {
  background-color: #3182ce;
}

.latex-code {
  background-color: #f7fafc;
  padding: 1.5rem;
  border-radius: 0.5rem;
  font-family: 'Monaco', 'Courier New', monospace;
  overflow-x: auto;
}

.hidden {
  display: none;
}
</style>