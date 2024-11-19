<template>
  <div class="learning-content">
    <div class="tutorial-navigation">
      <button 
        v-for="section in tutorialSections" 
        :key="section.id"
        :class="{ active: currentSection === section.id }"
        @click="currentSection = section.id"
        class="nav-button"
      >
        {{ section.title }}
      </button>
    </div>

    <div class="tutorial-content" v-if="currentSectionData">
      <h2>{{ currentSectionData.title }}</h2>
      <div class="content-grid">
        <div class="explanation">
          <div v-html="currentSectionData.content"></div>
        </div>
        
        <div class="examples">
          <h3>Examples</h3>
          <div v-for="example in currentSectionData.examples" :key="example.id">
            <p>{{ example.explanation }}</p>
            <div class="preview">
              <KaTeX 
                :expression="example.latex"
                :display-mode="true"
                :throw-on-error="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="exercises" v-if="currentSectionData.exercises">
        <h3>Exercises</h3>
        <div 
          v-for="exercise in currentSectionData.exercises" 
          :key="exercise.id"
          class="exercise-item"
        >
          <p class="question">{{ exercise.question }}</p>
          <p v-if="exercise.hint" class="hint">Hint: {{ exercise.hint }}</p>
          <div class="exercise-input">
            <textarea
              v-model="getExerciseState(exercise.id).userAnswer"
              placeholder="Your answer..."
              @input="checkExercise(exercise.id)"
            ></textarea>
            <div class="preview">
              <KaTeX 
                :expression="getExerciseState(exercise.id).userAnswer || ''"
                :display-mode="true"
                :throw-on-error="false"
              />
            </div>
            <div 
              v-if="getExerciseState(exercise.id).status" 
              class="exercise-feedback" 
              :class="getExerciseState(exercise.id).status"
            >
              {{ getExerciseState(exercise.id).feedback }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { tutorialSections } from '../../data/tutorials';
import type { TutorialSection, Exercise, ExerciseState } from '../../data/tutorials';

const currentSection = ref(tutorialSections[0].id);
const exerciseStates = ref<Map<string, ExerciseState>>(new Map());

const currentSectionData = computed<TutorialSection | undefined>(() => {
    return tutorialSections.find(s => s.id === currentSection.value);
});

const getExerciseState = (exerciseId: string): ExerciseState => {
    if (!exerciseStates.value.has(exerciseId)) {
        exerciseStates.value.set(exerciseId, {
            id: exerciseId,
            userAnswer: '',
            status: undefined,
            feedback: undefined
        });
    }
    return exerciseStates.value.get(exerciseId)!;
};

const checkExercise = (exerciseId: string) => {
    const exercise = currentSectionData.value?.exercises.find(e => e.id === exerciseId);
    const state = exerciseStates.value.get(exerciseId);
    
    if (!exercise || !state) return;
    
    const userAnswer = state.userAnswer.trim();
    
    if (userAnswer === exercise.solution) {
        state.status = 'correct';
        state.feedback = `Correct! ${exercise.explanation}`;
    } else {
        state.status = 'incorrect';
        state.feedback = exercise.hint || 'Try again. Check your syntax.';
    }
};
</script>

<style scoped>
.learning-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.tutorial-navigation {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.nav-button {
    padding: 0.5rem 1rem;
    border: none;
    background: #f0f0f0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.nav-button.active {
    background: #2563eb;
    color: white;
}

.content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.examples {
    margin-bottom: 2rem;
}

.exercise-item {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.question {
    font-weight: 500;
    margin-bottom: 1rem;
}

.hint {
    color: #666;
    font-style: italic;
    margin-bottom: 1rem;
}

.exercise-input textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-family: monospace;
    resize: vertical;
}

.preview {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    overflow-x: auto;
}

.exercise-feedback {
    margin-top: 0.5rem;
    padding: 0.75rem;
    border-radius: 6px;
    font-weight: 500;
}

.exercise-feedback.correct {
    background: #dcfce7;
    color: #166534;
}

.exercise-feedback.incorrect {
    background: #fee2e2;
    color: #991b1b;
}

@media (max-width: 768px) {
    .content-grid {
        grid-template-columns: 1fr;
    }

    .tutorial-navigation {
        flex-wrap: wrap;
    }
}
</style>