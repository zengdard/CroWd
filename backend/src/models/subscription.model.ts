// models/subscription.model.ts
import { Schema, model } from 'mongoose';

export interface ISubscription {
  currentPeriodEnd: Date;
  status: 'active' | 'cancelled' | 'failed' | 'past_due';
  stripeSubscriptionId?: string;
}

const subscriptionSchema = new Schema<ISubscription>({
  currentPeriodEnd: { type: Date, required: true },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'failed', 'past_due'],
    required: true
  },
  stripeSubscriptionId: String
});

export const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

// models/Price.ts
export interface Price {
  id: string; // Stripe Price ID
  productId: string;
  currency: string;
  unitAmount: number;
  type: 'one_time' | 'recurring';
  interval?: 'month' | 'year';
  active: boolean;
}