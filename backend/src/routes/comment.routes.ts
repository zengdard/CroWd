import { Router } from 'express';
import { commentController } from '../controllers/comment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, commentController.create);
router.get('/project/:projectId', commentController.getByProject);

export default router; 