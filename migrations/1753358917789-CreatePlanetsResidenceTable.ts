import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlanetsResidenceTable1753358917789
  implements MigrationInterface
{
  private readonly logger = new Logger(
    CreatePlanetsResidenceTable1753358917789.name,
  );
  private readonly table = 'planet_residents';
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
            name: 'planet_id',
            type: 'int',
          },
          {
            name: 'resident_id',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_planet_residents_unique',
            columnNames: ['planet_id', 'resident_id'],
            isUnique: true,
          },
          {
            name: 'IDX_planet_residents_planet_id',
            columnNames: ['planet_id'],
          },
          {
            name: 'IDX_planet_residents_resident_id',
            columnNames: ['resident_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_planet_residents_planet',
            columnNames: ['planet_id'],
            referencedTableName: 'planets',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_planet_residents_resident',
            columnNames: ['resident_id'],
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
