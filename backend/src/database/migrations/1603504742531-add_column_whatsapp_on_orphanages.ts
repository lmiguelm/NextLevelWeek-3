import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnWhatsappOnOrphanages1603504742531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orphanages', new TableColumn({
            name: 'whatsapp',
            type: 'number',
            isNullable: true,
            default: null,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orphanages', 'whatsapp');
    }

}
