// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { config } from '../config/config';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ApiError(401, 'Non authentifié');
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as { id: string };
      const user = await User.findById(decoded.id);

      if (!user) {
        throw new ApiError(401, 'Utilisateur non trouvé');
      }

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, 'Token invalide');
    }
  } catch (error) {
    next(error);
  }
};