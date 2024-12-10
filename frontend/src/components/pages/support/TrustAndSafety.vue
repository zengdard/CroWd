<template>
  <div class="trust-safety">
    <div class="container">
      <h1>Confiance & Sécurité</h1>

      <div class="content-grid">
        <div class="info-card">
          <h2>Protection des données</h2>
          <p>Nous utilisons les dernières technologies de cryptage pour protéger vos données personnelles et vos transactions.</p>
        </div>

        <div class="info-card">
          <h2>Paiements sécurisés</h2>
          <p>Tous les paiements sont traités via des plateformes sécurisées et certifiées.</p>
        </div>

        <div class="info-card">
          <h2>Vérification des projets</h2>
          <p>Chaque projet est vérifié pour s'assurer qu'il respecte nos directives de communauté.</p>
        </div>

        <div class="info-card">
          <h2>Protection des contributeurs</h2>
          <p>Nous surveillons activement les projets pour prévenir la fraude et protéger les contributeurs.</p>
        </div>
      </div>

      <div class="guidelines">
        <h2>Nos engagements</h2>
        <ul>
          <li>Transparence totale sur l'utilisation des fonds</li>
          <li>Vérification d'identité pour tous les créateurs</li>
          <li>Suivi régulier des projets</li>
          <li>Protection contre la fraude</li>
          <li>Confidentialité des données personnelles</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trust-safety {
  padding: 3rem 0;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 3rem;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-card {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: var(--border-radius);
  text-align: center;
}

.info-card h2 {
  color: var(--color-heading);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.info-card p {
  color: var(--color-text);
  line-height: 1.6;
}

.guidelines {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--color-background-soft);
  border-radius: var(--border-radius);
}

.guidelines h2 {
  color: var(--color-heading);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.guidelines ul {
  list-style: none;
  padding: 0;
}

.guidelines li {
  color: var(--color-text);
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-background-muted);
}

.guidelines li:last-child {
  border-bottom: none;
}
</style> 