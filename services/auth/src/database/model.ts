import { JWK as _JWK } from 'jose'
import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Role, User } from '../generated/types'
import { ActiveKey, Key, Scope, Token } from '../types/types'

// this solves an nyc error where branches are wrongly detected
type JWK = _JWK | never

@Entity()
export class ScopeModel {
    @PrimaryColumn()
    name!: string
}

@Entity()
export class RoleModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string

    @Index({ unique: true })
    @Column()
    name!: string

    @ManyToMany(() => UserModel, (user) => user.roles)
    users!: UserModel[]

    @ManyToMany(() => ScopeModel)
    @JoinTable()
    scopes!: ScopeModel[]
}

@Entity()
export class UserModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string

    @Index({ unique: true })
    @Column()
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

    @Column({ nullable: true })
    device?: string

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

    @Column('simple-json')
    public_key!: JWK

    @Column('simple-json')
    private_key!: JWK
}

@Entity()
export class ActiveKeyModel {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @Column()
    use!: string

    @ManyToOne(() => KeyModel)
    key!: KeyModel
}

/**
 * Type containing all the different models.
 */
export type Model =
    | ActiveKeyModel
    | KeyModel
    | RoleModel
    | ScopeModel
    | TokenModel
    | UserModel

/**
 * Type mapping a model to their corresponding data type.
 */
export type ModelType<
    M extends Model,
    T extends 'request' | 'response' | 'all' = 'all'
> = M extends ActiveKeyModel
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
            return 'Active Key'
        case KeyModel:
            return 'Key'
        case RoleModel:
            return 'Role'
        case ScopeModel:
            return 'Scope'
        case TokenModel:
            return 'Token'
        case UserModel:
            return 'User'
        default:
            return 'Unknown'
    }
}
