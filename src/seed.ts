import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwapiSyncService } from './modules/jobs/swapi-sync.service';
import { Logger } from '@nestjs/common';

async function seed() {
  const logger = new Logger('Seed');
  logger.log('Starting database seeding...');
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const seedService = app.get(SwapiSyncService);
    await seedService.syncSwapiData();

    logger.log('Database seeding completed successfully!');
  } catch (error) {
    logger.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

seed();
