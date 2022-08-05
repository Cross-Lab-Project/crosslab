import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UpdateInformationModel {
    @PrimaryColumn()
    mac_address!: string
    @Column()
    newest_version!: string
    @Column()
    newest_version_link!: string
}