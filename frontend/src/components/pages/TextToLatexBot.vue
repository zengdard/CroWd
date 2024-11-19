<template>
  <div class="assistant-container">
    <div class="content-wrapper">
      <!-- En-tête -->
      <div class="header-section">
        <h1>Text to LaTeX Assistant</h1>
        <p class="subtitle">Convert natural language to LaTeX mathematics</p>
      </div>

      <!-- Zone de chat -->
      <div class="chat-window">
        <div class="chat-history" ref="chatHistoryRef">
          <div v-for="(message, index) in messages" 
               :key="index" 
               :class="['message-wrapper', message.type]">
            <div class="message-content">
              <div class="avatar">
                <i :class="message.type === 'user' ? 'fas fa-user' : 'fas fa-robot'"></i>
              </div>
              <div class="message-bubble">
                <div class="message-text" v-if="message.type === 'user'">
                  {{ message.content }}
                </div>
                <div v-else>
                  <div class="message-text">{{ message.content }}</div>
                  <div v-if="message.latex" class="latex-preview">
                    <div class="latex-header">
                      <span>Generated LaTeX:</span>
                      <div class="latex-actions">
                        <button @click="copyToClipboard(message.latex)" class="icon-button" :title="copyStatus">
                          <i class="fas fa-copy"></i>
                        </button>
                        <button @click="copyToEditor(message.latex)" class="icon-button">
                          <i class="fas fa-edit"></i>
                        </button>
                      </div>
                    </div>
                    <code class="latex-code">{{ message.latex }}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Zone de saisie -->
        <div class="input-section" :class="{ 'is-loading': isLoading }">
          <textarea 
            v-model="userInput"
            placeholder="Describe your mathematical expression (e.g., 'integral of x squared from 0 to infinity')"
            @keydown.enter.prevent="sendMessage"
            :disabled="isLoading"
            ref="inputRef"
            rows="3"
          ></textarea>
          <button 
            @click="sendMessage" 
            class="send-button"
            :disabled="isLoading || !userInput.trim()"
          >
            <i :class="isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const userInput = ref('');
const messages = ref([]);
const isLoading = ref(false);
const chatHistoryRef = ref(null);
const inputRef = ref(null);
const copyStatus = ref('Copy to clipboard');

const scrollToBottom = async () => {
  await nextTick();
  if (chatHistoryRef.value) {
    chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight;
  }
};

watch(messages, scrollToBottom, { deep: true });

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  const userMessage = userInput.value;
  messages.value.push({
    type: 'user',
    content: userMessage
  });

  userInput.value = '';
  isLoading.value = true;

  try {
    const response = await generateLatex(userMessage);
    messages.value.push({
      type: 'assistant',
      content: response.explanation,
      latex: response.latex
    });
  } catch (error) {
    messages.value.push({
      type: 'assistant',
      content: "I apologize, but I encountered an error. Please try again.",
    });
    console.error('Error:', error);
  } finally {
    isLoading.value = false;
    if (inputRef.value) {
      inputRef.value.focus();
    }
  }
};

const generateLatex = async (prompt: string) => {
  try {
    const response = await axios.post('YOUR_API_ENDPOINT', {
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that converts mathematical descriptions into LaTeX code. Provide both the LaTeX code and a brief explanation."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4", // ou gpt-3.5-turbo selon vos besoins
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Parser la réponse pour extraire le LaTeX et l'explication
    const assistantResponse = response.data.choices[0].message.content;
    // Vous devrez adapter ce parsing selon le format de réponse que vous souhaitez
    return {
      explanation: "Here's your LaTeX expression:",
      latex: assistantResponse
    };
  } catch (error) {
    throw error;
  }
};

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  copyStatus.value = 'Copied!';
  setTimeout(() => {
    copyStatus.value = 'Copy to clipboard';
  }, 2000);
};

const copyToEditor = (latex: string) => {
  router.push({
    path: '/editor',
    query: { latex }
  });
};
</script>

<style scoped>
.assistant-container {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 2rem;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.header-section h1 {
  color: #1a202c;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #4a5568;
  font-size: 1.1rem;
}

.chat-window {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 70vh;
}

.chat-history {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.message-wrapper {
  margin-bottom: 1.5rem;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user .avatar {
  background-color: #4299e1;
  color: white;
}

.assistant .avatar {
  background-color: #48bb78;
  color: white;
}

.message-bubble {
  flex-grow: 1;
  max-width: 80%;
}

.message-text {
  padding: 1rem;
  border-radius: 1rem;
  background-color: #f7fafc;
}

.user .message-text {
  background-color: #ebf8ff;
}

.latex-preview {
  margin-top: 0.5rem;
  background-color: #f7fafc;
  border-radius: 0.5rem;
  overflow: hidden;
}

.latex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #edf2f7;
}

.latex-actions {
  display: flex;
  gap: 0.5rem;
}

.latex-code {
  display: block;
  padding: 1rem;
  font-family: 'Monaco', 'Courier New', monospace;
  white-space: pre-wrap;
  word-break: break-all;
}

.input-section {
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  background-color: white;
}

.input-section.is-loading {
  opacity: 0.7;
}

textarea {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  resize: none;
  font-family: inherit;
  line-height: 1.5;
}

textarea:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.send-button {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #4299e1;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.send-button:hover:not(:disabled) {
  background-color: #3182ce;
}

.send-button:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
}

.icon-button {
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.icon-button:hover {
  color: #2d3748;
}

@media (max-width: 640px) {
  .assistant-container {
    padding: 1rem;
  }

  .message-bubble {
    max-width: 90%;
  }
}
</style>