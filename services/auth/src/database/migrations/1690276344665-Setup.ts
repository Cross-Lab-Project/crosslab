import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1690276344665 implements MigrationInterface {
    name = 'Setup1690276344665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`scope_model\` (\`name\` varchar(255) NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_model\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_df2ff801b57740d027c942334f\` (\`name\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_model\` (\`uuid\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, UNIQUE INDEX \`IDX_180abb555e21d4825693f11b94\` (\`username\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`token_model\` (\`token\` varchar(36) NOT NULL, \`expiresOn\` datetime NULL, \`device\` varchar(255) NULL, \`userUuid\` varchar(36) NULL, PRIMARY KEY (\`token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`key_model\` (\`uuid\` varchar(36) NOT NULL, \`use\` varchar(255) NOT NULL, \`alg\` varchar(255) NOT NULL, \`public_key\` text NOT NULL, \`private_key\` text NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`active_key_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`use\` varchar(255) NOT NULL, \`keyUuid\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_model_scopes_scope_model\` (\`roleModelUuid\` varchar(36) NOT NULL, \`scopeModelName\` varchar(255) NOT NULL, INDEX \`IDX_f9bcfb53e221f55fffe76d9566\` (\`roleModelUuid\`), INDEX \`IDX_40ca823e227f9c76cb07cbdbca\` (\`scopeModelName\`), PRIMARY KEY (\`roleModelUuid\`, \`scopeModelName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_model_roles_role_model\` (\`userModelUuid\` varchar(36) NOT NULL, \`roleModelUuid\` varchar(36) NOT NULL, INDEX \`IDX_013a8f388c7121d66a25dc13c1\` (\`userModelUuid\`), INDEX \`IDX_dc7d14d6beccedf8df39de0cb6\` (\`roleModelUuid\`), PRIMARY KEY (\`userModelUuid\`, \`roleModelUuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`token_model_scopes_scope_model\` (\`tokenModelToken\` varchar(36) NOT NULL, \`scopeModelName\` varchar(255) NOT NULL, INDEX \`IDX_eae199f8e25d1860598be961e8\` (\`tokenModelToken\`), INDEX \`IDX_3d94644f4da2c0d34b8e409009\` (\`scopeModelName\`), PRIMARY KEY (\`tokenModelToken\`, \`scopeModelName\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`token_model_roles_role_model\` (\`tokenModelToken\` varchar(36) NOT NULL, \`roleModelUuid\` varchar(36) NOT NULL, INDEX \`IDX_29cb7647f58fc7cf48a87a57f0\` (\`tokenModelToken\`), INDEX \`IDX_8d393cfb87d9f600ea660b16fa\` (\`roleModelUuid\`), PRIMARY KEY (\`tokenModelToken\`, \`roleModelUuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`token_model\` ADD CONSTRAINT \`FK_2bd73082743f5f721e92a3ee109\` FOREIGN KEY (\`userUuid\`) REFERENCES \`user_model\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`active_key_model\` ADD CONSTRAINT \`FK_b22053e2e4c267713fbd8e1f241\` FOREIGN KEY (\`keyUuid\`) REFERENCES \`key_model\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_model_scopes_scope_model\` ADD CONSTRAINT \`FK_f9bcfb53e221f55fffe76d95669\` FOREIGN KEY (\`roleModelUuid\`) REFERENCES \`role_model\`(\`uuid\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_model_scopes_scope_model\` ADD CONSTRAINT \`FK_40ca823e227f9c76cb07cbdbcad\` FOREIGN KEY (\`scopeModelName\`) REFERENCES \`scope_model\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_model_roles_role_model\` ADD CONSTRAINT \`FK_013a8f388c7121d66a25dc13c19\` FOREIGN KEY (\`userModelUuid\`) REFERENCES \`user_model\`(\`uuid\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_model_roles_role_model\` ADD CONSTRAINT \`FK_dc7d14d6beccedf8df39de0cb6e\` FOREIGN KEY (\`roleModelUuid\`) REFERENCES \`role_model\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`token_model_scopes_scope_model\` ADD CONSTRAINT \`FK_eae199f8e25d1860598be961e86\` FOREIGN KEY (\`tokenModelToken\`) REFERENCES \`token_model\`(\`token\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`token_model_scopes_scope_model\` ADD CONSTRAINT \`FK_3d94644f4da2c0d34b8e4090096\` FOREIGN KEY (\`scopeModelName\`) REFERENCES \`scope_model\`(\`name\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`token_model_roles_role_model\` ADD CONSTRAINT \`FK_29cb7647f58fc7cf48a87a57f0a\` FOREIGN KEY (\`tokenModelToken\`) REFERENCES \`token_model\`(\`token\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`token_model_roles_role_model\` ADD CONSTRAINT \`FK_8d393cfb87d9f600ea660b16fa4\` FOREIGN KEY (\`roleModelUuid\`) REFERENCES \`role_model\`(\`uuid\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token_model_roles_role_model\` DROP FOREIGN KEY \`FK_8d393cfb87d9f600ea660b16fa4\``);
        await queryRunner.query(`ALTER TABLE \`token_model_roles_role_model\` DROP FOREIGN KEY \`FK_29cb7647f58fc7cf48a87a57f0a\``);
        await queryRunner.query(`ALTER TABLE \`token_model_scopes_scope_model\` DROP FOREIGN KEY \`FK_3d94644f4da2c0d34b8e4090096\``);
        await queryRunner.query(`ALTER TABLE \`token_model_scopes_scope_model\` DROP FOREIGN KEY \`FK_eae199f8e25d1860598be961e86\``);
        await queryRunner.query(`ALTER TABLE \`user_model_roles_role_model\` DROP FOREIGN KEY \`FK_dc7d14d6beccedf8df39de0cb6e\``);
        await queryRunner.query(`ALTER TABLE \`user_model_roles_role_model\` DROP FOREIGN KEY \`FK_013a8f388c7121d66a25dc13c19\``);
        await queryRunner.query(`ALTER TABLE \`role_model_scopes_scope_model\` DROP FOREIGN KEY \`FK_40ca823e227f9c76cb07cbdbcad\``);
        await queryRunner.query(`ALTER TABLE \`role_model_scopes_scope_model\` DROP FOREIGN KEY \`FK_f9bcfb53e221f55fffe76d95669\``);
        await queryRunner.query(`ALTER TABLE \`active_key_model\` DROP FOREIGN KEY \`FK_b22053e2e4c267713fbd8e1f241\``);
        await queryRunner.query(`ALTER TABLE \`token_model\` DROP FOREIGN KEY \`FK_2bd73082743f5f721e92a3ee109\``);
        await queryRunner.query(`DROP INDEX \`IDX_8d393cfb87d9f600ea660b16fa\` ON \`token_model_roles_role_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_29cb7647f58fc7cf48a87a57f0\` ON \`token_model_roles_role_model\``);
        await queryRunner.query(`DROP TABLE \`token_model_roles_role_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_3d94644f4da2c0d34b8e409009\` ON \`token_model_scopes_scope_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_eae199f8e25d1860598be961e8\` ON \`token_model_scopes_scope_model\``);
        await queryRunner.query(`DROP TABLE \`token_model_scopes_scope_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc7d14d6beccedf8df39de0cb6\` ON \`user_model_roles_role_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_013a8f388c7121d66a25dc13c1\` ON \`user_model_roles_role_model\``);
        await queryRunner.query(`DROP TABLE \`user_model_roles_role_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_40ca823e227f9c76cb07cbdbca\` ON \`role_model_scopes_scope_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_f9bcfb53e221f55fffe76d9566\` ON \`role_model_scopes_scope_model\``);
        await queryRunner.query(`DROP TABLE \`role_model_scopes_scope_model\``);
        await queryRunner.query(`DROP TABLE \`active_key_model\``);
        await queryRunner.query(`DROP TABLE \`key_model\``);
        await queryRunner.query(`DROP TABLE \`token_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_180abb555e21d4825693f11b94\` ON \`user_model\``);
        await queryRunner.query(`DROP TABLE \`user_model\``);
        await queryRunner.query(`DROP INDEX \`IDX_df2ff801b57740d027c942334f\` ON \`role_model\``);
        await queryRunner.query(`DROP TABLE \`role_model\``);
        await queryRunner.query(`DROP TABLE \`scope_model\``);
    }

}
