<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const router = useRouter()
const authStore = useAuthStore()

const formData = ref<RegisterFormData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const error = ref('')
const loading = ref(false)

const isValidForm = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email) && 
         formData.value.password.length >= 6 &&
         formData.value.name.length >= 2 &&
         formData.value.password === formData.value.confirmPassword
})

const handleSubmit = async () => {
  if (!isValidForm.value) {
    error.value = 'Please check your inputs'
    return
  }

  try {
    loading.value = true
    error.value = ''
    
    // Supposons que nous ayons une méthode register dans le store
    await authStore.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    })
    
    router.push('/editor')
  } catch (e: any) {
    error.value = e.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-2">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              v-model="formData.name"
              id="name"
              name="name"
              type="text"
              required
              :disabled="loading"
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Full name"
            >
          </div>
          
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
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              required
              :disabled="loading"
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            >
          </div>
          
          <div>
            <label for="confirm-password" class="sr-only">Confirm password</label>
            <input
              v-model="formData.confirmPassword"
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              :disabled="loading"
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm password"
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
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <span 
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" 
                aria-hidden="true"
              >
                {{ loading ? '⌛' : '📝' }}
              </span>
            </span>
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>

        <div class="text-sm text-center">
          <router-link 
            to="/login" 
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
/* Reset et styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  color: #1f2937;
}

/* Container principal */
.min-h {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
}

/* Formulaire container */
.max-w-md {
  max-width: 28rem;
  width: 100%;
  margin: 0 auto;
}

.space-y-8 > * + * {
  margin-top: 2rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

/* Titre */
h2 {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 800;
  color: #111827;
}

/* Formulaire */
form {
  margin-top: 2rem;
}

/* Groupe d'inputs */
.rounded-md {
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Labels cachés */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Inputs */
input {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #111827;
  font-size: 0.875rem;
  transition: all 0.2s;
}

input::placeholder {
  color: #9ca3af;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  z-index: 10;
}

input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

/* Message d'erreur */
[role="alert"] {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: #fef2f2;
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
}

/* Bouton de soumission */
button[type="submit"] {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-top: 1.5rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #4f46e5;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #4338ca;
}

button[type="submit"]:focus {
  outline: none;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #4f46e5;
}

button[type="submit"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Icône dans le bouton */
button[type="submit"] span.absolute {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
}

/* Lien de connection */
.text-sm {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
}

a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

a:hover {
  color: #4338ca;
}

/* Responsive design */
@media (min-width: 640px) {
  .min-h {
    padding: 3rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .min-h{
    padding: 3rem 2rem;
  }
}

@media (max-width: 639px) {
  h2 {
    font-size: 1.5rem;
  }
  
  input, button[type="submit"] {
    font-size: 1rem;
  }
}
</style>