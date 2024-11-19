// routes/stripe.ts
import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { authenticate } from '../middleware/auth.middleware';
import { StripeService } from '../services/stripe.service';
import { StripeInvoice } from '../types/stripe.types';


const router = Router();

interface CustomRequest extends Request {
  user?: {
    id: number;
    stripeCustomerId: string;
  };
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-10-28.acacia'  // Updated API version
});

router.post('/webhooks', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    switch (event.type) {
      case 'invoice.payment_succeeded':
      case 'invoice.payment_failed':
        await StripeService.handleInvoicePayment(event.data.object as StripeInvoice);        break;
    }

    res.json({ received: true });
  } catch (err) {
    const error = err as Error;
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

router.post('/create-checkout-session', authenticate, async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('User not authenticated');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer: req.user.stripeCustomerId,
      line_items: [{
        price: process.env.STRIPE_PRICE_ID || '',
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/canceled`,
      metadata: {
        userId: req.user.id
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

export default router;