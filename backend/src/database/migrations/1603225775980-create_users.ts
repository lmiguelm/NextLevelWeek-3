import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1603225775980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table ({
            name: 'users',
            columns: [
                { 
                    name: 'id', 
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true,
                    unsigned: true
                }, 
                {
                    name: 'name', 
                    type: 'varchar',
                },
                {
                    name: 'email', 
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'password', 
                    type: 'varchar',
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
