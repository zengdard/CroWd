// src/types/index.ts
export interface LatexTemplate {
    label: string;
    code: string;
    description: string;
    documentation?: string;
    category: 'basic' | 'math' | 'physics' | 'chemistry' | 'advanced';
  }