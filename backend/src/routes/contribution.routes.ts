import { Router } from 'express';
import { contributionController } from '../controllers/contribution.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, contributionController.create);
router.get('/project/:projectId', contributionController.getAll);

export default router;