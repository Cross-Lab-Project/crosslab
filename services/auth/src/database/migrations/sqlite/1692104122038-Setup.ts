import {MigrationInterface, QueryRunner} from "typeorm";

export class Setup1692104122038 implements MigrationInterface {
  name = "Setup1692104122038";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_model" ("uuid" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "type" varchar NOT NULL, "password" varchar, "createdOn" datetime NOT NULL DEFAULT (datetime('now')), "lastLogin" datetime)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_180abb555e21d4825693f11b94" ON "user_model" ("username") `,
    );
    await queryRunner.query(
      `CREATE TABLE "token_model" ("token" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime, "claims" text, "userUuid" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_token_model" ("token" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime, "claims" text, "userUuid" varchar, CONSTRAINT "FK_2bd73082743f5f721e92a3ee109" FOREIGN KEY ("userUuid") REFERENCES "user_model" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
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
    await queryRunner.query(`DROP TABLE "token_model"`);
    await queryRunner.query(`DROP INDEX "IDX_180abb555e21d4825693f11b94"`);
    await queryRunner.query(`DROP TABLE "user_model"`);
  }
}
