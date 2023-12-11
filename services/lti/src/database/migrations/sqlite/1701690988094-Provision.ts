import { MigrationInterface, QueryRunner } from "typeorm";

export class Provision1701690988094 implements MigrationInterface {
    name = 'Provision1701690988094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "platform_provision_model" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "iss" varchar, "client_id" varchar, "authentication_request_url" varchar, "access_token_url" varchar, "jwks_url" varchar)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "platform_provision_model"`);
    }

}
