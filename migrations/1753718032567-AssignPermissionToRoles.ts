import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AssignPermissionToRoles1753718032567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Admin permissions
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 1);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 2);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 3);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 4);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 5);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 6);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 7);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 8);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 9);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 10);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 11);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 12);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 13);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 14);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 15);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 16);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 17);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 18);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 19);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 20);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 21);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 22);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 23);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (1, 24);`,
    );

    // Films permissions
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (2, 1);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (2, 2);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (2, 3);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (2, 4);`,
    );

    // People permissions
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (3, 5);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (3, 6);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (3, 7);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (3, 8);`,
    );

    // Planets permissions
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (4, 9);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (4, 10);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (4, 11);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (4, 12);`,
    );

    // Spaceships permissions
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (5, 13);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (5, 14);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (5, 15);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (5, 16);`,
    );

    // Spaceships permissions
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (6, 17);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (6, 18);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (6, 19);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (6, 20);`,
    );

    // Vehicles permissions
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (7, 21);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (7, 22);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (7, 23);`,
    );
    await queryRunner.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES (7, 24);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM role_permission`);
  }
}
