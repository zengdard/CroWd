import { Request, Response, NextFunction } from 'express';
import { ContributionRepository, ProjectRepository } from '../services/database.service';

interface ContributionData {
  amount: number;
  project: { id: number };
  user: { id: number };
}

export const contributionController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contributionData: ContributionData = req.body;
      const newContribution = ContributionRepository.create({
        amount: contributionData.amount,
        project: { id: contributionData.project.id },
        user: { id: contributionData.user.id }
      });
      
      const saved = await ContributionRepository.save(newContribution);

      if (saved.project?.id) {
        await ProjectRepository.createQueryBuilder()
          .update()
          .set({
            current_amount: () => `current_amount + :amount`,
          })
          .where("id = :id", { 
            id: saved.project.id, 
            amount: saved.amount 
          })
          .execute();
      }

      res.status(201).json(saved);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const contributions = await ContributionRepository.find({
        where: { project: { id: projectId } },
        relations: ['user']
      });
      res.json(contributions);
    } catch (error) {
      next(error);
    }
  }
};