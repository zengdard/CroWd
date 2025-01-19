import { Request, Response, NextFunction } from 'express';
import { checkDatabaseHealth } from '../config/database';

export const databaseCheckMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!await checkDatabaseHealth()) {
    return res.status(503).json({
      status: 'error',
      message: 'Database service unavailable'
    });
  }
  next();
};
