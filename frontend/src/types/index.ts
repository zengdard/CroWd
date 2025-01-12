// src/types/index.ts
export interface LatexTemplate {
    label: string;
    code: string;
    description: string;
    documentation?: string;
    category: 'basic' | 'math' | 'physics' | 'chemistry' | 'advanced';
}

export interface User {
  id: number
  email: string
  username: string
  createdAt: string
  updatedAt: string
}

export interface ApiError {
  message: string
  status: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface Project {
  id: number;
  title: string;
  description: string;
  goal: number;
  currentAmount: number;
  endDate: Date;
  creator: User;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  category: string;
  imageUrl?: string;
}

export interface Contribution {
  id: number;
  amount: number;
  project: Project;
  contributor: User;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
  message?: string;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}