import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePeopleTable1753331802910 implements MigrationInterface {
  private readonly logger = new Logger(CreatePeopleTable1753331802910.name);
  private readonly table = 'people';
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
            name: 'height',
            type: 'float',
          },
          {
            name: 'mass',
            type: 'float',
          },
          {
            name: 'hair_color',
            type: 'varchar',
          },
          {
            name: 'skin_color',
            type: 'varchar',
          },
          {
            name: 'eye_color',
            type: 'varchar',
          },
          {
            name: 'birth_year',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['male', 'female', 'hermaphrodite', 'n/a'],
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
          {
            name: 'swapi_url',
            type: 'varchart',
            isNullable: false,
          },
        ],
        indices: [
          {
            name: 'IDX_people_name',
            columnNames: ['name'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_people_homeworld',
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
