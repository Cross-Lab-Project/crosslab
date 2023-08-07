import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691157818867 implements MigrationInterface {
    name = 'Migration1691157818867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "platform_model" ("iss" varchar NOT NULL, "client_id" varchar NOT NULL, "authentication_request_url" varchar NOT NULL, "access_token_url" varchar NOT NULL, "jwks_url" varchar NOT NULL, PRIMARY KEY ("iss", "client_id"))`);
        await queryRunner.query(`CREATE TABLE "csrf_token_model" ("token" varchar PRIMARY KEY NOT NULL, "expires_at" datetime NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "csrf_token_model"`);
        await queryRunner.query(`DROP TABLE "platform_model"`);
    }

}
