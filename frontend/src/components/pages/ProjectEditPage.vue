<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import { uploadImage } from '@/services/upload.service';
import type { Project } from '@/types';

const router = useRouter();
const route = useRoute();
const projectStore = useProjectStore();

const projectData = ref<Partial<Project>>({
  title: '',
  description: '',
  goal: 0,
  category: '',
  endDate: '',
  content: ''
});

const imageFile = ref<File | null>(null);
const error = ref('');
const loading = ref(true);
const saving = ref(false);

onMounted(async () => {
  try {
    const projectId = Number(route.params.id);
    await projectStore.fetchProject(projectId);
    if (projectStore.currentProject) {
      projectData.value = { ...projectStore.currentProject };
    } else {
      error.value = 'Project not found';
    }
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.[0]) {
    imageFile.value = target.files[0];
  }
};

const handleSubmit = async () => {
  try {
    saving.value = true;
    let imageUrl = projectData.value.imageUrl;
    
    if (imageFile.value) {
      imageUrl = await uploadImage(imageFile.value);
    }

    await projectStore.updateProject(Number(route.params.id), {
      ...projectData.value,
      imageUrl
    });

    router.push(`/projects/${route.params.id}`);
  } catch (e: any) {
    error.value = e.message;
  } finally {
    saving.value = false;
  }
};

const handleCancel = () => {
  router.back();
};
</script>

<template>
  <div class="edit-project">
    <div v-if="loading" class="loading">
      Loading project details...
    </div>

    <template v-else-if="!error">
      <div class="edit-header">
        <h1>Edit Project</h1>
        <div class="header-actions">
          <button 
            class="cancel-button" 
            @click="handleCancel"
            :disabled="saving"
          >
            Cancel
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="project-form">
        <div class="form-group">
          <label>Title</label>
          <input 
            v-model="projectData.title" 
            required
            :disabled="saving"
          />
        </div>

        <div class="form-group">
          <label>Short Description</label>
          <input 
            v-model="projectData.description"
            required
            :disabled="saving"
          />
        </div>

        <div class="form-group">
          <label>Detailed Description</label>
          <MarkdownEditor
            v-model="projectData.content"
            :debug="true"
            placeholder="Write your project details..."
            :disabled="saving"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Goal Amount ($)</label>
            <input 
              type="number"
              v-model.number="projectData.goal"
              required
              :disabled="saving"
            />
          </div>

          <div class="form-group">
            <label>End Date</label>
            <input 
              type="date"
              v-model="projectData.endDate"
              required
              :disabled="saving"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Project Image</label>
          <div class="image-preview">
            <img 
              v-if="projectData.imageUrl" 
              :src="projectData.imageUrl" 
              alt="Project preview"
            />
          </div>
          <input 
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            :disabled="saving"
          />
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <button 
          type="submit"
          class="save-button"
          :disabled="saving"
        >
          {{ saving ? 'Saving changes...' : 'Save changes' }}
        </button>
      </form>
    </template>

    <div v-else class="error-container">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.edit-project {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.project-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  font-weight: 500;
  color: #374151;
}

input {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.error {
  color: #dc2626;
  padding: 0.75rem;
  background: #fee2e2;
  border-radius: 0.5rem;
}

.image-preview {
  max-width: 300px;
  margin: 0.5rem 0;
}

.image-preview img {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

.save-button {
  padding: 0.75rem 1.5rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-button:hover:not(:disabled) {
  background: #b91c1c;
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  background: #e5e7eb;
  color: #374151;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover:not(:disabled) {
  background: #d1d5db;
}

.loading, .error-container {
  text-align: center;
  padding: 2rem;
  color: #374151;
}
</style>
