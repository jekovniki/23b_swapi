import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SwapiEndpoints } from './enums/swapi-sync.enum';
import axios from 'axios';
import https from 'https';
import { JobsService } from './jobs.service';

@Injectable()
export class SwapiSyncService {
  private readonly logger = new Logger(SwapiSyncService.name);
  private readonly httpClient;
  constructor(private readonly jobService: JobsService) {
    this.httpClient = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      timeout: 30000,
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM, {
    timeZone: 'Europe/Sofia',
  })
  async handleCron() {
    this.logger.log('Running daily SWAPI Sync');
    await this.syncSwapiData();
    this.logger.log('Completed daily SWAPI Sync');
  }

  public async syncSwapiData() {
    const existingJobs = await this.jobService.findLast24Hours();
    const fetchedResources = new Set(existingJobs.map((j) => j.resource));

    for (const [resource, url] of Object.entries(SwapiEndpoints)) {
      if (fetchedResources.has(resource)) {
        this.logger.log(`${resource} already fetched. Skipping.`);
        continue;
      }

      this.logger.log(`Fetching resource: ${resource}`);
      try {
        const fullResults = await this.fetchAllPages(url);
        this.logger.log(
          `Fetched and ready to save ${fullResults.length} ${resource} records.`,
        );

        await this.jobService.insert(resource);

        this.logger.log(`Marked job complete for resource: ${resource}`);
      } catch (err) {
        this.logger.error(`Failed to fetch ${resource}: ${err.message}`);
      }
    }
  }

  private async fetchAllPages(url: string): Promise<any[]> {
    const allResults = [];

    while (url) {
      this.logger.log(`Fetching: ${url}`);
      const response = await this.httpClient.get(url);
      const data = response.data;

      if (Array.isArray(data.results)) {
        allResults.push(...data.results);
      }

      url = data.next;
    }

    return allResults;
  }
}
