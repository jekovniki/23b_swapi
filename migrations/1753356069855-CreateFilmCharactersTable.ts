import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmCharactersTable1753356069855
  implements MigrationInterface
{
  private readonly logger = new Logger(
    CreateFilmCharactersTable1753356069855.name,
  );
  private readonly table = 'film_characters';

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
            name: 'character_id',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_film_characters_unique',
            columnNames: ['film_id', 'character_id'],
            isUnique: true,
          },
          {
            name: 'IDX_film_characters_film_id',
            columnNames: ['film_id'],
          },
          {
            name: 'IDX_film_characters_character_id',
            columnNames: ['character_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_film_characters_films',
            columnNames: ['film_id'],
            referencedTableName: 'films',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_film_characters_characters',
            columnNames: ['character_id'],
            referencedTableName: 'people',
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
