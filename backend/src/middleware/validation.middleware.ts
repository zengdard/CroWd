// middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Schémas de validation
export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8)
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    totpCode: z.string().optional()
  })
});

export const formulaSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    latex: z.string().min(1)
  })
});

// Export des middlewares de validation
export const validateFormula = validateRequest(formulaSchema);
export const validateRegister = validateRequest(registerSchema);
export const validateLogin = validateRequest(loginSchema);