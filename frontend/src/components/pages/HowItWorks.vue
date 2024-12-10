<template>
  <div class="how-it-works">
    <h1>Comment ça marche ?</h1>
    <div class="steps">
      <div class="step">
        <h2>1. Créez votre projet</h2>
        <p>Décrivez votre projet, fixez votre objectif de financement et définissez vos récompenses.</p>
      </div>
      <div class="step">
        <h2>2. Partagez votre projet</h2>
        <p>Partagez votre projet avec votre communauté et sur les réseaux sociaux.</p>
      </div>
      <div class="step">
        <h2>3. Collectez les fonds</h2>
        <p>Recevez les contributions de vos soutiens et réalisez votre projet.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.how-it-works {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.step {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

p {
  color: var(--color-text);
  line-height: 1.6;
}
</style> 