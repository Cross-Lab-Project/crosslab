import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UpdateInformationModel {
    @PrimaryColumn()
    device_id!: string;
    @Column()
    latest_version!: string;
    @Column()
    latest_version_link!: string;
}

export const Entities = [UpdateInformationModel];
