import { JWK } from 'jose'
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Role, User } from '../generated/types'
import { ActiveKey, Key, Scope, Token } from '../types/types'

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
    users!: Promise<UserModel[]> | UserModel[]
    @ManyToMany(() => ScopeModel, { eager: true })
    @JoinTable()
    scopes!: ScopeModel[]
}

@Entity()
export class UserModel {
    @PrimaryColumn()
    username!: string
    @Column({ nullable: true })
    password?: string
    @ManyToMany(() => RoleModel, (role) => role.users, { eager: true })
    @JoinTable()
    roles!: RoleModel[]
    @OneToMany(() => TokenModel, (token) => token.user, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    tokens!: Promise<TokenModel[]> | TokenModel[]
}

@Entity()
export class TokenModel {
    @PrimaryGeneratedColumn('uuid')
    token!: string
    @Column('datetime', { nullable: true })
    expiresOn?: string
    @Column({ nullable: true })
    device?: string
    @ManyToOne(() => UserModel, (user) => user.tokens, { eager: true })
    user!: UserModel
    @ManyToMany(() => ScopeModel, { eager: true })
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
    @Column('simple-json')
    public_key!: JWK
    @Column('simple-json')
    private_key!: JWK
    @OneToOne(() => UserModel)
    @JoinColumn()
    user?: Promise<UserModel> | UserModel
}

@Entity()
export class ActiveKeyModel {
    @PrimaryColumn()
    use!: string
    @ManyToOne(() => KeyModel, { eager: true })
    key!: KeyModel
}

/**
 * Type containing all the different models.
 */
export type Model = ActiveKeyModel | KeyModel | RoleModel | ScopeModel | TokenModel | UserModel

/**
 * Type mapping a model and ...(TODO)... to their corresponding data type.
 */
export type ModelType<M extends Model, T extends "request" | "response" | "all" = "all"> = M extends ActiveKeyModel 
    ? ActiveKey<T>
    : M extends KeyModel
    ? Key<T>
    : M extends RoleModel
    ? Role<T>
    : M extends ScopeModel
    ? Scope<T>
    : M extends TokenModel
    ? Token<T>
    : M extends UserModel
    ? User<T>
    : never

/**
 * This function returns the name of a model.
 * @param model The model for which to retrieve the name.
 * @returns The name of the provided model.
 */
export function getModelName(model: Model) {
    switch (model) {
        case ActiveKeyModel:
            return "Active Key"
        case KeyModel:
            return "Key"
        case RoleModel:
            return "Role"
        case ScopeModel:
            return "Scope"
        case TokenModel:
            return "Token"
        case UserModel:
            return "User"
        default:
            return "Unknown"
    }
}
