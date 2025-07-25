import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlanetsTable1753331663148 implements MigrationInterface {
  private readonly logger = new Logger(CreatePlanetsTable1753331663148.name);
  private readonly table = 'planets';
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
            name: 'rotation_period',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'orbital_period',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'diameter',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'climate',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'gravity',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'terrain',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'surface_water',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'population',
            type: 'bigint',
            isNullable: false,
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
            name: 'IDX_planets_name',
            columnNames: ['name'],
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
