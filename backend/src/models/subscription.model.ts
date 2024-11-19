// models/subscription.model.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Subscription extends Model {
  public id!: number;
  public userId!: number;
  public stripeCustomerId!: string;
  public stripeSubscriptionId!: string;
  public status!: 'active' | 'canceled' | 'past_due';
  public currentPeriodStart!: Date;
  public currentPeriodEnd!: Date;
  public cancelAtPeriodEnd!: boolean;
}

Subscription.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stripeCustomerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stripeSubscriptionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'canceled', 'past_due'),
    allowNull: false,
  },
  currentPeriodStart: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  currentPeriodEnd: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cancelAtPeriodEnd: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Subscription',
});

export default Subscription;
  
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