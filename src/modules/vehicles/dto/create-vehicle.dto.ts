import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateVehicleDto {
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
  crew: number;

  @IsNumber()
  @IsPositive()
  passengers: number;

  @IsString()
  @IsNotEmpty()
  cargoCapacity: string;

  @IsString()
  @IsNotEmpty()
  consumables: string;

  @IsString()
  @IsNotEmpty()
  vehicleClass: string;

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
