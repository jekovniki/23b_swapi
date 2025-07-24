import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVehiclePilotTable1753359902194
  implements MigrationInterface
{
  private readonly logger = new Logger(
    CreateVehiclePilotTable1753359902194.name,
  );
  private readonly table = 'vehicle_pilot';
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('UP - START');
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'vehicle_id',
            type: 'int',
          },
          {
            name: 'pilot_id',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_vehicle_pilot_unique',
            columnNames: ['vehicle_id', 'pilot_id'],
            isUnique: true,
          },
          {
            name: 'IDX_vehicle_pilot_vehicle_id',
            columnNames: ['vehicle_id'],
          },
          {
            name: 'IDX_vehicle_pilot_pilot_id',
            columnNames: ['pilot_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_vehicle_pilot_vehicle',
            columnNames: ['vehicle_id'],
            referencedTableName: 'vehicles',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_vehicle_pilot_pilot',
            columnNames: ['pilot_id'],
            referencedTableName: 'people',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
    this.logger.log('UP - COMPLETED');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('DOWN - START');
    await queryRunner.dropTable(this.table);
    this.logger.log('DOWN - COMPLETED');
  }
}
