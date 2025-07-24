import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmSpeciesTable1753357451338 implements MigrationInterface {
  private readonly logger = new Logger(
    CreateFilmSpeciesTable1753357451338.name,
  );
  private readonly table = 'film_species';

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
            name: 'film_id',
            type: 'int',
          },
          {
            name: 'species_id',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_film_species_unique',
            columnNames: ['film_id', 'species_id'],
            isUnique: true,
          },
          {
            name: 'IDX_film_species_film_id',
            columnNames: ['film_id'],
          },
          {
            name: 'IDX_film_species_species_id',
            columnNames: ['species_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_film_species_films',
            columnNames: ['film_id'],
            referencedTableName: 'films',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_film_species_species',
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
