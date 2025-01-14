// routes/auth.routes.ts
import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../validations/auth.validation';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public routes - these should be above the authMiddleware
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

// Protected routes - these should be below the authMiddleware
router.use(authMiddleware); // Apply auth middleware only to routes below this line

router.get('/me', authController.getCurrentUser);
router.put('/profile', authController.updateProfile);
router.post('/change-password', authController.changePassword);
router.post('/enable-2fa', authController.enable2FA);
router.post('/verify-2fa', authController.verify2FA);
router.post('/disable-2fa', authController.disable2FA);
router.post('/logout', authController.logout);

export default router;