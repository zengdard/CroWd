import express from 'express';
import { commentController } from '../controllers/comment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, commentController.create);
router.get('/project/:projectId', commentController.getAll);

export default router;