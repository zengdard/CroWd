import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./user.model"
import { Project } from "./project.model"

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  content!: string;

  @ManyToOne(() => User, { nullable: false })
  author!: User;

  @ManyToOne(() => Project, project => project.comments, { nullable: false })
  project!: Project;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;
}