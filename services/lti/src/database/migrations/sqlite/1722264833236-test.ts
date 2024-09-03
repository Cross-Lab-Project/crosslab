import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1722264833236 implements MigrationInterface {
    name = 'Test1722264833236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lti_message_model" ("id" varchar PRIMARY KEY NOT NULL, "nonce" varchar NOT NULL, "platformId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_platform_model" ("iss" varchar NOT NULL, "client_id" varchar NOT NULL, "authentication_request_url" varchar NOT NULL, "access_token_url" varchar NOT NULL, "jwks_url" varchar NOT NULL, "id" varchar NOT NULL, "deployment_id" varchar, "registrated" boolean NOT NULL, "registration_token" varchar, "associated_user_token" varchar, "instructors_can_impersonate" boolean NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), PRIMARY KEY ("iss", "client_id", "id"))`);
        await queryRunner.query(`INSERT INTO "temporary_platform_model"("iss", "client_id", "authentication_request_url", "access_token_url", "jwks_url") SELECT "iss", "client_id", "authentication_request_url", "access_token_url", "jwks_url" FROM "platform_model"`);
        await queryRunner.query(`DROP TABLE "platform_model"`);
        await queryRunner.query(`ALTER TABLE "temporary_platform_model" RENAME TO "platform_model"`);
        await queryRunner.query(`CREATE TABLE "temporary_platform_model" ("iss" varchar, "client_id" varchar, "authentication_request_url" varchar, "access_token_url" varchar, "jwks_url" varchar, "id" varchar PRIMARY KEY NOT NULL, "deployment_id" varchar, "registrated" boolean NOT NULL, "registration_token" varchar, "associated_user_token" varchar, "instructors_can_impersonate" boolean NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_platform_model"("iss", "client_id", "authentication_request_url", "access_token_url", "jwks_url", "id", "deployment_id", "registrated", "registration_token", "associated_user_token", "instructors_can_impersonate", "createdDate") SELECT "iss", "client_id", "authentication_request_url", "access_token_url", "jwks_url", "id", "deployment_id", "registrated", "registration_token", "associated_user_token", "instructors_can_impersonate", "createdDate" FROM "platform_model"`);
        await queryRunner.query(`DROP TABLE "platform_model"`);
        await queryRunner.query(`ALTER TABLE "temporary_platform_model" RENAME TO "platform_model"`);
        await queryRunner.query(`CREATE TABLE "temporary_lti_message_model" ("id" varchar PRIMARY KEY NOT NULL, "nonce" varchar NOT NULL, "platformId" varchar, CONSTRAINT "FK_83b08a7ab0a613dd9291669b1b8" FOREIGN KEY ("platformId") REFERENCES "platform_model" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_lti_message_model"("id", "nonce", "platformId") SELECT "id", "nonce", "platformId" FROM "lti_message_model"`);
        await queryRunner.query(`DROP TABLE "lti_message_model"`);
        await queryRunner.query(`ALTER TABLE "temporary_lti_message_model" RENAME TO "lti_message_model"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lti_message_model" RENAME TO "temporary_lti_message_model"`);
        await queryRunner.query(`CREATE TABLE "lti_message_model" ("id" varchar PRIMARY KEY NOT NULL, "nonce" varchar NOT NULL, "platformId" varchar)`);
        await queryRunner.query(`INSERT INTO "lti_message_model"("id", "nonce", "platformId") SELECT "id", "nonce", "platformId" FROM "temporary_lti_message_model"`);
        await queryRunner.query(`DROP TABLE "temporary_lti_message_model"`);
        await queryRunner.query(`ALTER TABLE "platform_model" RENAME TO "temporary_platform_model"`);
        await queryRunner.query(`CREATE TABLE "platform_model" ("iss" varchar NOT NULL, "client_id" varchar NOT NULL, "authentication_request_url" varchar NOT NULL, "access_token_url" varchar NOT NULL, "jwks_url" varchar NOT NULL, "id" varchar NOT NULL, "deployment_id" varchar, "registrated" boolean NOT NULL, "registration_token" varchar, "associated_user_token" varchar, "instructors_can_impersonate" boolean NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), PRIMARY KEY ("iss", "client_id", "id"))`);
        await queryRunner.query(`INSERT INTO "platform_model"("iss", "client_id", "authentication_request_url", "access_token_url", "jwks_url", "id", "deployment_id", "registrated", "registration_token", "associated_user_token", "instructors_can_impersonate", "createdDate") SELECT "iss", "client_id", "authentication_request_url", "access_token_url", "jwks_url", "id", "deployment_id", "registrated", "registration_token", "associated_user_token", "instructors_can_impersonate", "createdDate" FROM "temporary_platform_model"`);
        await queryRunner.query(`DROP TABLE "temporary_platform_model"`);
        await queryRunner.query(`ALTER TABLE "platform_model" RENAME TO "temporary_platform_model"`);
        await queryRunner.query(`CREATE TABLE "platform_model" ("iss" varchar NOT NULL, "client_id" varchar NOT NULL, "authentication_request_url" varchar NOT NULL, "access_token_url" varchar NOT NULL, "jwks_url" varchar NOT NULL, PRIMARY KEY ("iss", "client_id"))`);
        await queryRunner.query(`INSERT INTO "platform_model"("iss", "client_id", "authentication_request_url", "access_token_url", "jwks_url") SELECT "iss", "client_id", "authentication_request_url", "access_token_url", "jwks_url" FROM "temporary_platform_model"`);
        await queryRunner.query(`DROP TABLE "temporary_platform_model"`);
        await queryRunner.query(`DROP TABLE "lti_message_model"`);
    }

}
