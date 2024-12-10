import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import { ApiError } from '../utils/ApiError';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

export const stripeController = {
  createCheckoutSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError(401, 'User not authenticated');
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
      next(error);
    }
  },

  handleWebhook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sig = req.headers['stripe-signature'];
      
      if (!sig || typeof sig !== 'string') {
        throw new ApiError(400, 'No signature provided');
      }

      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );

      switch (event.type) {
        case 'checkout.session.completed':
          // Handle successful payment
          break;
        case 'customer.subscription.deleted':
          // Handle subscription cancellation
          break;
      }

      res.json({ received: true });
    } catch (error) {
      next(error);
    }
  }
}; 