import {MigrationInterface, QueryRunner} from "typeorm";

export class reservation1651488005709 implements MigrationInterface {
    name = 'reservation1651488005709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`visitors\` ADD \`reservation_id\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`location\` \`location\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`start_at\` \`start_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`end_at\` \`end_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_0285ae0effe011a1255350d7f37\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`image_link\` \`image_link\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`event_id\` \`event_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`visitors\` DROP FOREIGN KEY \`FK_d2892e9645abcb9e1e333e514d0\``);
        await queryRunner.query(`ALTER TABLE \`visitors\` CHANGE \`ticket_link\` \`ticket_link\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`visitors\` CHANGE \`event_id\` \`event_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_0285ae0effe011a1255350d7f37\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`visitors\` ADD CONSTRAINT \`FK_d2892e9645abcb9e1e333e514d0\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`visitors\` DROP FOREIGN KEY \`FK_d2892e9645abcb9e1e333e514d0\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_0285ae0effe011a1255350d7f37\``);
        await queryRunner.query(`ALTER TABLE \`visitors\` CHANGE \`event_id\` \`event_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`visitors\` CHANGE \`ticket_link\` \`ticket_link\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`visitors\` ADD CONSTRAINT \`FK_d2892e9645abcb9e1e333e514d0\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`event_id\` \`event_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`image_link\` \`image_link\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_0285ae0effe011a1255350d7f37\` FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`end_at\` \`end_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`start_at\` \`start_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`events\` CHANGE \`location\` \`location\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`visitors\` DROP COLUMN \`reservation_id\``);
    }

}
