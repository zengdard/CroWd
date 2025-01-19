import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.model"

@Entity()
export class SecurityLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  action!: string;

  @Column({ type: "varchar", length: 45 })
  ip_address!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  user_agent?: string;

  @ManyToOne(() => User)
  user!: User;

  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;
}