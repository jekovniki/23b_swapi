import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSpeciesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  classification: string;

  @IsNotEmpty()
  @IsString()
  designation: string;

  @IsNumber()
  @IsPositive()
  averageHeight: number;

  @IsNotEmpty()
  @IsString()
  skinColors: string;

  @IsString()
  @IsNotEmpty()
  hairColors: string;

  @IsString()
  @IsNotEmpty()
  eyeColors: string;

  @IsString()
  @IsNotEmpty()
  averageLifespan: number;

  @IsString()
  @IsNotEmpty()
  homeworldUrl: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  swapiUrl: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  films?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  people?: string[];
}
