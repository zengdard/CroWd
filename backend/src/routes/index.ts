import { Router } from 'express';
import projectRoutes from './project.routes';
import contributionRoutes from './contribution.routes';
import commentRoutes from './comment.routes';

const router = Router();

router.use('/projects', projectRoutes);
router.use('/contributions', contributionRoutes);
router.use('/comments', commentRoutes);

export default router; 