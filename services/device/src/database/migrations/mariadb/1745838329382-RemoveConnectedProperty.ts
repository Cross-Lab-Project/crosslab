import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveConnectedProperty1745838329382 implements MigrationInterface {
    name = 'RemoveConnectedProperty1745838329382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` DROP COLUMN \`connected\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` ADD \`connected\` tinyint NULL`);
    }

}
