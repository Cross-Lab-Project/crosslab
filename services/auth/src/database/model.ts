import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Index({ unique: true })
  @Column()
  username!: string;

  @Column()
  type!: string;

  @Column()
  isAdmin!: boolean;

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn()
  createdOn!: string;

  @Column('datetime', { nullable: true })
  lastLogin?: string;

  @OneToMany(() => TokenModel, token => token.user)
  tokens!: Promise<TokenModel[]>;
}

@Entity()
export class TokenModel {
  @PrimaryColumn()
  token!: string;

  @Column('datetime', { nullable: true })
  expiresOn?: string;

  @Column('simple-json', { nullable: true })
  claims?: object;

  @ManyToOne(() => UserModel, user => user.tokens, {
    onDelete: 'CASCADE',
  })
  user!: UserModel;
}

export const Entities = [UserModel, TokenModel];
