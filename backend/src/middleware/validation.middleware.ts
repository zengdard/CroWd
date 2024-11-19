// middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ValidationChain, body, validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError';

// Type correct pour le schéma de validation
export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all(validations.map(validation => validation.run(req)));
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation Error', errors.array());
      }
      
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Schémas de validation
export const registerSchema: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
    
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .trim(),
    
  body('name')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Name is required and must be a non-empty string')
];

export const loginSchema: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
    
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .trim()
];

export const formulaSchema: ValidationChain[] = [
  body('title')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Title is required and must be a non-empty string'),
    
  body('latex')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('LaTeX formula is required and must be a non-empty string')
];

// Export des middlewares de validation
export const validateFormula = validateRequest(formulaSchema);
export const validateRegister = validateRequest(registerSchema);
export const validateLogin = validateRequest(loginSchema);