import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmVehicles1753357208993 implements MigrationInterface {
  private readonly logger = new Logger(CreateFilmVehicles1753357208993.name);
  private readonly table = 'film_vehicles';

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
            name: 'vehicle_id',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_film_vehicles_unique',
            columnNames: ['film_id', 'vehicle_id'],
            isUnique: true,
          },
          {
            name: 'IDX_film_vehicles_film_id',
            columnNames: ['film_id'],
          },
          {
            name: 'IDX_film_vehicles_vehicle_id',
            columnNames: ['vehicle_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_film_vehicles_films',
            columnNames: ['film_id'],
            referencedTableName: 'films',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_film_vehicles_vehicles',
            columnNames: ['vehicle_id'],
            referencedTableName: 'vehicles',
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
