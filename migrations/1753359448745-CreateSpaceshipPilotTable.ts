import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpaceshipPilotTable1753359448745
  implements MigrationInterface
{
  private readonly logger = new Logger(
    CreateSpaceshipPilotTable1753359448745.name,
  );
  private readonly table = 'spaceship_pilots';
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
            name: 'spaceship_id',
            type: 'int',
          },
          {
            name: 'pilot_id',
            type: 'int',
          },
        ],
        indices: [
          {
            name: 'IDX_spaceship_pilot_unique',
            columnNames: ['spaceship_id', 'pilot_id'],
            isUnique: true,
          },
          {
            name: 'IDX_spaceship_pilot_spaceship_id',
            columnNames: ['spaceship_id'],
          },
          {
            name: 'IDX_spaceship_pilot_pilot_id',
            columnNames: ['pilot_id'],
          },
        ],
        foreignKeys: [
          {
            name: 'FK_spaceship_pilot_spaceship',
            columnNames: ['spaceship_id'],
            referencedTableName: 'spaceships',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_spaceship_pilot_pilot',
            columnNames: ['pilot_id'],
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
