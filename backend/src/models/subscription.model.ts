// models/subscription.model.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.model"
import { Project } from "./project.model"

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  subscriber!: User;

  @ManyToOne(() => Project)
  project!: Project;

  @Column({ type: "varchar", length: 255 })
  stripeSubscriptionId!: string;

  @Column({ type: "varchar", length: 50 })
  status!: string;

  @Column({ type: "datetime" })
  currentPeriodEnd!: Date;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;
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