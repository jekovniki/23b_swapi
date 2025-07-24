import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpeciesTable1753331874124 implements MigrationInterface {
  private readonly logger = new Logger(CreateSpeciesTable1753331874124.name);
  private readonly table = 'species';
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
            name: 'designation',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'average_lifespan',
            type: 'float',
          },
          {
            name: 'language',
            type: 'varchar',
          },
          {
            name: 'homeworld_id',
            type: 'int',
            isNullable: true,
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
            name: 'IDX_species_name',
            columnNames: ['name'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_species_homeworld',
            columnNames: ['homeworld_id'],
            referencedTableName: 'planets',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
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
