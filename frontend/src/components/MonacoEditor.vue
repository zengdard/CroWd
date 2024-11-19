<template>
  <div ref="editorContainer" class="monaco-editor-container" :style="{ height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as monaco from 'monaco-editor';

// Configuration des workers Monaco
window.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === 'latex') {
      return '/monaco-editor/esm/vs/editor/editor.worker.js';
    }
    return '/monaco-editor/esm/vs/editor/editor.worker.js';
  }
};

interface LatexTemplate {
  label: string;
  code: string;
  description: string;
  documentation: string;
}

const commonTemplates: LatexTemplate[] = [
  {
      label: 'Fraction',
      code: '\\frac{numerator}{denominator}',
      description: 'Insert a fraction',
      documentation: 'Creates a fraction with numerator and denominator'
  },
  {
      label: 'Square Root',
      code: '\\sqrt{x}',
      description: 'Insert a square root',
      documentation: 'Creates a square root expression'
  },
];

const props = defineProps<{
  modelValue: string;
  height?: string;
  language?: string;
  theme?: string;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();

const editorContainer = ref<HTMLElement | null>(null);
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  roundedSelection: true,
  automaticLayout: true,
  theme: props.theme || 'vs-light',
  language: props.language || 'latex',
  fontSize: 14,
  wordWrap: 'on',
  suggestOnTriggerCharacters: true,
  quickSuggestions: true,
};

onMounted(() => {
  if (editorContainer.value) {
      editor = monaco.editor.create(editorContainer.value, {
          ...defaultOptions,
          ...props.options,
          value: props.modelValue,
      });

      editor.onDidChangeModelContent(() => {
          const value = editor?.getValue() || '';
          emit('update:modelValue', value);
          emit('change', value);
      });

      // Configuration spécifique pour LaTeX
      monaco.languages.register({ id: 'latex' });
      monaco.languages.setMonarchTokensProvider('latex', {
          tokenizer: {
              root: [
                  [/\\[a-zA-Z]+/, 'keyword'],
                  [/\{|\}/, 'delimiter'],
                  [/\[|\]/, 'delimiter'],
                  [/\$\$?/, 'delimiter'],
                  [/%.*$/, 'comment'],
              ],
          },
      });

      // Suggestions LaTeX
      monaco.languages.registerCompletionItemProvider('latex', {
          provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position) => {
              const word = model.getWordUntilPosition(position);
              const range = new monaco.Range(
                  position.lineNumber,
                  word.startColumn,
                  position.lineNumber,
                  word.endColumn
              );

              return {
                  suggestions: commonTemplates.map((template: LatexTemplate) => ({
                      label: template.label,
                      kind: monaco.languages.CompletionItemKind.Snippet,
                      insertText: template.code,
                      detail: template.description,
                      documentation: template.documentation,
                      range: range
                  }))
              };
          }
      });
  }
});

watch(() => props.modelValue, (newValue) => {
  if (editor && newValue !== editor.getValue()) {
      editor.setValue(newValue);
  }
});

onBeforeUnmount(() => {
  if (editor) {
      editor.dispose();
  }
});
</script>

<style scoped>
.monaco-editor-container {
  width: 100%;
  min-height: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>