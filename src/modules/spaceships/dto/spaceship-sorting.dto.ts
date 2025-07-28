import { IsEnum, IsOptional } from 'class-validator';
import { BaseSortingDto } from '../../../shared/dto/base-sorting.dto';
import { SpaceshipsSortableFields } from '../enum/spaceships.enum';

export class SpaceshipsSortingDto extends BaseSortingDto {
  @IsOptional()
  @IsEnum(SpaceshipsSortableFields, {
    message: `Sort field must be one of: ${Object.values(SpaceshipsSortableFields).join(', ')}`,
  })
  sortBy?: SpaceshipsSortableFields;
}
