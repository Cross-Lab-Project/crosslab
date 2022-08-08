import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ScopeModel {
    @PrimaryColumn()
    name!: string
}

@Entity()
export class RoleModel {
    @PrimaryColumn()
    name!: string
    @ManyToMany(() => UserModel, user => user.roles)
    @JoinTable()
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
    password!: string
    @ManyToMany(() => RoleModel, role => role.users)
    roles!: RoleModel[]
    @ManyToOne(() => RoleModel)
    currentRole!: RoleModel
    @Column()
    token!: string
    @Column("datetime")
    tokenExpiresOn!: string
}

@Entity()
export class KeyModel {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string
    @Column()
    use!: string
    @Column()
    alg!: string
    @Column("text")
    public_key!: string
    @Column("text")
    private_key!: string
}

@Entity()
export class ActiveKeyModel {
    @PrimaryColumn()
    use!: string
    @ManyToOne(() => KeyModel)
    key!: KeyModel
}