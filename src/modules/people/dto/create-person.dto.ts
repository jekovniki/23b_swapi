import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Gender } from 'src/shared/enums/basic.enum';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  height: number;

  @IsNumber()
  @IsPositive()
  mass: number;

  @IsString()
  @IsNotEmpty()
  hairColor: string;

  @IsString()
  @IsNotEmpty()
  skinColor: string;

  @IsString()
  @IsNotEmpty()
  eyeColor: string;

  @IsString()
  @IsNotEmpty()
  birthYear: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  homeworldUrl: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  films?: string[];

  @IsString()
  @IsNotEmpty()
  swapiUrl: string;
}
