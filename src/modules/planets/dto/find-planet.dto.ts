import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class FindPlanetDto {
  @IsNotEmpty()
  @IsInt({ message: 'ID must be a valid integer' })
  @Type(() => Number)
  id: number;
}
