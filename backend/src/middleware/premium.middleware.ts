// middleware/premium.middleware.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/custom';
import Subscription from '../models/subscription.model';
import { ApiError } from '../utils/ApiError';

export const requirePremium = async (
  req: AuthRequest,
  res: Response, 
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    const subscription = await Subscription.findOne({
      where: { 
        userId: req.user.id, 
        status: 'active' 
      }
    });

    if (!subscription) {
      throw new ApiError(403, 'Premium subscription required');
    }

    next();
  } catch (error) {
    next(error);
  }
};