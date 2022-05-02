import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1651484056058 implements MigrationInterface {
    name = 'initialMigration1651484056058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`events\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`location\` text NULL, \`has_tickets\` tinyint NOT NULL DEFAULT 0, \`total_no_of_seats\` int NOT NULL DEFAULT '0', \`no_of_seats_booked\` int NOT NULL DEFAULT '0', \`description\` text NULL, \`start_at\` datetime NULL, \`end_at\` datetime NULL, \`host_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`body\` text NOT NULL, \`image_link\` text NULL, \`event_id\` int NULL, UNIQUE INDEX \`REL_0285ae0effe011a1255350d7f3\` (\`event_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`visitors\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` int NOT NULL, \`name\` text NOT NULL, \`email\` text NOT NULL, \`phone\` text NOT NULL, \`ticket_link\` text NULL, \`event_id\` int NULL, UNIQUE INDEX \`REL_d2892e9645abcb9e1e333e514d\` (\`event_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_0285ae0effe011a1255350d7f37\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`visitors\` ADD CONSTRAINT \`FK_d2892e9645abcb9e1e333e514d0\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`visitors\` DROP FOREIGN KEY \`FK_d2892e9645abcb9e1e333e514d0\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_0285ae0effe011a1255350d7f37\``);
        await queryRunner.query(`DROP INDEX \`REL_d2892e9645abcb9e1e333e514d\` ON \`visitors\``);
        await queryRunner.query(`DROP TABLE \`visitors\``);
        await queryRunner.query(`DROP INDEX \`REL_0285ae0effe011a1255350d7f3\` ON \`posts\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`events\``);
    }

}
