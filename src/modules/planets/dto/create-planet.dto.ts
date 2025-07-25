import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreatePlanetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  rotationPeriod: number;

  @IsNumber()
  @IsPositive()
  orbitalPeriod: number;

  @IsNumber()
  @IsPositive()
  diameter: number;

  @IsString()
  @IsNotEmpty()
  climate: string;

  @IsString()
  @IsNotEmpty()
  gravity: string;

  @IsString()
  @IsNotEmpty()
  terrain: string;

  @IsString()
  @IsNotEmpty()
  surfaceWater: string;

  @ValidateIf((obj) => obj.population !== null)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  population: number | null;

  @IsString()
  @IsNotEmpty()
  swapiUrl: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  films?: string[];
}
