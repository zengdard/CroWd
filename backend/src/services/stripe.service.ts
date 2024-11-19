// services/stripe.service.ts
import Subscription from '../models/subscription.model';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-10-28.acacia'
});

interface StripeInvoice {
  subscription: string;
  status: string;
  lines: {
    data: Array<{
      period: {
        end: number;
      }
    }>
  }
}

export class StripeService {
    static async createProduct() {
        const product = await stripe.products.create({
          name: 'LaTeX Editor Pro Premium',
          description: 'Premium features including AI-powered LaTeX generation',
        });
    
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: 999, // $9.99 en centimes
          currency: 'usd',
          recurring: {
            interval: 'month'
          },
        });
    
        return { product, price };
      }
  static async handleInvoicePayment(invoice: StripeInvoice) {
    const subscription = await Subscription.findOne({
      where: { stripeSubscriptionId: invoice.subscription }
    });

    if (!subscription) return;

    if (invoice.status === 'paid') {
      await subscription.update({
        status: 'active',
        currentPeriodEnd: new Date(invoice.lines.data[0].period.end * 1000)
      });
    } else if (invoice.status === 'failed') {
      await subscription.update({ 
        status: 'past_due' 
      });
    }
    
  }
  
  // Ajoutez d'autres méthodes de gestion Stripe ici
  static async createCheckoutSession(userId: number, priceId: string) {
    // Logique de création de session
  }

  static async cancelSubscription(subscriptionId: string) {
    // Logique d'annulation
  }
}