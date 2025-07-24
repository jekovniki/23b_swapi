import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpeciesPeopleTable1753358597140
  implements MigrationInterface
{
  private readonly logger = new Logger(
    CreateSpeciesPeopleTable1753358597140.name,
  );
  private readonly table = 'species_people';
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
            name: 'species_id',
            type: 'int',
          },
          {
            name: 'people_id',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_species_people_unique',
            columnNames: ['people_id', 'species_id'],
            isUnique: true,
          },
          {
            name: 'IDX_species_people_people_id',
            columnNames: ['people_id'],
          },
          {
            name: 'IDX_species_people_species_id',
            columnNames: ['species_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_people_species_people',
            columnNames: ['people_id'],
            referencedTableName: 'people',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_people_species_species',
            columnNames: ['species_id'],
            referencedTableName: 'species',
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
