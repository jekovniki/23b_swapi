import { Injectable, Logger } from '@nestjs/common';
import { SwapiEndpoints } from './enums/swapi-sync.enum';
import axios from 'axios';
import https from 'https';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { PlanetsService } from '../planets/planets.service';
import { convertUnknownToUndefined } from '../../shared/utils/helpers.util';

@Injectable()
export class SwapiSyncService {
  private readonly logger = new Logger(SwapiSyncService.name);
  private readonly httpClient;
  constructor(
    private readonly filmService: FilmsService,
    private readonly peopleService: PeopleService,
    private readonly planetService: PlanetsService,
  ) {
    this.httpClient = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      timeout: 30000,
    });
  }

  public async syncSwapiData() {
    await this.fetchFilms();
    await this.fetchPlanets();
    await this.fetchPeople();
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

    await this.filmService.insertMany(
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

  private async fetchPlanets() {
    const planets = await this.fetchAllPages(SwapiEndpoints.Planets);

    await this.planetService.insertMany(
      planets.map((planet) => ({
        ...planet,
        rotationPeriod: convertUnknownToUndefined(planet.rotation_period),
        orbitalPeriod: convertUnknownToUndefined(planet.orbital_period),
        surfaceWater: planet.surface_water,
        diameter: convertUnknownToUndefined(planet.diameter),
        swapiUrl: planet.url,
        population: convertUnknownToUndefined(planet.population),
      })),
    );
  }

  private async fetchPeople() {
    const people = await this.fetchAllPages(SwapiEndpoints.People);

    await this.peopleService.insertMany(
      people.map((person) => ({
        ...person,
        homeworldUrl: person.homeworld,
        hairColor: person.hair_color,
        skinColor: person.skin_color,
        eyeColor: person.eye_color,
        birthYear: person.birth_year,
        swapiUrl: person.url,
        mass: convertUnknownToUndefined(person.mass)?.replace(/,/g, ''),
        height: convertUnknownToUndefined(person.height),
      })),
    );
  }
}
