import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OneToMany } from "typeorm";
import { Comment } from "./Comment";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Comment, comment => comment.project)
    comments!: Comment[];
}
