import { Request, Response, NextFunction } from 'express';
import { Contribution } from '../models/contribution.model';
import { Project } from '../models/project.model';

export const contributionController = {
  // Créer une nouvelle contribution
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { project_idProject, amount } = req.body;
      
      // Créer la contribution
      const contribution = await Contribution.create({
        user_idUser: req.user.id,
        project_idProject,
        amount
      });

      // Mettre à jour le montant actuel du projet
      await Project.findByIdAndUpdate(
        project_idProject,
        { $inc: { current_amount: amount } }
      );

      res.status(201).json(contribution);
    } catch (error) {
      next(error);
    }
  },

  // Obtenir toutes les contributions d'un projet
  getByProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contributions = await Contribution.find({
        project_idProject: req.params.projectId
      }).populate('user_idUser');
      res.json(contributions);
    } catch (error) {
      next(error);
    }
  }
}; 