import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.model"

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  token!: string

  @Column({ type: 'datetime' })
  expires!: Date

  @ManyToOne(() => User)
  user!: User

  @CreateDateColumn()
  created_at!: Date
}