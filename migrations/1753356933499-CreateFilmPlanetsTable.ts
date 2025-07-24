import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmPlanetsTable1753356933499 implements MigrationInterface {
  private readonly logger = new Logger(
    CreateFilmPlanetsTable1753356933499.name,
  );
  private readonly table = 'film_planets';
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
            name: 'planet_id',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_film_planets_unique',
            columnNames: ['film_id', 'planet_id'],
            isUnique: true,
          },
          {
            name: 'IDX_film_planets_film_id',
            columnNames: ['film_id'],
          },
          {
            name: 'IDX_film_planets_planet_id',
            columnNames: ['planet_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_film_planets_films',
            columnNames: ['film_id'],
            referencedTableName: 'films',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_film_planets_planets',
            columnNames: ['planet_id'],
            referencedTableName: 'planets',
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
