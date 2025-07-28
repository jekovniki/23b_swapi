import { IsEnum, IsOptional } from 'class-validator';
import { BaseSortingDto } from 'src/shared/dto/base-sorting.dto';
import { SpeciesSortableFields } from '../enum/species.enum';

export class SpeciesSortingDto extends BaseSortingDto {
  @IsOptional()
  @IsEnum(SpeciesSortableFields, {
    message: `Sort field must be one of: ${Object.values(SpeciesSortableFields).join(', ')}`,
  })
  sortBy?: SpeciesSortableFields;
}
