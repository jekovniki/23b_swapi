import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVehiclesTable1753331752892 implements MigrationInterface {
  private readonly logger = new Logger(CreateVehiclesTable1753331752892.name);
  private readonly table = 'vehicles';
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'model',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'manufacturer',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cost_in_credits',
            type: 'bigint',
          },
          {
            name: 'length',
            type: 'float',
          },
          {
            name: 'max_atmosphering_speed',
            type: 'int',
          },
          {
            name: 'crew',
            type: 'int',
          },
          {
            name: 'passengers',
            type: 'int',
          },
          {
            name: 'cargo_capacity',
            type: 'bigint',
          },
          {
            name: 'consumables',
            type: 'varchar',
          },
          {
            name: 'vehicle_class',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'swapi_url',
            type: 'varchart',
            isNullable: false,
          },
        ],
        indices: [
          {
            name: 'IDX_vehincle_name',
            columnNames: ['name'],
          },
          {
            name: 'IDX_vehicle_model',
            columnNames: ['model'],
          },
        ],
      }),
    );
    this.logger.log('UP - COMPLETED');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('DOWN - START');
    await queryRunner.dropTable(this.table, true);
    this.logger.log('DOWN - COMPLETED');
  }
}
