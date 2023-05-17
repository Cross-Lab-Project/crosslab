import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupMigration1684337775585 implements MigrationInterface {
    name = 'SetupMigration1684337775585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "institution_model" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "api" varchar NOT NULL, "apiToken" varchar NOT NULL, "homepage" varchar NOT NULL, "federatedApi" varchar NOT NULL, "deletedAt" datetime)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "institution_model"`);
    }

}
