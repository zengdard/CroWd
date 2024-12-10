import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/comment.model';

export const commentController = {
  // Créer un nouveau commentaire
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment = await Comment.create({
        ...req.body,
        user_idUser: req.user.id
      });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  },

  // Obtenir les commentaires d'un projet
  getByProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comments = await Comment.find({
        project_idProject: req.params.projectId
      }).populate('user_idUser');
      res.json(comments);
    } catch (error) {
      next(error);
    }
  }
}; 