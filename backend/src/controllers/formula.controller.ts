// controllers/formula.controller.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/custom';
import Formula from '../models/formula.model';
import User from '../models/user.model';
import { ApiError } from '../utils/ApiError';

export class FormulaController {
  static async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { title, latex, description, tags, isPublic } = req.body;
      const userId = req.user?.id;

      const formula = new Formula({
        title,
        latex,
        description,
        tags,
        isPublic,
        userId
      });

      await formula.save();
      res.status(201).json(formula);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const formulas = await Formula.find({
        $or: [
          { userId },
          { isPublic: true }
        ]
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name');

      const total = await Formula.countDocuments({
        $or: [
          { userId },
          { isPublic: true }
        ]
      });

      res.json({
        formulas,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const formula = await Formula.findById(req.params.id)
        .populate('userId', 'name');

      if (!formula) {
        throw new ApiError(404, 'Formula not found');
      }

      // Conversion en string pour la comparaison
      if (!formula.isPublic && formula.userId.toString() !== req.user?.id?.toString()) {
        throw new ApiError(403, 'Unauthorized access');
      }

      res.json(formula);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { title, latex, description, tags, isPublic } = req.body;
      const formula = await Formula.findById(req.params.id);

      if (!formula) {
        throw new ApiError(404, 'Formula not found');
      }

      // Conversion en string pour la comparaison
      if (formula.userId.toString() !== req.user?.id?.toString()) {
        throw new ApiError(403, 'Unauthorized access');
      }

      Object.assign(formula, {
        title,
        latex,
        description,
        tags,
        isPublic
      });

      await formula.save();
      res.json(formula);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const formula = await Formula.findById(req.params.id);

      if (!formula) {
        throw new ApiError(404, 'Formula not found');
      }

      // Conversion en string pour la comparaison
      if (formula.userId.toString() !== req.user?.id?.toString()) {
        throw new ApiError(403, 'Unauthorized access');
      }

      await formula.deleteOne();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}