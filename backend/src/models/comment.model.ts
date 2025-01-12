import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./user.model"
import { Project } from "./project.model"

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("text")
  content!: string

  @ManyToOne(() => User)
  author!: User

  @ManyToOne(() => Project, project => project.comments)
  project!: Project

  @CreateDateColumn()
  created_at!: Date
}