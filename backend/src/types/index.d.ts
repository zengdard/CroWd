declare namespace Express {
    export interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
  
  declare module 'compression';
  declare module 'morgan';

  // src/types/index.ts
export interface TutorialSection {
  title: string;
  explanation: string;
  examples: string[];
  exercises: Exercise[];
}

export interface Exercise {
  question: string;
  solution: string;
  userAnswer?: string;
  status?: 'correct' | 'incorrect';
  feedback?: string;
}

export interface LatexTemplate {
  label: string;
  symbol: string;
  code: string;
  description: string;
  documentation: string;
}