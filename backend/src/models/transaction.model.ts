import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./user.model"
import { Project } from "./project.model"

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number

  @Column("varchar", { length: 50 })
  status!: string

  @Column("varchar", { length: 255 })
  paymentMethod!: string

  @Column("varchar", { length: 255, nullable: true })
  transactionId?: string

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Project)
  project!: Project

  @Column("varchar", { length: 255, nullable: true })
  stripePaymentIntentId?: string

  @CreateDateColumn()
  createdAt!: Date

  @Column("timestamp", { nullable: true })
  completedAt?: Date
}