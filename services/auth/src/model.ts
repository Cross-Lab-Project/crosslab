import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class ScopeModel {
    @PrimaryColumn()
    name!: string
}

@Entity()
export class RoleModel {
    @PrimaryColumn()
    name!: string
    @ManyToMany(() => UserModel, (user) => user.roles)
    users!: UserModel[]
    @ManyToMany(() => ScopeModel)
    @JoinTable()
    scopes!: ScopeModel[]
}

@Entity()
export class UserModel {
    @PrimaryColumn()
    username!: string
    @Column({ nullable: true })
    password?: string
    @ManyToMany(() => RoleModel, (role) => role.users)
    @JoinTable()
    roles!: RoleModel[]
    @OneToMany(() => TokenModel, (token) => token.user, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    tokens!: TokenModel[]
}

@Entity()
export class TokenModel {
    @PrimaryGeneratedColumn('uuid')
    token!: string
    @Column('datetime', { nullable: true })
    expiresOn?: string
    @ManyToOne(() => UserModel, (user) => user.tokens)
    user!: UserModel
    @ManyToMany(() => ScopeModel)
    @JoinTable()
    scopes!: ScopeModel[]
}

@Entity()
export class KeyModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string
    @Column()
    use!: string
    @Column()
    alg!: string
    @Column('text')
    public_key!: string
    @Column('text')
    private_key!: string
}

@Entity()
export class ActiveKeyModel {
    @PrimaryColumn()
    use!: string
    @ManyToOne(() => KeyModel)
    key!: KeyModel
}
