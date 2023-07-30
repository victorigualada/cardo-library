import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1690712425601 implements MigrationInterface {
    name = 'UpdateTables1690712425601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE,
                "updatedAt" TIMESTAMP WITH TIME ZONE,
                "active" boolean NOT NULL DEFAULT true,
                "username" character varying(20) NOT NULL,
                "password" character varying(255) NOT NULL,
                "name" character varying(255) NOT NULL,
                "lastName" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                CONSTRAINT "UQ_f4ca2c1e7c96ae6e8a7cca9df80" UNIQUE ("username", "email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username")
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE,
                "updatedAt" TIMESTAMP WITH TIME ZONE,
                "active" boolean NOT NULL DEFAULT true,
                "title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "year" integer NOT NULL,
                "ISBN" character varying NOT NULL,
                "comment" character varying NOT NULL,
                CONSTRAINT "UQ_7459018069b9c93b1d66ec013a4" UNIQUE ("ISBN"),
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c10a44a29ef231062f22b1b7ac" ON "book" ("title")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7459018069b9c93b1d66ec013a" ON "book" ("ISBN")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7459018069b9c93b1d66ec013a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_c10a44a29ef231062f22b1b7ac"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
