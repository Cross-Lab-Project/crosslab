import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UpdateInformationModel {
    @PrimaryColumn()
    device_id!: string
    @Column()
    newest_version!: string
    @Column()
    newest_version_link!: string
}