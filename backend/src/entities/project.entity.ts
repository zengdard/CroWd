import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    description!: string

    @Column()
    goal!: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date
}
