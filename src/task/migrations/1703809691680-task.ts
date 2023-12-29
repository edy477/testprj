import { MigrationInterface, QueryRunner } from "typeorm";

export class Task1703809691680 implements MigrationInterface {
    name = 'Task1703809691680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_81a02413a5543971189913e8dd\` ON \`url\``);
        await queryRunner.query(`ALTER TABLE \`url\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`url\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`url\` ADD \`title\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`url\` DROP COLUMN \`url_original\``);
        await queryRunner.query(`ALTER TABLE \`url\` ADD \`url_original\` varchar(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`url\` DROP COLUMN \`url_original\``);
        await queryRunner.query(`ALTER TABLE \`url\` ADD \`url_original\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`url\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`url\` ADD \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`url\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_81a02413a5543971189913e8dd\` ON \`url\` (\`url_original\`)`);
    }

}
