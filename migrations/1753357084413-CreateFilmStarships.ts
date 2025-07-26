import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmStarships1753357084413 implements MigrationInterface {
  private readonly logger = new Logger(CreateFilmStarships1753357084413.name);
  private readonly table = 'film_starships';

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
            name: 'starship_id',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_film_starships_unique',
            columnNames: ['film_id', 'starship_id'],
            isUnique: true,
          },
          {
            name: 'IDX_film_starships_film_id',
            columnNames: ['film_id'],
          },
          {
            name: 'IDX_film_starships_starship_id',
            columnNames: ['starship_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_film_starships_films',
            columnNames: ['film_id'],
            referencedTableName: 'films',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_film_starships_starships',
            columnNames: ['starship_id'],
            referencedTableName: 'spaceships',
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
