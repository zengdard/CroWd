import { Router } from 'express';
import { TutorialController } from '../controllers/tutorial.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.get('/', TutorialController.getAllTutorials);
router.get('/:id', TutorialController.getTutorialById);

export default router;