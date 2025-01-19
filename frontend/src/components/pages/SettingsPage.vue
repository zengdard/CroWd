<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const formData = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
  notifications: {
    email: true,
    push: true
  },
  language: 'fr',
  theme: 'dark'
})

const updateSettings = async () => {
  // TODO: Implement settings update logic
  console.log('Settings updated:', formData.value)
}
</script>

<template>
  <div class="settings-container">
    <h1>Paramètres du compte</h1>
    
    <form @submit.prevent="updateSettings" class="settings-form">
      <section class="settings-section">
        <h2>Profil</h2>
        <div class="form-group">
          <label for="name">Nom</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name"
          >
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
          >
        </div>
      </section>

      <section class="settings-section">
        <h2>Notifications</h2>
        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="formData.notifications.email"
            >
            Notifications par email
          </label>
        </div>
        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="formData.notifications.push"
            >
            Notifications push
          </label>
        </div>
      </section>

      <section class="settings-section">
        <h2>Préférences</h2>
        <div class="form-group">
          <label for="language">Langue</label>
          <select id="language" v-model="formData.language">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
        <div class="form-group">
          <label for="theme">Thème</label>
          <select id="theme" v-model="formData.theme">
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </div>
      </section>

      <button type="submit" class="btn-save">Enregistrer les modifications</button>
    </form>
  </div>
</template>

<style scoped>
.settings-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.settings-form {
  margin-top: 2rem;
}

.settings-section {
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.settings-section h2 {
  color: #ef4444;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #9ca3af;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  background: #111827;
  color: #fff;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
}

.btn-save {
  background: #ef4444;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  margin-top: 1rem;
}

.btn-save:hover {
  background: #dc2626;
}
</style>
