// routes/stripe.ts
import { Router } from 'express';
import { stripeController } from '../controllers/stripe.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/create-checkout-session', authMiddleware, stripeController.createCheckoutSession);
router.post('/webhook', stripeController.handleWebhook);

export default router;