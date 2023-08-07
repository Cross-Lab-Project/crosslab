import {
    Column,
    Entity,
    PrimaryColumn
} from 'typeorm'


/*@Entity()
export class KeyModel {
    @PrimaryColumn('uuid')
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
}*/

@Entity()
export class PlatformModel {
    @PrimaryColumn()
    iss!: string
    @PrimaryColumn()
    client_id!: string
    @Column()
    authentication_request_url!: string
    @Column()
    access_token_url!: string
    @Column()
    jwks_url!: string
}

@Entity()
export class CSRFTokenModel {
    @PrimaryColumn()
    token!: string
    @Column()
    expires_at!: Date
}