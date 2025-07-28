import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmsTable1753331402305 implements MigrationInterface {
  private readonly logger = new Logger(CreateFilmsTable1753331402305.name);
  private readonly table = 'films';
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
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'opening_crawl',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'episode_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'director',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'producer',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'release_date',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'swapi_url',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
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
            name: 'IDX_films_episode_id',
            columnNames: ['episode_id'],
          },
          {
            name: 'IDX_films_title',
            columnNames: ['title'],
          },
          {
            name: 'IDX_films_director',
            columnNames: ['director'],
          },
          {
            name: 'IDX_films_producer',
            columnNames: ['producer'],
          },
          {
            name: 'IDX_films_release_date',
            columnNames: ['release_date'],
          },
        ],
      }),
      true,
    );
    this.logger.log('UP - COMPLETED');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('DOWN - START');
    await queryRunner.dropTable(this.table, true);
    this.logger.log('DOWN - COMPLETED');
  }
}
