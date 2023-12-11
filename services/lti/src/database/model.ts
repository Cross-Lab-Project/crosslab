import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlatformModel {
  @PrimaryColumn()
  iss!: string;
  @PrimaryColumn()
  client_id!: string;
  @Column()
  authentication_request_url!: string;
  @Column()
  access_token_url!: string;
  @Column()
  jwks_url!: string;
}

@Entity()
export class PlatformProvisionModel {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({nullable: true})
  iss?: string;
  @Column({nullable: true})
  client_id?: string;
  @Column({nullable: true})
  authentication_request_url?: string;
  @Column({nullable: true})
  access_token_url?: string;
  @Column({nullable: true})
  jwks_url?: string;
}

export const Entities = [PlatformModel, PlatformProvisionModel];
