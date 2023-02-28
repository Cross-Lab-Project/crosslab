import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class PeerconnectionStatus1670225182011 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("Peerconnection", new TableColumn({
            name: "status",
            type: "text",
            enum: ['waiting-for-devices', 'connected', 'failed', 'closed'],
            isNullable: true
        }))

        queryRunner.query(
            `UPDATE Peerconnection SET status='closed'`
        )

        await queryRunner.changeColumn("Peerconnection", "status", new TableColumn({
            name: "status",
            type: "text",
            enum: ['waiting-for-devices', 'connected', 'failed', 'closed'],
            isNullable: false
        }))
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("Peerconnection", "status")
    }
}
