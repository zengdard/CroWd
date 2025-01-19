import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => Project, project => project.comments)
    project!: Project;

    @ManyToOne(() => User)
    user!: User;
}
