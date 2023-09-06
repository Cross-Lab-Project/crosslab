import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTemplateModel1693301834737 implements MigrationInterface {
    name = 'AddTemplateModel1693301834737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Template" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "configuration" text NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Template"`);
    }

}
