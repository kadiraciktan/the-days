import { MigrationInterface, QueryRunner } from "typeorm";

export class test1676580827369 implements MigrationInterface {
    name = 'test1676580827369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_entity" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_entity" DROP COLUMN "description"`);
    }

}
