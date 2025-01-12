import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.model"

@Entity()
export class SecurityLog {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  action!: string

  @Column()
  ip_address!: string

  @Column({ nullable: true })
  user_agent?: string

  @ManyToOne(() => User)
  user!: User

  @CreateDateColumn()
  created_at!: Date
}