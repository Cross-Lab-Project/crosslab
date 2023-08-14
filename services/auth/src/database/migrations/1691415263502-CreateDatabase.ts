import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1691415263502 implements MigrationInterface {
  name = "CreateDatabase1691415263502";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_model" ("uuid" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "password" varchar)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_180abb555e21d4825693f11b94" ON "user_model" ("username") `,
    );
    await queryRunner.query(
      `CREATE TABLE "token_model" ("token" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime, "device" varchar, "userUuid" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "key_model" ("uuid" varchar PRIMARY KEY NOT NULL, "use" varchar NOT NULL, "alg" varchar NOT NULL, "public_key" text NOT NULL, "private_key" text NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "active_key_model" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "use" varchar NOT NULL, "keyUuid" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_token_model" ("token" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime, "device" varchar, "userUuid" varchar, CONSTRAINT "FK_2bd73082743f5f721e92a3ee109" FOREIGN KEY ("userUuid") REFERENCES "user_model" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_token_model"("token", "expiresOn", "device", "userUuid") SELECT "token", "expiresOn", "device", "userUuid" FROM "token_model"`,
    );
    await queryRunner.query(`DROP TABLE "token_model"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_token_model" RENAME TO "token_model"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_active_key_model" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "use" varchar NOT NULL, "keyUuid" varchar, CONSTRAINT "FK_b22053e2e4c267713fbd8e1f241" FOREIGN KEY ("keyUuid") REFERENCES "key_model" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_active_key_model"("id", "use", "keyUuid") SELECT "id", "use", "keyUuid" FROM "active_key_model"`,
    );
    await queryRunner.query(`DROP TABLE "active_key_model"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_active_key_model" RENAME TO "active_key_model"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "active_key_model" RENAME TO "temporary_active_key_model"`,
    );
    await queryRunner.query(
      `CREATE TABLE "active_key_model" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "use" varchar NOT NULL, "keyUuid" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "active_key_model"("id", "use", "keyUuid") SELECT "id", "use", "keyUuid" FROM "temporary_active_key_model"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_active_key_model"`);
    await queryRunner.query(
      `ALTER TABLE "token_model" RENAME TO "temporary_token_model"`,
    );
    await queryRunner.query(
      `CREATE TABLE "token_model" ("token" varchar PRIMARY KEY NOT NULL, "expiresOn" datetime, "device" varchar, "userUuid" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "token_model"("token", "expiresOn", "device", "userUuid") SELECT "token", "expiresOn", "device", "userUuid" FROM "temporary_token_model"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_token_model"`);
    await queryRunner.query(`DROP TABLE "active_key_model"`);
    await queryRunner.query(`DROP TABLE "key_model"`);
    await queryRunner.query(`DROP TABLE "token_model"`);
    await queryRunner.query(`DROP INDEX "IDX_180abb555e21d4825693f11b94"`);
    await queryRunner.query(`DROP TABLE "user_model"`);
  }
}
