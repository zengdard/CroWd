import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, OneToMany, UpdateDateColumn } from "typeorm"
import { Project } from "./project.model"
import { Contribution } from "./contribution.model"
import { Transaction } from "./transaction.model"
import * as bcrypt from "bcryptjs"

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ type: 'varchar', unique: true })
  username!: string

  @Column("varchar", { length: 255 })
  email!: string

  @Column("varchar", { length: 255 })
  password!: string

  @Column("varchar", { length: 100 })
  firstName!: string

  @Column("varchar", { length: 100 })
  lastName!: string

  @Column("varchar", { length: 20, default: "user" })
  role!: string

  @Column("boolean", { default: false })
  isVerified!: boolean

  @Column("varchar", { length: 255, nullable: true })
  verificationToken?: string

  @Column("varchar", { length: 255, nullable: true })
  resetPasswordToken?: string

  @Column("timestamp", { nullable: true })
  resetPasswordExpires?: Date

  @Column({ type: 'varchar', nullable: true })
  profile_image?: string

  @Column({ default: false })
  email_verified!: boolean

  @Column({ default: false })
  two_factor_enabled!: boolean

  @Column({ type: 'varchar', length: 255, nullable: true })
  two_factor_secret?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  reset_password_token?: string | null

  @Column({ type: 'datetime', nullable: true })
  reset_password_expires?: Date | null

  @Column({ type: 'varchar', length: 255, nullable: true })
  verification_token?: string | null

  @Column({ default: false })
  is_verified!: boolean

  @Column({ type: 'datetime', nullable: true })
  last_login?: Date

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt?: Date

  @OneToMany(() => Project, project => project.creator)
  projects!: Project[]

  @OneToMany(() => Contribution, contribution => contribution.user)
  contributions!: Contribution[]

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions!: Transaction[]

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
  }
}