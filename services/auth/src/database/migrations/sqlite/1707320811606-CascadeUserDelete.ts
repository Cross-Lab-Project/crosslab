import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeUserDelete1707320811606 implements MigrationInterface {
  name = 'CascadeUserDelete1707320811606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_token_model" ("token" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime, "claims" text, "userUuid" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_token_model"("token", "expiresOn", "claims", "userUuid") SELECT "token", "expiresOn", "claims", "userUuid" FROM "token_model"`,
    );
    await queryRunner.query(`DROP TABLE "token_model"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_token_model" RENAME TO "token_model"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_token_model" ("token" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime, "claims" text, "userUuid" varchar, CONSTRAINT "FK_2bd73082743f5f721e92a3ee109" FOREIGN KEY ("userUuid") REFERENCES "user_model" ("uuid") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_token_model"("token", "expiresOn", "claims", "userUuid") SELECT "token", "expiresOn", "claims", "userUuid" FROM "token_model"`,
    );
    await queryRunner.query(`DROP TABLE "token_model"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_token_model" RENAME TO "token_model"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "token_model" RENAME TO "temporary_token_model"`,
    );
    await queryRunner.query(
      `CREATE TABLE "token_model" ("token" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime, "claims" text, "userUuid" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "token_model"("token", "expiresOn", "claims", "userUuid") SELECT "token", "expiresOn", "claims", "userUuid" FROM "temporary_token_model"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_token_model"`);
    await queryRunner.query(
      `ALTER TABLE "token_model" RENAME TO "temporary_token_model"`,
    );
    await queryRunner.query(
      `CREATE TABLE "token_model" ("token" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime, "claims" text, "userUuid" varchar, CONSTRAINT "FK_2bd73082743f5f721e92a3ee109" FOREIGN KEY ("userUuid") REFERENCES "user_model" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "token_model"("token", "expiresOn", "claims", "userUuid") SELECT "token", "expiresOn", "claims", "userUuid" FROM "temporary_token_model"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_token_model"`);
  }
}
