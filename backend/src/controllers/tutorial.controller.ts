// backend/src/controllers/tutorial.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export class TutorialController {
  static async getAllTutorials(req: Request, res: Response, next: NextFunction) {
    try {
      // Implémentation à venir
      res.json({ tutorials: [] });
    } catch (error) {
      next(error);
    }
  }

  static async getTutorialById(req: Request, res: Response, next: NextFunction) {
    try {
      // Implémentation à venir
      res.json({ tutorial: null });
    } catch (error) {
      next(error);
    }
  }
}