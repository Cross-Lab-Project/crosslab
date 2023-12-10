import { MigrationInterface, QueryRunner } from "typeorm";

export class ExperimentAdditionalProperties1701942045339 implements MigrationInterface {
    name = 'ExperimentAdditionalProperties1701942045339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Experiment\` ADD \`additionalAttributes\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Experiment\` DROP COLUMN \`additionalAttributes\``);
    }

}
