import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1707385275611 implements MigrationInterface {
    name = 'Setup1707385275611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`relation_model\` (\`subject\` varchar(255) NOT NULL, \`relation\` varchar(255) NOT NULL, \`object\` varchar(255) NOT NULL, PRIMARY KEY (\`subject\`, \`relation\`, \`object\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`relation_model\``);
    }

}
