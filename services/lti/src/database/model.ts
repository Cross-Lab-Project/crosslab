import { Column, Entity, PrimaryColumn } from 'typeorm';

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
