<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page non trouvée</h2>
    <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
    <router-link to="/" class="btn btn-primary">Retour à l'accueil</router-link>
  </div>
</template>

<style scoped>
.not-found {
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
}

h1 {
  font-size: 6rem;
  color: var(--color-primary);
  margin: 0;
  line-height: 1;
}

h2 {
  font-size: 2rem;
  color: var(--color-heading);
  margin: 1rem 0;
}

p {
  color: var(--color-text);
  margin-bottom: 2rem;
}
</style> 