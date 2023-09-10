import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullables1693838359426 implements MigrationInterface {
  name = 'AddNullables1693838359426';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
