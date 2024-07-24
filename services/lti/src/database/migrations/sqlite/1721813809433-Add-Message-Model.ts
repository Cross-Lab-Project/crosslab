import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMessageModel1721813809433 implements MigrationInterface {
    name = 'AddMessageModel1721813809433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lti_message_model" ("id" varchar PRIMARY KEY NOT NULL, "nonce" varchar NOT NULL, "platformIss" varchar, "platformClientId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_lti_message_model" ("id" varchar PRIMARY KEY NOT NULL, "nonce" varchar NOT NULL, "platformIss" varchar, "platformClientId" varchar, CONSTRAINT "FK_15d2f5786f1e855578f5926956b" FOREIGN KEY ("platformIss", "platformClientId") REFERENCES "platform_model" ("iss", "client_id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_lti_message_model"("id", "nonce", "platformIss", "platformClientId") SELECT "id", "nonce", "platformIss", "platformClientId" FROM "lti_message_model"`);
        await queryRunner.query(`DROP TABLE "lti_message_model"`);
        await queryRunner.query(`ALTER TABLE "temporary_lti_message_model" RENAME TO "lti_message_model"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lti_message_model" RENAME TO "temporary_lti_message_model"`);
        await queryRunner.query(`CREATE TABLE "lti_message_model" ("id" varchar PRIMARY KEY NOT NULL, "nonce" varchar NOT NULL, "platformIss" varchar, "platformClientId" varchar)`);
        await queryRunner.query(`INSERT INTO "lti_message_model"("id", "nonce", "platformIss", "platformClientId") SELECT "id", "nonce", "platformIss", "platformClientId" FROM "temporary_lti_message_model"`);
        await queryRunner.query(`DROP TABLE "temporary_lti_message_model"`);
        await queryRunner.query(`DROP TABLE "lti_message_model"`);
    }

}
