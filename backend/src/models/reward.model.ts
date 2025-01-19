import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Project } from "./project.model"

@Entity()
export class Reward {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("varchar", { length: 255 })
  title!: string

  @Column("text")
  description!: string

  @Column("decimal", { precision: 10, scale: 2 })
  minimumAmount!: number

  @Column("int", { default: 0 })
  maxClaim!: number

  @Column("int", { default: 0 })
  claimed!: number

  @ManyToOne(() => Project, project => project.rewards)
  project!: Project

  @Column("boolean", { default: true })
  isActive!: boolean

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date
}