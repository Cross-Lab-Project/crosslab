import { MigrationInterface, QueryRunner } from "typeorm";

export class PeerconnectionConfiguration1721990948580 implements MigrationInterface {
    name = 'PeerconnectionConfiguration1721990948580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_Peerconnection" ("uuid" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "status" varchar NOT NULL, "deviceA" text NOT NULL, "deviceB" text NOT NULL, "deletedAt" datetime, "configuration" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_Peerconnection"("uuid", "type", "status", "deviceA", "deviceB", "deletedAt") SELECT "uuid", "type", "status", "deviceA", "deviceB", "deletedAt" FROM "Peerconnection"`);
        await queryRunner.query(`DROP TABLE "Peerconnection"`);
        await queryRunner.query(`ALTER TABLE "temporary_Peerconnection" RENAME TO "Peerconnection"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Peerconnection" RENAME TO "temporary_Peerconnection"`);
        await queryRunner.query(`CREATE TABLE "Peerconnection" ("uuid" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "status" varchar NOT NULL, "deviceA" text NOT NULL, "deviceB" text NOT NULL, "deletedAt" datetime)`);
        await queryRunner.query(`INSERT INTO "Peerconnection"("uuid", "type", "status", "deviceA", "deviceB", "deletedAt") SELECT "uuid", "type", "status", "deviceA", "deviceB", "deletedAt" FROM "temporary_Peerconnection"`);
        await queryRunner.query(`DROP TABLE "temporary_Peerconnection"`);
    }

}
