<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

interface FormData {
 email: string
 password: string
 confirmPassword: string
 username: string
}

const router = useRouter()
const authStore = useAuthStore()

const formData = ref<FormData>({
 email: '',
 password: '',
 confirmPassword: '',
 username: ''
})

const error = ref('')
const loading = ref(false)

const isValidForm = computed(() => {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 return emailRegex.test(formData.value.email) && 
        formData.value.password.length >= 6 &&
        formData.value.password === formData.value.confirmPassword &&
        formData.value.username.length >= 3
})

const handleSubmit = async () => {
 if (!isValidForm.value) {
   error.value = 'Please check your inputs'
   return
 }

 try {
   loading.value = true
   error.value = ''
   
   await authStore.register({
     email: formData.value.email,
     password: formData.value.password,
     username: formData.value.username
   })
   
 } catch (e: any) {
   error.value = e.message || 'Registration failed. Please try again.'
 } finally {
   loading.value = false
 }
}

onUnmounted(() => {
 formData.value = {
   email: '',
   password: '',
   confirmPassword: '',
   username: ''
 }
 error.value = ''
})
</script>

<template>
 <div class="register-container">
   <div class="register-box">
     <div class="register-header">
       <div class="logo">
         <span class="crab-icon">🦀</span>
         <span class="brand">CrabFunding</span>
       </div>
       <h2>Create your account</h2>
     </div>
     
     <form class="register-form" @submit.prevent="handleSubmit">
       <div class="form-inputs">
         <div class="input-group">
           <label for="username">Username</label>
           <input
             v-model="formData.username"
             id="username"
             type="text"
             autocomplete="username"
             required
             :disabled="loading"
             placeholder="Choose a username"
           >
         </div>

         <div class="input-group">
           <label for="email-address">Email</label>
           <input
             v-model="formData.email"
             id="email-address"
             type="email"
             autocomplete="email"
             required
             :disabled="loading"
             placeholder="Enter your email"
           >
         </div>

         <div class="input-group">
           <label for="password">Password</label>
           <input
             v-model="formData.password"
             id="password"
             type="password"
             autocomplete="new-password"
             required
             :disabled="loading"
             placeholder="Create a password"
           >
         </div>

         <div class="input-group">
           <label for="confirm-password">Confirm Password</label>
           <input
             v-model="formData.confirmPassword"
             id="confirm-password"
             type="password"
             autocomplete="new-password"
             required
             :disabled="loading"
             placeholder="Confirm your password"
           >
         </div>
       </div>

       <div v-if="error" class="error-message">
         {{ error }}
       </div>

       <button
         type="submit"
         :disabled="loading || !isValidForm"
         class="register-button"
       >
         <span class="button-icon">{{ loading ? '⌛' : '🔒' }}</span>
         <span class="button-text">{{ loading ? 'Creating account...' : 'Create account' }}</span>
       </button>

       <div class="login-link">
         <router-link to="/login">
           Already have an account? Sign in
         </router-link>
       </div>
     </form>
   </div>
 </div>
</template>

<style scoped>
.register-container {
 min-height: 100vh;
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 1.5rem;
 background: linear-gradient(135deg, #f6f8fd 0%, #ffffff 100%);
}

.register-box {
 width: 100%;
 max-width: 32rem;
 background: white;
 padding: 2.5rem 2rem;
 border-radius: 1rem;
 box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
 transition: transform 0.3s ease;
}

.register-box:hover {
 transform: translateY(-5px);
}

.register-header {
 text-align: center;
 margin-bottom: 2rem;
}

.logo {
 display: flex;
 align-items: center;
 justify-content: center;
 margin-bottom: 1.5rem;
}

.crab-icon {
 font-size: 2rem;
 margin-right: 0.5rem;
}

.brand {
 font-size: 1.5rem;
 font-weight: 700;
 color: #dc2626;
}

h2 {
 font-size: 1.5rem;
 color: #1f2937;
 font-weight: 700;
}

.register-form {
 display: flex;
 flex-direction: column;
 gap: 1.5rem;
}

.form-inputs {
 display: flex;
 flex-direction: column;
 gap: 1rem;
}

.input-group {
 display: flex;
 flex-direction: column;
 gap: 0.5rem;
}

.input-group label {
 font-size: 0.875rem;
 font-weight: 500;
 color: #4b5563;
}

input {
 width: 100%;
 padding: 0.75rem 1rem;
 border: 2px solid #e5e7eb;
 border-radius: 0.5rem;
 font-size: 1rem;
 transition: all 0.3s ease;
}

input:focus {
 outline: none;
 border-color: #dc2626;
 box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.error-message {
 padding: 0.75rem;
 background: #fef2f2;
 color: #dc2626;
 border-radius: 0.5rem;
 font-size: 0.875rem;
 animation: fadeIn 0.3s ease;
}

.register-button {
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 0.5rem;
 width: 100%;
 padding: 0.875rem;
 background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
 color: white;
 border: none;
 border-radius: 0.5rem;
 font-size: 1rem;
 font-weight: 500;
 cursor: pointer;
 transition: all 0.3s ease;
}

.register-button:not(:disabled):hover {
 transform: translateY(-2px);
 box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);
}

.register-button:disabled {
 opacity: 0.7;
 cursor: not-allowed;
}

.button-icon {
 font-size: 1.25rem;
}

.login-link {
 text-align: center;
 font-size: 0.875rem;
}

.login-link a {
 color: #dc2626;
 text-decoration: none;
 font-weight: 500;
 transition: color 0.2s ease;
}

.login-link a:hover {
 color: #b91c1c;
 text-decoration: underline;
}

@keyframes fadeIn {
 from {
   opacity: 0;
   transform: translateY(-10px);
 }
 to {
   opacity: 1;
   transform: translateY(0);
 }
}

@media (max-width: 640px) {
 .register-box {
   padding: 2rem 1.5rem;
 }
 
 h2 {
   font-size: 1.25rem;
 }
}
</style>