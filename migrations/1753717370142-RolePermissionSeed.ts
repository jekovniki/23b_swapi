import { MigrationInterface, QueryRunner } from 'typeorm';
import { Logger } from '@nestjs/common';

/**
 * I know that most likely it's not optimal to have data in the migration
 * but for the sake of roles and permissions I'm ok with passing that
 */
export class RolePermissionSeed1753717370142 implements MigrationInterface {
  private readonly logger = new Logger(RolePermissionSeed1753717370142.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('UP - START');

    // add roles
    await queryRunner.query(
      `INSERT INTO role (name) VALUES ('Administrator');`,
    );
    await queryRunner.query(`INSERT INTO role (name) VALUES ('Films');`);
    await queryRunner.query(`INSERT INTO role (name) VALUES ('People');`);
    await queryRunner.query(`INSERT INTO role (name) VALUES ('Planets');`);
    await queryRunner.query(`INSERT INTO role (name) VALUES ('Spaceships');`);
    await queryRunner.query(`INSERT INTO role (name) VALUES ('Species');`);
    await queryRunner.query(`INSERT INTO role (name) VALUES ('Vehicles');`);

    // Films permissions
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('films', 'READ');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('films', 'UPDATE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('films', 'DELETE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('films', 'CREATE');`,
    );

    // People permissions
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('people', 'READ');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('people', 'UPDATE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('people', 'DELETE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('people', 'CREATE');`,
    );

    // Planets permissions
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('planets', 'READ');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('planets', 'UPDATE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('planets', 'DELETE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('planets', 'CREATE');`,
    );

    // spaceships permissions
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('spaceships', 'READ');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('spaceships', 'UPDATE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('spaceships', 'DELETE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('spaceships', 'CREATE');`,
    );

    // Species permissions
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('species', 'READ');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('species', 'UPDATE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('species', 'DELETE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('species', 'CREATE');`,
    );

    // Vehicles permissions
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('vehicles', 'READ');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('vehicles', 'UPDATE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('vehicles', 'DELETE');`,
    );
    await queryRunner.query(
      `INSERT INTO permission (feature, permission) VALUES ('vehicles', 'CREATE');`,
    );

    this.logger.log('UP - COMPLETED');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('DOWN - START');
    await queryRunner.query(`DELETE FROM permission`);
    await queryRunner.query(`DELETE FROM role WHERE name = 'Administrator'`);
    await queryRunner.query(`DELETE FROM role WHERE name = 'Employee'`);
    this.logger.log('DOWN - COMPLETED');
  }
}
