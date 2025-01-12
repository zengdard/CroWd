import { Request, Response, NextFunction } from 'express';
import { CommentRepository } from '../services/database.service';

export const commentController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment = CommentRepository.create(req.body);
      await CommentRepository.save(comment);
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comments = await CommentRepository.find({
        where: { project: { id: parseInt(req.params.projectId) } },
        relations: ['author']
      });
      res.json(comments);
    } catch (error) {
      next(error);
    }
  }
};