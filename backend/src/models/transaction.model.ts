import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.model";
import { Project } from "./project.model";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column()
  status!: string;

  @Column({ nullable: true })
  payment_method?: string;

  @Column({ nullable: true })
  transaction_id?: string;

  @ManyToOne(() => User, (user: User) => user.transactions)
  user!: User;

  @ManyToOne(() => Project, (project: Project) => project.transactions)
  project!: Project;

  @CreateDateColumn()
  created_at!: Date;
}