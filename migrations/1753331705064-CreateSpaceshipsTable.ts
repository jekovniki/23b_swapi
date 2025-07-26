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
            isNullable: true,
          },
          {
            name: 'length',
            type: 'float',
            isNullable: true,
          },
          /**
           * This thing is really whacky, you have places where you have number as string and
           * then you have places where it's literally 1000km (starships/11) (also n/a)
           *
           * I call bs on that and I will create the column as varchar.
           */
          {
            name: 'max_atmosphering_speed',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'minCrew',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'maxCrew',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'passengers',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'cargo_capacity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'consumables',
            type: 'varchar',
          },
          {
            name: 'hyperdrive_rating',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'mglt',
            type: 'int',
            isNullable: true,
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
          {
            name: 'swapi_url',
            type: 'varchar',
            isNullable: false,
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
