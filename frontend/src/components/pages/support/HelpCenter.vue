<template>
  <div class="help-center">
    <div class="container">
      <h1>Centre d'aide</h1>
      
      <div class="search-section">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Rechercher dans l'aide..."
          class="form-input"
        >
      </div>

      <div class="faq-sections">
        <div class="faq-section">
          <h2>Pour les créateurs</h2>
          <ul>
            <li><a href="#create">Comment créer un projet ?</a></li>
            <li><a href="#fees">Quels sont les frais ?</a></li>
            <li><a href="#rules">Règles de financement</a></li>
            <li><a href="#promotion">Promouvoir votre projet</a></li>
          </ul>
        </div>

        <div class="faq-section">
          <h2>Pour les contributeurs</h2>
          <ul>
            <li><a href="#backing">Comment soutenir un projet ?</a></li>
            <li><a href="#payments">Paiements sécurisés</a></li>
            <li><a href="#rewards">Récompenses</a></li>
            <li><a href="#refunds">Politique de remboursement</a></li>
          </ul>
        </div>

        <div class="faq-section">
          <h2>Questions fréquentes</h2>
          <ul>
            <li><a href="#account">Gestion du compte</a></li>
            <li><a href="#security">Sécurité</a></li>
            <li><a href="#communication">Communication</a></li>
            <li><a href="#technical">Support technique</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HelpCenter',
  
  setup() {
    const searchQuery = ref('');
    
    return {
      searchQuery
    };
  }
});
</script>

<style scoped>
.help-center {
  padding: 3rem 0;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 2rem;
}

.search-section {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.faq-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.faq-section {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: var(--border-radius);
}

.faq-section h2 {
  color: var(--color-heading);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.faq-section ul {
  list-style: none;
  padding: 0;
}

.faq-section li {
  margin-bottom: 0.5rem;
}

.faq-section a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s;
}

.faq-section a:hover {
  color: var(--color-primary);
}
</style> 