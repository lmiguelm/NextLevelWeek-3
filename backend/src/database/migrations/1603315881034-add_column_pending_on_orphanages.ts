import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class changeOrphanages1603315453276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orphanages', new TableColumn({
            name: 'pending',
            type: 'bolean',
            default: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orphanages', 'pending');
    }

}
