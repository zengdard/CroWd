import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm"
import { User } from "./user.model"
import { Contribution } from "./contribution.model"
import { Comment } from "./comment.model"
import { Reward } from "./reward.model"
import { Transaction } from "./transaction.model"

@Entity()
export class Project {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ type: 'varchar' })
  title!: string

  @Column({ type: 'text' })
  description!: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  funding_goal!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  current_amount!: number

  @Column()
  end_date!: Date

  @CreateDateColumn()
  created_at!: Date

  @ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE' })
  creator!: User

  @OneToMany(() => Contribution, contribution => contribution.project, { cascade: true })
  contributions!: Contribution[]

  @OneToMany(() => Comment, comment => comment.project)
  comments!: Comment[]

  @OneToMany(() => Reward, reward => reward.project)
  rewards!: Reward[]

  @OneToMany(() => Transaction, transaction => transaction.project)
  transactions!: Transaction[]
}