import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwapiService } from './modules/jobs/swapi.service';
import { Logger } from '@nestjs/common';

async function seed() {
  const logger = new Logger('Seed');
  logger.log('Starting database seeding...');
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const seedService = app.get(SwapiService);
    await seedService.sync();

    logger.log('Database seeding completed successfully!');
  } catch (error) {
    logger.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

seed();
