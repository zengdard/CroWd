import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { Project } from "./project.model"

@Entity()
export class Reward {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column("text")
  description!: string

  @Column("decimal", { precision: 10, scale: 2 })
  minimum_amount!: number

  @Column({ nullable: true })
  estimated_delivery?: Date

  @ManyToOne(() => Project, project => project.rewards)
  project!: Project

  @CreateDateColumn()
  created_at!: Date
}