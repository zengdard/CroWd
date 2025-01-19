import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './assets/main.css'
// import './utils/axios' // Commentez ou supprimez cette ligne

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

// Wait for Vue to be ready before initializing auth
nextTick(() => {
  const authStore = useAuthStore()
  authStore.init()
})