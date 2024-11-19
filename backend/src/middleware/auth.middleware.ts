
// middleware/auth.middleware.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import User from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { AuthRequest } from '../types/custom';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication required');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as jwt.JwtPayload;
      const user = await User.findByPk(decoded.userId);

      if (!user) {
        throw new ApiError(401, 'User not found');
      }

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, 'Invalid token');
    }
  } catch (error) {
    next(error);
  }
};