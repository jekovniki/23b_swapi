import { IsEnum, IsOptional } from 'class-validator';
import { BaseSortingDto } from 'src/shared/dto/base-sorting.dto';
import { PlanetsSortableFields } from '../enum/planets.enum';

export class PlanetsSortingDto extends BaseSortingDto {
  @IsOptional()
  @IsEnum(PlanetsSortableFields, {
    message: `Sort field must be one of: ${Object.values(PlanetsSortableFields).join(', ')}`,
  })
  sortBy?: PlanetsSortableFields;
}
