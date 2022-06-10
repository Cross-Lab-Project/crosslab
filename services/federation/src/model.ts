import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class InstitutionModel {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string;
    @Column()
    name!: string
    @Column()
    api?: string
    @Column()
    apiToken?: string
    @DeleteDateColumn()
    deletedAt?: Date;
}