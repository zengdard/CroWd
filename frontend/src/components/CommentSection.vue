<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import type { Comment } from '@/types';

const props = defineProps<{
  projectId: number;
}>();

const authStore = useAuthStore();
const comments = ref<Comment[]>([]);
const newComment = ref('');
const loading = ref(true);
const error = ref('');
const submitting = ref(false);

onMounted(async () => {
  await fetchComments();
});

async function fetchComments() {
  try {
    loading.value = true;
    const response = await fetch(`/api/comments/project/${props.projectId}`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    comments.value = await response.json();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

async function submitComment() {
  if (!authStore.isAuthenticated) {
    error.value = 'Please login to comment';
    return;
  }

  if (!newComment.value.trim()) {
    return;
  }

  try {
    submitting.value = true;
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: props.projectId,
        content: newComment.value
      })
    });

    if (!response.ok) throw new Error('Failed to post comment');
    
    const comment = await response.json();
    comments.value.unshift(comment);
    newComment.value = '';
  } catch (e: any) {
    error.value = e.message;
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="comments-section">
    <h2>Comments</h2>

    <div v-if="authStore.isAuthenticated" class="comment-form">
      <textarea
        v-model="newComment"
        placeholder="Write a comment..."
        :disabled="submitting"
        rows="3"
      ></textarea>
      <button 
        @click="submitComment"
        :disabled="!newComment.trim() || submitting"
        class="submit-button"
      >
        {{ submitting ? 'Posting...' : 'Post Comment' }}
      </button>
    </div>

    <div v-else class="login-prompt">
      <router-link to="/login" class="login-link">
        Login to comment
      </router-link>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="loading" class="loading">
      Loading comments...
    </div>

    <div v-else class="comments-list">
      <div v-if="comments.length === 0" class="no-comments">
        No comments yet. Be the first to comment!
      </div>

      <div 
        v-for="comment in comments" 
        :key="comment.id" 
        class="comment"
      >
        <div class="comment-header">
          <div class="user-info">
            <img 
              :src="comment.author.avatar || '/default-avatar.png'" 
              :alt="comment.author.username"
              class="avatar"
            />
            <span class="username">{{ comment.author.username }}</span>
          </div>
          <span class="timestamp">
            {{ new Date(comment.createdAt).toLocaleDateString() }}
          </span>
        </div>
        <div class="comment-content">
          {{ comment.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comments-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.comment-form {
  margin-bottom: 2rem;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  resize: vertical;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.2s ease;
}

textarea:focus {
  outline: none;
  border-color: #dc2626;
}

.submit-button {
  padding: 0.5rem 1rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.login-prompt {
  text-align: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.login-link {
  color: #dc2626;
  text-decoration: none;
  font-weight: 500;
}

.error-message {
  padding: 0.75rem;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.loading {
  text-align: center;
  color: #6b7280;
  padding: 2rem;
}

.comment {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
}

.username {
  font-weight: 500;
  color: #111827;
}

.timestamp {
  font-size: 0.875rem;
  color: #6b7280;
}

.comment-content {
  color: #374151;
  line-height: 1.5;
}

.no-comments {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}
</style>
