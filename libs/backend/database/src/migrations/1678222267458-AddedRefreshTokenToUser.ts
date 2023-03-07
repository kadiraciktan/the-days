import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRefreshTokenToUser1678222267458 implements MigrationInterface {
    name = 'AddedRefreshTokenToUser1678222267458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshTokenExpires" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshTokenExpires"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
