import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1707385282380 implements MigrationInterface {
    name = 'Setup1707385282380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "relation_model" ("subject" varchar NOT NULL, "relation" varchar NOT NULL, "object" varchar NOT NULL, PRIMARY KEY ("subject", "relation", "object"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "relation_model"`);
    }

}
