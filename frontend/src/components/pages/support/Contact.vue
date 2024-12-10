<template>
  <div class="contact">
    <div class="container">
      <h1>Contactez-nous</h1>

      <div class="contact-grid">
        <div class="contact-info">
          <h2>Nous sommes là pour vous aider</h2>
          <p>Notre équipe est disponible pour répondre à toutes vos questions.</p>
          
          <div class="contact-methods">
            <div class="method">
              <h3>Email</h3>
              <p>support@crowdfunding.com</p>
            </div>
            
            <div class="method">
              <h3>Téléphone</h3>
              <p>+33 (0)1 23 45 67 89</p>
              <p class="hours">Lun-Ven, 9h-18h</p>
            </div>
            
            <div class="method">
              <h3>Adresse</h3>
              <p>123 rue du Crowdfunding</p>
              <p>75000 Paris, France</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label class="form-label">Nom</label>
            <input v-model="form.name" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Sujet</label>
            <select v-model="form.subject" class="form-input" required>
              <option value="">Sélectionnez un sujet</option>
              <option value="project">Question sur un projet</option>
              <option value="account">Gestion du compte</option>
              <option value="technical">Support technique</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea v-model="form.message" class="form-input" rows="6" required></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Envoyer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Contact',
  
  setup() {
    const form = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const submitForm = async () => {
      try {
        // Implémenter l'envoi du formulaire
        console.log('Form submitted:', form);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    return {
      form,
      submitForm
    };
  }
});
</script>

<style scoped>
.contact {
  padding: 3rem 0;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-heading);
  text-align: center;
  margin-bottom: 3rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info h2 {
  color: var(--color-heading);
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.contact-methods {
  margin-top: 2rem;
}

.method {
  margin-bottom: 2rem;
}

.method h3 {
  color: var(--color-heading);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.method p {
  color: var(--color-text);
  margin: 0;
}

.hours {
  color: var(--color-text-light);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.contact-form {
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: var(--border-radius);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style> 