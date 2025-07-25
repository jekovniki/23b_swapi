import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSpaceshipDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @IsNumber()
  @IsPositive()
  costInCredits: number;

  @IsNumber()
  @IsPositive()
  length: number;

  @IsString()
  @IsNotEmpty()
  maxAtmospheringSpeed: string;

  @IsNumber()
  @IsPositive()
  minCrew: number;

  @IsNumber()
  @IsPositive()
  maxCrew: number;

  @IsNumber()
  @IsPositive()
  passengers: number;

  @IsNumber()
  @IsPositive()
  cargoCapacity: number;

  @IsString()
  @IsNotEmpty()
  consumables: string;

  @IsNumber()
  @IsPositive()
  hyperdriveRating: number;

  @IsNumber()
  @IsPositive()
  mglt: number;

  @IsString()
  @IsNotEmpty()
  starshipClass: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pilots?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  films?: string[];

  @IsString()
  @IsNotEmpty()
  swapiUrl: string;
}
