import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInstitution1704970709847 implements MigrationInterface {
    name = 'UpdateInstitution1704970709847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_institution_model" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "api" varchar NOT NULL, "apiToken" varchar NOT NULL, "homepage" varchar NOT NULL, "deletedAt" datetime)`);
        await queryRunner.query(`INSERT INTO "temporary_institution_model"("uuid", "name", "api", "apiToken", "homepage", "deletedAt") SELECT "uuid", "name", "api", "apiToken", "homepage", "deletedAt" FROM "institution_model"`);
        await queryRunner.query(`DROP TABLE "institution_model"`);
        await queryRunner.query(`ALTER TABLE "temporary_institution_model" RENAME TO "institution_model"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution_model" RENAME TO "temporary_institution_model"`);
        await queryRunner.query(`CREATE TABLE "institution_model" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "api" varchar NOT NULL, "apiToken" varchar NOT NULL, "homepage" varchar NOT NULL, "federatedApi" varchar NOT NULL, "deletedAt" datetime)`);
        await queryRunner.query(`INSERT INTO "institution_model"("uuid", "name", "api", "apiToken", "homepage", "deletedAt") SELECT "uuid", "name", "api", "apiToken", "homepage", "deletedAt" FROM "temporary_institution_model"`);
        await queryRunner.query(`DROP TABLE "temporary_institution_model"`);
    }

}
