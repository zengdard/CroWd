import { Request, Response, NextFunction } from 'express';
import { ProjectRepository } from '../services/database.service';
import { ApiError } from '../utils/ApiError';

export const projectController = {
  // Créer un nouveau projet
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectData = req.body;
      const project = ProjectRepository.create(projectData);
      await ProjectRepository.save(project);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  },

  // Obtenir tous les projets
  getAll: async (_req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const projects = await ProjectRepository.find();
      return res.json(projects);
    } catch (error) {
      next(error);
      return;
    }
  },

  // Obtenir un projet par ID
  getById: async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const project = await ProjectRepository.findOne({ 
        where: { id: parseInt(req.params.id) },
        relations: ['creator', 'contributions', 'comments', 'rewards']
      });
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
      const result = await ProjectRepository.update(
        parseInt(req.params.id),
        { ...req.body, updated_at: new Date() }
      );
      if (result.affected === 0) {
        throw new ApiError(404, 'Project not found');
      }
      const updated = await ProjectRepository.findOne({ where: { id: parseInt(req.params.id) } });
      return res.json(updated);
    } catch (error) {
      next(error);
      return;
    }
  },

  // Supprimer un projet
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ProjectRepository.delete(parseInt(req.params.id));
      if (result.affected === 0) {
        throw new ApiError(404, 'Project not found');
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
      return;
    }
  }
};