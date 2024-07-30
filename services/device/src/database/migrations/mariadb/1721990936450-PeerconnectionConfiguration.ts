import { MigrationInterface, QueryRunner } from "typeorm";

export class PeerconnectionConfiguration1721990936450 implements MigrationInterface {
    name = 'PeerconnectionConfiguration1721990936450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Peerconnection\` ADD \`configuration\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Peerconnection\` DROP COLUMN \`configuration\``);
    }

}
