<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

interface FormData {
  email: string
  password: string
}

const router = useRouter()
const authStore = useAuthStore()

const formData = ref<FormData>({
  email: '',
  password: ''
})
const error = ref('')
const loading = ref(false)

// Validation basique
const isValidForm = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email) && formData.value.password.length >= 6
})

const handleSubmit = async () => {
  if (!isValidForm.value) {
    error.value = 'Please check your inputs'
    return
  }

  try {
    loading.value = true
    error.value = ''
    
    await authStore.login({
      email: formData.value.email,
      password: formData.value.password
    })
    
    // La redirection est déjà gérée dans le store
  } catch (e: any) {
    error.value = e.message || 'Authentication failed. Please try again.'
  } finally {
    loading.value = false
  }
}

// Reset form on unmount
onUnmounted(() => {
  formData.value = { email: '', password: '' }
  error.value = ''
})
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="formData.email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              :disabled="loading"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="formData.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :disabled="loading"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            >
          </div>
        </div>

        <div v-if="error" role="alert" class="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading || !isValidForm"
            class="small"    >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <span 
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" 
                aria-hidden="true"
              >
                {{ loading ? '⌛' : '🔒' }}
              </span>
            </span>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>

        <div class="text-sm text-center">
          <router-link 
            to="/register" 
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Need an account? Sign up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
/* Reset et variables */
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --error-color: #dc2626;
  --error-bg: #fef2f2;
  --border-color: #e2e8f0;
  --text-color: #1f2937;
  --bg-color: #f8fafc;
  --input-bg: #ffffff;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.5;
}

/* Container */
.min-h {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.max-w-md {
  width: 100%;
  max-width: 28rem;
  background: var(--input-bg);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

@media (max-width: 640px) {
  .max-w-md {
    padding: 1.5rem;
  }
}

/* Espacement */
.space-y-8 > * + * {
  margin-top: 2rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

/* Titre */
.text-center {
  text-align: center;
}

.text-3xl {
  font-size: clamp(1.5rem, 5vw, 1.875rem);
  line-height: 1.2;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

/* Form Container */
.form-container {
  margin-top: 2rem;
}

/* Inputs */
.input-group {
  position: relative;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--input-bg);
  border: 2px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: var(--transition);
  appearance: none;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

input::placeholder {
  color: #94a3b8;
}

input:disabled {
  background-color: #f1f5f9;
  cursor: not-allowed;
}

/* Message d'erreur */
[role="alert"] {
  background-color: var(--error-bg);
  color: var(--error-color);
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin: 1rem 0;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Boutons */
button {
  position: relative;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

button:hover:not(:disabled) {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Icônes dans les boutons */
button span {
  display: flex;
  align-items: center;
  font-size: 1.1em;
}

/* Liens */
.text-sm {
  font-size: 0.875rem;
  margin-top: 1.5rem;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease;
}

/* Media Queries */
@media (max-width: 480px) {
  input, button {
    padding: 0.625rem 1rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
}

@media (min-width: 768px) {
  .max-w-md {
    transform: scale(1);
  }
  
  .max-w-md:hover {
    transform: scale(1.01);
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0f172a;
    --input-bg: #1e293b;
    --text-color: #f1f5f9;
    --border-color: #334155;
  }
}
</style>