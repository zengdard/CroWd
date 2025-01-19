<script setup lang="ts">
import { ref, watch } from 'vue';
import * as hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return '';
  }
});

const props = withDefaults(defineProps<{
  modelValue: string;
  placeholder?: string;
  debug?: boolean;
}>(), {
  modelValue: '',
  placeholder: '',
  debug: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const preview = ref('');
const showPreview = ref(false);
const debugInfo = ref('');

watch(() => props.modelValue, (newValue) => {
  preview.value = md.render(newValue);
  if (props.debug) {
    debugInfo.value = JSON.stringify({
      length: newValue.length,
      words: newValue.split(/\s+/).length,
      lines: newValue.split('\n').length
    }, null, 2);
  }
}, { immediate: true });
</script>

<template>
  <div class="markdown-editor">
    <div class="toolbar">
      <button type="button" @click="showPreview = !showPreview">
        {{ showPreview ? 'Edit' : 'Preview' }}
      </button>
    </div>

    <div class="editor-container">
      <textarea
        v-if="!showPreview"
        :value="modelValue"
        @input="$event => emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        :placeholder="placeholder"
        class="editor"
      ></textarea>

      <div v-else class="preview markdown-body" v-html="preview"></div>
    </div>

    <div v-if="debug && !showPreview" class="debug-panel">
      <pre>{{ debugInfo }}</pre>
    </div>
  </div>
</template>

<style scoped>
.markdown-editor {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.toolbar {
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.editor-container {
  min-height: 300px;
}

.editor {
  width: 100%;
  height: 100%;
  min-height: 300px;
  padding: 1rem;
  border: none;
  resize: vertical;
}

.preview {
  padding: 1rem;
  min-height: 300px;
}

.debug-panel {
  padding: 0.5rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
