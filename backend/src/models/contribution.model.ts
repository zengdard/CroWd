import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./user.model"
import { Project } from "./project.model"

@Entity()
export class Contribution {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number

  @ManyToOne(() => User, user => user.contributions)
  user!: User

  @ManyToOne(() => Project, project => project.contributions)
  project!: Project

  @CreateDateColumn()
  created_at!: Date

  @Column("varchar", { default: "pending" })
  status!: string
}