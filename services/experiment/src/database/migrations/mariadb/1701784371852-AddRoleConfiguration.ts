import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleConfiguration1701784371852 implements MigrationInterface {
    name = 'AddRoleConfiguration1701784371852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Role\` ADD \`configuration\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Role\` DROP COLUMN \`configuration\``);
    }

}
