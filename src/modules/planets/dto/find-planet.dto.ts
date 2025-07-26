import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindPlanetDto {
  @IsNotEmpty()
  @IsNumberString({}, { message: 'ID must be a valid number' })
  @Transform(({ value }) => Number(value))
  id: number;
}
