import {
    Entity,
    PrimaryColumn,
} from 'typeorm'

@Entity()
export class RelationModel {
    @PrimaryColumn()
    subject!: string
    @PrimaryColumn()
    relation!: string
    @PrimaryColumn()
    object!: string
}
