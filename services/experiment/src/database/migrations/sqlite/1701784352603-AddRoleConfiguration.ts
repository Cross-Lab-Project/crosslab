import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleConfiguration1701784352603 implements MigrationInterface {
    name = 'AddRoleConfiguration1701784352603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_Role" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "experimentUuid" varchar, "configuration" text, CONSTRAINT "FK_b38fd4254dd804639ca683339d6" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Role"("uuid", "name", "description", "experimentUuid") SELECT "uuid", "name", "description", "experimentUuid" FROM "Role"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`ALTER TABLE "temporary_Role" RENAME TO "Role"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Role" RENAME TO "temporary_Role"`);
        await queryRunner.query(`CREATE TABLE "Role" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text, "experimentUuid" varchar, CONSTRAINT "FK_b38fd4254dd804639ca683339d6" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment" ("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "Role"("uuid", "name", "description", "experimentUuid") SELECT "uuid", "name", "description", "experimentUuid" FROM "temporary_Role"`);
        await queryRunner.query(`DROP TABLE "temporary_Role"`);
    }

}
