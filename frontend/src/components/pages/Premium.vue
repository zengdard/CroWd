<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isLoading = ref(false)

const features = {
  free: [
    'Basic LaTeX Editor',
    'Standard Templates',
    'Basic Math Symbols Library',
    'Community Support',
    'Basic Export Options (PDF)',
  ],
  premium: [
    'AI-Powered LaTeX Generation',
    'Advanced Templates Library',
    'Real-time Collaboration',
    'Custom Snippets Storage',
    'Priority Support',
    'Advanced Export Options (PDF, HTML, Word)',
    'Cloud Storage for Documents',
    'Formula Recognition from Images',
    'Custom Keyboard Shortcuts',
    'Dark Mode Support'
  ]
}

const handleUpgrade = async () => {
  isLoading.value = true
  try {
    await authStore.upgradeToPremium()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="pricing-container">
    <div class="pricing-header">
      <h1>Upgrade to Premium</h1>
      <p class="subtitle">
        Unlock the full potential of LaTeX Editor Pro with AI-powered features
      </p>
    </div>

    <div class="plans-container">
      <!-- Plan Gratuit -->
      <div class="plan-card free">
        <div class="plan-header">
          <h2>Free</h2>
          <p class="price">$0</p>
          <p class="price-period">forever</p>
        </div>
        
        <div class="features-list">
          <ul>
            <li v-for="feature in features.free" :key="feature">
              <span class="check">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>

        <button class="plan-button secondary" disabled>
          Current Plan
        </button>
      </div>

      <!-- Plan Premium -->
      <div class="plan-card premium">
        <div class="popular-badge">MOST POPULAR</div>
        <div class="plan-header">
          <h2>Premium</h2>
          <p class="price">$9.99</p>
          <p class="price-period">per month</p>
        </div>

        <div class="features-list">
          <ul>
            <li v-for="feature in features.premium" :key="feature">
              <span class="check premium">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>

        <button 
          class="plan-button primary"
          :disabled="isLoading"
          @click="handleUpgrade"
        >
          <span v-if="isLoading">Processing...</span>
          <span v-else>Upgrade Now</span>
        </button>
      </div>
    </div>

    <!-- Bannière de confiance -->
    <div class="trust-banner">
      <div class="trust-item">
        <span class="trust-icon">🔒</span>
        <p>Secure Payment</p>
      </div>
      <div class="trust-item">
        <span class="trust-icon">↩️</span>
        <p>30-Day Money Back</p>
      </div>
      <div class="trust-item">
        <span class="trust-icon">🎭</span>
        <p>No Hidden Fees</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
  animation: fadeIn 0.5s ease;
}

.pricing-header {
  text-align: center;
  margin-bottom: 4rem;
}

.pricing-header h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

.plans-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.plan-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid var(--border-color);
}

.plan-card.premium {
  border-color: var(--primary-color);
  transform: scale(1.02);
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.price {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-color);
}

.price-period {
  color: #64748b;
  font-size: 0.875rem;
}

.features-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9375rem;
}

.check {
  color: #22c55e;
  margin-right: 0.75rem;
  font-weight: bold;
}

.check.premium {
  color: var(--primary-color);
}

.plan-button {
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.plan-button.primary {
  background: var(--primary-color);
  color: white;
}

.plan-button.secondary {
  background: #e2e8f0;
  color: #64748b;
}

.plan-button:not(:disabled):hover {
  transform: translateY(-2px);
}

.trust-banner {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.trust-icon {
  font-size: 1.5rem;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media Queries */
@media (max-width: 768px) {
  .pricing-container {
    padding: 2rem 1rem;
  }

  .plan-card.premium {
    transform: none;
  }

  .trust-banner {
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .plans-container {
    grid-template-columns: 1fr;
  }

  .trust-banner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .plan-card {
    background: var(--input-bg);
  }

  .plan-button.secondary {
    background: #334155;
    color: #94a3b8;
  }
}
</style>