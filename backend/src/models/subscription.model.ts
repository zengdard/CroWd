// models/subscription.model.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"
import { User } from "./user.model"
import { Project } from "./project.model"

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id!: number

  subscriber!: User

  project!: Project

  @Column()
  stripeSubscriptionId!: string

  @Column()
  status!: string

  @Column({ type: 'datetime' })
  currentPeriodEnd!: Date

  @Column({ default: true })
  active!: boolean

  @CreateDateColumn()
  created_at!: Date
}

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