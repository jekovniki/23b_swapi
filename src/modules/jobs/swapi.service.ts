import { Injectable, Logger } from '@nestjs/common';
import { SwapiEndpoints } from './enums/swapi-sync.enum';
import axios from 'axios';
import https from 'https';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { PlanetsService } from '../planets/planets.service';
import {
  convertUnknownToUndefined,
  getRangeValue,
} from '../../shared/utils/helpers.util';
import { SpeciesService } from '../species/species.service';
import { SpaceshipsService } from '../spaceships/spaceships.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SwapiService {
  private readonly logger = new Logger(SwapiService.name);
  private readonly httpClient;
  constructor(
    private readonly filmService: FilmsService,
    private readonly peopleService: PeopleService,
    private readonly planetService: PlanetsService,
    private readonly speciesService: SpeciesService,
    private readonly spaceshipService: SpaceshipsService,
    private readonly vehicleService: VehiclesService,
  ) {
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
    try {
      this.logger.log('Starting scheduled SWAPI data sync...');
      await this.sync();
    } catch (error) {
      this.logger.error('Error during scheduled SWAPI data sync: ', error);
    }
  }

  public async sync() {
    await this.fetchFilms();
    await this.fetchPlanets();
    await this.fetchPeople();
    await this.fetchSpecies();
    await this.fetchStarships();
    await this.fetchVehicles();
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

    await this.filmService.upsert(
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

    await this.planetService.upsert(
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

    await this.peopleService.upsert(
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

  private async fetchSpecies() {
    const species = await this.fetchAllPages(SwapiEndpoints.Species);

    await this.speciesService.upsert(
      species.map((type) => ({
        ...type,
        homeworldUrl: type.homeworld,
        averageHeight: type.average_height,
        skinColors: type.skin_colors,
        hairColors: type.hair_colors,
        eyeColors: type.eye_colors,
        averageLifespan: type.average_lifespan,
        swapiUrl: type.url,
      })),
    );
  }

  private async fetchStarships() {
    const spaceships = await this.fetchAllPages(SwapiEndpoints.Starships);

    await this.spaceshipService.upsert(
      spaceships.map((spaceship) => ({
        ...spaceship,
        costInCredits: convertUnknownToUndefined(spaceship.cost_in_credits),
        length: convertUnknownToUndefined(spaceship.length)?.replace(/,/g, ''),
        maxAtmospheringSpeed: spaceship.max_atmosphering_speed,
        minCrew:
          spaceship.crew !== 'unknown'
            ? getRangeValue(spaceship.crew?.replace(/,/g, ''), 'min')
            : null,
        maxCrew:
          spaceship.crew !== 'unknown'
            ? getRangeValue(spaceship.crew?.replace(/,/g, ''), 'max')
            : null,
        cargoCapacity: spaceship.cargo_capacity,
        passengers:
          spaceship.passengers !== 'n/a'
            ? convertUnknownToUndefined(spaceship.passengers?.replace(/,/g, ''))
            : null,
        hyperdriveRating: convertUnknownToUndefined(
          spaceship.hyperdrive_rating,
        ),
        mglt: convertUnknownToUndefined(spaceship.mglt),
        starshipClass: spaceship.starship_class,
        swapiUrl: spaceship.url,
      })),
    );
  }

  private async fetchVehicles() {
    const spaceships = await this.fetchAllPages(SwapiEndpoints.Vehicles);

    await this.vehicleService.upsert(
      spaceships.map((spaceship) => ({
        ...spaceship,
        costInCredits: convertUnknownToUndefined(spaceship.cost_in_credits),
        length: convertUnknownToUndefined(spaceship.length)?.replace(/,/g, ''),
        maxAtmospheringSpeed: spaceship.max_atmosphering_speed,
        crew: spaceship.crew?.replace(/,/g, ''),
        cargoCapacity: spaceship.cargo_capacity,
        passengers:
          spaceship.passengers !== 'n/a'
            ? convertUnknownToUndefined(spaceship.passengers?.replace(/,/g, ''))
            : null,
        vehicleClass: spaceship.vehicle_class,
        swapiUrl: spaceship.url,
      })),
    );
  }
}
