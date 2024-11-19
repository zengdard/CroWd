<template>
    <div ref="katexElement"></div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, watch, ref } from 'vue';
  import katex from 'katex';
  import 'katex/dist/katex.min.css';
  
  const props = defineProps<{
    expression: string;
    displayMode?: boolean;
  }>();
  
  const katexElement = ref<HTMLElement | null>(null);
  
  const renderKatex = () => {
    if (katexElement.value) {
      try {
        katex.render(props.expression, katexElement.value, {
          displayMode: props.displayMode ?? false,
          throwOnError: false
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
      }
    }
  };
  
  onMounted(renderKatex);
  watch(() => props.expression, renderKatex);
  </script>