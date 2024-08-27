import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { RawLtiMessage } from '../lti/message.js';

@Entity()
export class PlatformModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column({nullable: true})
  iss?: string;
  @Column({nullable: true})
  client_id?: string;
  @Column({nullable: true})
  deployment_id?: string;
  @Column({nullable: true})
  authentication_request_url?: string;
  @Column({nullable: true})
  access_token_url?: string;
  @Column({nullable: true})
  jwks_url?: string;
  @Column()
  registrated: boolean = false;
  @Column({nullable: true})
  associated_user?: string
  @CreateDateColumn()
  createdDate!: Date
}

@Entity()
export class LtiMessageModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column()
  nonce!: string;
  @ManyToOne(() => PlatformModel, {eager: true})
  platform!: PlatformModel;
}

@Unique(["resource_link_id", "platform"])
@Entity()
export class LtiResourceModel{
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  resource_link_id!: string

  @ManyToOne(() => PlatformModel, {eager: true})
  platform!: PlatformModel;

  @Column({nullable: true})
  experiment_template_uri?: string

  @Column({nullable: true})
  namesServiceUrl?: string;
}

@Entity()
export class LtiSessionModel{
  @PrimaryColumn()
  id!: string

  @ManyToOne(()=>LtiResourceModel, {eager: true})
  resource!: LtiResourceModel
  
  @Column("simple-json")
  launchMessage!: RawLtiMessage

  @Column({nullable: true})
  experiment_uri?: string

  @CreateDateColumn()
  createdDate!: Date
}

@Entity()
@Unique(["resource", "external_id"])
export class LtiResourceStudent{
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(()=>LtiResourceModel, {eager: false})
  resource!: LtiResourceModel
  
  @Column()
  external_id!: string

  @Column({nullable: true})
  name?: string

  @Column({nullable: true})
  email?: string
}


@Entity()
@Unique(["student", "role"])
export class LtiResourceStudentRoleMapModel{
  @PrimaryGeneratedColumn("uuid")
  id!: string
  
  @ManyToOne(()=>LtiResourceStudent, {eager: false})
  student!: LtiResourceStudent

  @Column()
  role!: string

  @Column()
  device!: string
}

export const Entities = [PlatformModel, LtiMessageModel, LtiResourceModel, LtiSessionModel, LtiResourceStudent, LtiResourceStudentRoleMapModel ];
