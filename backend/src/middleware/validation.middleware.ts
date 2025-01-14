import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';
import { registerSchema, loginSchema } from '../validations/auth.validation';

export const validateRequest = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = validatedData.body;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation error',
          errors: error.errors
        });
      }
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  };

// Formula validation schema
const formulaSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    latex: z.string().min(1)
  })
});

// Export validation middleware instances
export const validateFormula = validateRequest(formulaSchema);
export const validateRegister = validateRequest(registerSchema);
export const validateLogin = validateRequest(loginSchema);

// Re-export schemas for use elsewhere
export { registerSchema, loginSchema };