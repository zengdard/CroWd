// types/stripe.types.ts
export interface Subscription {
    id: number;
    userId: number;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    status: 'active' | 'canceled' | 'past_due';
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  }
  
  export interface StripeEvent {
    id: string;
    type: string;
    data: {
      object: any;
    }
  }

  // src/types/stripe.types.ts
export interface StripeInvoice {
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