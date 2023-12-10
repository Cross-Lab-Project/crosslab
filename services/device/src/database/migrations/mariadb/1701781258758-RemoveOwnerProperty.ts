import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveOwnerProperty1701781258758 implements MigrationInterface {
    name = 'RemoveOwnerProperty1701781258758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` DROP COLUMN \`owner\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Device\` ADD \`owner\` varchar(255) NULL`);
    }

}
