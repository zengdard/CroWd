import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // CSRF Error
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid CSRF token'
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: Object.values(err.errors).map((error: any) => error.message)
    });
  }

  // Custom API Error
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errors: err.errors
    });
  }

  // Default Error
  console.error('Error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
};