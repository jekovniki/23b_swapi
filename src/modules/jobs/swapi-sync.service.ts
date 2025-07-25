import { Injectable, Logger } from '@nestjs/common';
import { SwapiEndpoints } from './enums/swapi-sync.enum';
import axios from 'axios';
import https from 'https';
import { FilmsService } from '../films/films.service';
import { Film } from '../films/entities/film.entity';
import { PeopleService } from '../people/people.service';

@Injectable()
export class SwapiSyncService {
  private readonly logger = new Logger(SwapiSyncService.name);
  private readonly httpClient;
  constructor(
    private readonly filmService: FilmsService,
    private readonly peopleService: PeopleService,
  ) {
    this.httpClient = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      timeout: 30000,
    });
  }

  public async syncSwapiData() {
    const films = await this.fetchFilms();
    const people = await this.fetchPeople(films);
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

  private async fetchFilms() {
    const films = await this.fetchAllPages(SwapiEndpoints.Films);

    return await this.filmService.insertMany(
      films.map((film) => ({
        title: film.title,
        episodeId: film.episode_id,
        openingCrawl: film.opening_crawl,
        director: film.director,
        producer: film.producer,
        releaseDate: film.release_date,
        swapiUrl: film.url,
      })),
    );
  }

  private async fetchPeople(films: Film[]) {
    console.log('films : ', films);
    this.peopleService.findAll();
  }
}
