<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  title: '',
  category: '',
  fundingGoal: '',
  duration: 30,
  description: '',
  rewards: [
    { title: '', description: '', amount: '', delivery: '' }
  ]
})

const addReward = () => {
  formData.value.rewards.push({
    title: '',
    description: '',
    amount: '',
    delivery: ''
  })
}

const submitProject = () => {
  // Handle project submission
  console.log(formData.value)
}
</script>

<template>
  <div class="start-project-container">
    <div class="form-wrapper">
      <h1>Start Your Project</h1>
      <p class="subtitle">Share your creative project with the world</p>

      <form @submit.prevent="submitProject" class="project-form">
        <div class="form-section">
          <h2>Basic Information</h2>
          
          <div class="form-group">
            <label for="title">Project Title</label>
            <input 
              type="text" 
              id="title"
              v-model="formData.title"
              placeholder="Enter your project title"
              required
            >
          </div>

          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" v-model="formData.category" required>
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="art">Art</option>
              <option value="games">Games</option>
              <option value="music">Music</option>
            </select>
          </div>

          <div class="form-group">
            <label for="fundingGoal">Funding Goal ($)</label>
            <input 
              type="number" 
              id="fundingGoal"
              v-model="formData.fundingGoal"
              placeholder="Enter your funding goal"
              required
            >
          </div>

          <div class="form-group">
            <label for="duration">Campaign Duration (Days)</label>
            <input 
              type="range" 
              id="duration"
              v-model="formData.duration"
              min="1"
              max="60"
            >
            <span>{{ formData.duration }} days</span>
          </div>
        </div>

        <div class="form-section">
          <h2>Project Details</h2>
          
          <div class="form-group">
            <label for="description">Project Description</label>
            <textarea 
              id="description"
              v-model="formData.description"
              rows="6"
              placeholder="Describe your project..."
              required
            ></textarea>
          </div>
        </div>

        <div class="form-section">
          <h2>Rewards</h2>
          
          <div 
            v-for="(reward, index) in formData.rewards" 
            :key="index"
            class="reward-card"
          >
            <div class="form-group">
              <label>Reward Title</label>
              <input 
                type="text"
                v-model="reward.title"
                placeholder="Enter reward title"
              >
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea 
                v-model="reward.description"
                placeholder="Describe the reward..."
                rows="3"
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Amount ($)</label>
                <input 
                  type="number"
                  v-model="reward.amount"
                  placeholder="Amount"
                >
              </div>

              <div class="form-group">
                <label>Estimated Delivery</label>
                <input 
                  type="month"
                  v-model="reward.delivery"
                >
              </div>
            </div>
          </div>

          <button 
            type="button"
            @click="addReward"
            class="add-reward-btn"
          >
            Add Another Reward
          </button>
        </div>

        <button type="submit" class="submit-btn">
          Launch Project
        </button>
      </form>
    </div>
  </div>
</template>

<style>
.start-project-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.start-project-container h1 {
  text-align: center;
  color: #1f2937;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 3rem;
}

.form-section {
  margin-bottom: 3rem;
}

.form-section h2 {
  color: #1f2937;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #dc2626;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.reward-card {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.add-reward-btn {
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 2px dashed #dc2626;
  color: #dc2626;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-reward-btn:hover {
  background: rgba(220, 38, 38, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
}
</style>