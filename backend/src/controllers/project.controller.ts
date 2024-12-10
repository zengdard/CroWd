import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/project.model';
import { ApiError } from '../utils/ApiError';

export const projectController = {
  // Créer un nouveau projet
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.create({
        ...req.body,
        user_idUser: req.user.id
      });
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  },

  // Obtenir tous les projets
  getAll: async (_req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const projects = await Project.find();
      return res.json(projects);
    } catch (error) {
      next(error);
      return;
    }
  },

  // Obtenir un projet par ID
  getById: async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        throw new ApiError(404, 'Project not found');
      }
      return res.json(project);
    } catch (error) {
      next(error);
      return;
    }
  },

  // Mettre à jour un projet
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updated_at: Date.now() },
        { new: true }
      );
      if (!project) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
      return res.json(project);
    } catch (error) {
      next(error);
      return;
    }
  },

  // Supprimer un projet
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
      return;
    }
  }
}; 