// routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateLogin, validateRegister } from '../middleware/validation.middleware';

const router = Router();

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.get('/me', authenticate, AuthController.getCurrentUser);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', authenticate, AuthController.logout);

export default router;