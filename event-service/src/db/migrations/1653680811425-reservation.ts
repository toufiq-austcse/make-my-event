import {MigrationInterface, QueryRunner} from "typeorm";

export class reservation1653680811425 implements MigrationInterface {
    name = 'reservation1653680811425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reservations\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`ref_id\` varchar(255) NOT NULL, \`status\` text NULL, \`name\` text NOT NULL, \`email\` text NOT NULL, \`phone\` text NOT NULL, \`ticket_link\` text NULL, \`event_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_8619da6cc28f574ab6aaa72389c\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_8619da6cc28f574ab6aaa72389c\``);
        await queryRunner.query(`DROP TABLE \`reservations\``);
    }

}
