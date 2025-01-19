import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user.model"
import { Contribution } from "./contribution.model"
import { Comment } from "./comment.model"
import { Reward } from "./reward.model"
import { Transaction } from "./transaction.model"

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("varchar", { length: 255 })
  title!: string

  @Column("text")
  description!: string

  @Column("decimal", { precision: 10, scale: 2 })
  goal!: number

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  currentAmount!: number

  @Column("timestamp")
  start_date!: Date

  @Column("timestamp")
  end_date!: Date

  @Column("varchar", { length: 50, default: 'pending' })
  status!: string

  @Column("varchar", { length: 255, nullable: true })
  imageUrl?: string

  @Column("text", { nullable: true })
  shortDescription?: string

  @Column("varchar", { length: 50, nullable: true })
  category?: string

  @Column("text", { nullable: true })
  risks?: string

  @Column("boolean", { default: true })
  isActive!: boolean

  @ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE' })
  creator!: User

  @OneToMany(() => Contribution, contribution => contribution.project, { cascade: true })
  contributions!: Contribution[]

  @OneToMany(() => Comment, comment => comment.project, { cascade: true })
  comments!: Comment[]

  @OneToMany(() => Reward, reward => reward.project, { cascade: true })
  rewards!: Reward[]

  @OneToMany(() => Transaction, transaction => transaction.project, { cascade: true })
  transactions!: Transaction[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}