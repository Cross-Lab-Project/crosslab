import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExperimentAdditionalProperties1701792854718 implements MigrationInterface {
  name = 'ExperimentAdditionalProperties1701792854718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Experiment\` ADD \`additionalAttributes\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Experiment\` CHANGE \`bookingStart\` \`bookingStart\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Experiment\` CHANGE \`bookingEnd\` \`bookingEnd\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`ServiceConfiguration\` CHANGE \`configuration\` \`configuration\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ServiceConfiguration\` CHANGE \`configuration\` \`configuration\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Experiment\` CHANGE \`bookingEnd\` \`bookingEnd\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Experiment\` CHANGE \`bookingStart\` \`bookingStart\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Experiment\` DROP COLUMN \`additionalAttributes\``,
    );
  }
}
