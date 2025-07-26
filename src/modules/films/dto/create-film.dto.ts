import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  @IsPositive()
  episodeId: number;

  @IsString()
  @IsNotEmpty()
  openingCrawl: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @IsString()
  @IsNotEmpty()
  swapiUrl: string;
}
