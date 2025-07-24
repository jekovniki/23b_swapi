import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpaceshipsTable1753331705064 implements MigrationInterface {
  private readonly logger = new Logger(CreateSpaceshipsTable1753331705064.name);
  private readonly table = 'spaceships';
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
            name: 'minCrew',
            type: 'int',
          },
          {
            name: 'maxCrew',
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
            name: 'hyperdrive_rating',
            type: 'float',
          },
          {
            name: 'mglt',
            type: 'int',
          },
          {
            name: 'starship_class',
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
        ],
        indices: [
          {
            name: 'IDX_starships_name',
            columnNames: ['name'],
          },
          {
            name: 'IDX_starships_model',
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
