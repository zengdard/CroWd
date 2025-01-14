import { z } from 'zod';

// Define the schemas
export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string(),
  }),
});

// Define input types from schemas
export type RegisterInput = {
  email: string;
  password: string;
  username: string;
};

export type LoginInput = {
  email: string;
  password: string;
};