import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1696327342762 implements MigrationInterface {
    name = 'Setup1696327342762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "platform_model" ("iss" varchar NOT NULL, "client_id" varchar NOT NULL, "authentication_request_url" varchar NOT NULL, "access_token_url" varchar NOT NULL, "jwks_url" varchar NOT NULL, PRIMARY KEY ("iss", "client_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "platform_model"`);
    }

}
