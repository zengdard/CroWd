declare module '@hsorby/vue3-katex' {
    import { Plugin } from 'vue'
    
    interface KatexOptions {
      globalOptions?: {
        throwOnError?: boolean;
        displayMode?: boolean;
        [key: string]: any;
      }
    }
  
    const Katex: Plugin & {
      install: (app: any, options?: KatexOptions) => void;
    }
    
    export default Katex
  }