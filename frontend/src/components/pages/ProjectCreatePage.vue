<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import { uploadImage } from '@/services/upload.service';

const router = useRouter();
const projectStore = useProjectStore();

const projectData = ref({
  title: '',
  description: '',
  goal: 0,
  category: '',
  endDate: '',
  content: ''
});

const imageFile = ref<File | null>(null);
const error = ref('');
const loading = ref(false);

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.[0]) {
    imageFile.value = target.files[0];
  }
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    let imageUrl;
    
    if (imageFile.value) {
      imageUrl = await uploadImage(imageFile.value);
    }

    const project = await projectStore.createProject({
      ...projectData.value,
      imageUrl
    });

    router.push(`/projects/${project.id}`);
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="create-project">
    <h1>Create a New Project</h1>
    
    <form @submit.prevent="handleSubmit" class="project-form">
      <div class="form-group">
        <label>Title</label>
        <input v-model="projectData.title" required />
      </div>

      <div class="form-group">
        <label>Short Description</label>
        <input v-model="projectData.description" required />
      </div>

      <div class="form-group">
        <label>Detailed Description</label>
        <MarkdownEditor
          v-model="projectData.content"
          :debug="true"
          placeholder="Write your project details..."
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Goal Amount ($)</label>
          <input type="number" v-model.number="projectData.goal" required />
        </div>

        <div class="form-group">
          <label>End Date</label>
          <input type="date" v-model="projectData.endDate" required />
        </div>
      </div>

      <div class="form-group">
        <label>Project Image</label>
        <input type="file" accept="image/*" @change="handleImageUpload" />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Project' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.create-project {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
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

.error {
  color: #dc2626;
  margin-top: 1rem;
}
</style>
