<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import 'katex/dist/katex.min.css';

</script>

<template>
  <div class="min-h-screen bg-gray-50">
     <Header />

    <main>
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
<style scoped>
@import '../src/assets/main.css';

.nav-link {
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s ease-in-out;
  position: relative;
  cursor: pointer;
}

.nav-link:hover {
  color: #111827;
  background-color: #f3f4f6;
  transform: translateY(-1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-link:active {
  transform: translateY(0);
}

.nav-link.router-link-active {
  background-color: #f3f4f6;
  color: #111827;
  font-weight: 600;
}

/* Effet de focus pour l'accessibilité */
.nav-link:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Désactiver l'outline quand on utilise la souris */
.nav-link:focus:not(:focus-visible) {
  outline: none;
}
</style>