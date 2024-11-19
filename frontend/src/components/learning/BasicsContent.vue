<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import katex from 'katex';
import { tutorialSections } from '@/data/tutorials';
import type { TutorialSection, Exercise, ExerciseState } from '../../data/tutorials';

const currentSection = ref(0);
const userInput = ref('');
const previewEl = ref<HTMLElement | null>(null);

// État local pour gérer les réponses et le statut des exercices
const exerciseStates = ref<Record<string, ExerciseState>>({});

// Initialize exercise states
const initializeExerciseStates = () => {
  const currentExercises = currentSectionData.value.exercises;
  currentExercises.forEach(exercise => {
    if (!exerciseStates.value[exercise.id]) {
      exerciseStates.value[exercise.id] = {
        id: exercise.id,
        userAnswer: '',
        status: undefined,
        feedback: ''
      };
    }
  });
};

const sections = tutorialSections;

const currentSectionData = computed(() => sections[currentSection.value]);

const updatePreview = () => {
  if (previewEl.value) {
    try {
      katex.render(userInput.value, previewEl.value, {
        displayMode: true,
        throwOnError: false
      });
    } catch (error) {
      console.error('LaTeX parsing error:', error);
    }
  }
};

const checkExercise = (exerciseId: string) => {
  const exercise = currentSectionData.value.exercises.find(ex => ex.id === exerciseId);
  const state = exerciseStates.value[exerciseId];
  
  if (!exercise || !state) return;
  
  const userAnswer = state.userAnswer.trim();
  
  if (userAnswer === exercise.solution) {
    state.status = 'correct';
    state.feedback = 'Correct! Well done!';
  } else {
    state.status = 'incorrect';
    state.feedback = 'Try again. Check your syntax.';
  }
};

// Mise à jour du template et initialisation des états
onMounted(() => {
  initializeExerciseStates();
  updatePreview();
});

// Surveiller les changements de section pour réinitialiser les états
watch(() => currentSection.value, initializeExerciseStates);
</script>

<template>
  <div class="learning-content">
    <div class="tutorial-navigation">
      <button 
        v-for="(section, index) in sections" 
        :key="section.id"
        :class="{ active: currentSection === index }"
        @click="currentSection = index"
        class="nav-button"
      >
        {{ section.title }}
      </button>
    </div>

    <div class="tutorial-content">
      <h2>{{ currentSectionData.title }}</h2>
      <div class="content-grid">
        <div class="explanation">
          <div v-html="currentSectionData.content"></div>
        </div>
        
        <div class="interactive-editor">
          <textarea
            v-model="userInput"
            class="latex-input"
            placeholder="Try it yourself..."
            @input="updatePreview"
          ></textarea>
          <div ref="previewEl" class="preview"></div>
        </div>
      </div>

      <div class="exercises" v-if="currentSectionData.exercises.length">
        <h3>Exercises</h3>
        <div 
          v-for="exercise in currentSectionData.exercises" 
          :key="exercise.id"
          class="exercise-item"
        >
          <p>{{ exercise.question }}</p>
          <div class="exercise-input">
            <textarea
              v-model="exerciseStates[exercise.id].userAnswer"
              placeholder="Your answer..."
              @input="checkExercise(exercise.id)"
            ></textarea>
            <div 
              class="exercise-feedback" 
              :class="exerciseStates[exercise.id]?.status"
            >
              {{ exerciseStates[exercise.id]?.feedback }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>