import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInstitution1704970721137 implements MigrationInterface {
    name = 'UpdateInstitution1704970721137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution_model\` DROP COLUMN \`federatedApi\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution_model\` ADD \`federatedApi\` varchar(255) NOT NULL`);
    }

}
