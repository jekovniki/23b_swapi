import { IsEnum, IsOptional } from 'class-validator';
import { BaseSortingDto } from '../../../shared/dto/base-sorting.dto';
import { PeopleSortableFields } from '../enum/people.enum';

export class PeopleSortingDto extends BaseSortingDto {
  @IsOptional()
  @IsEnum(PeopleSortableFields, {
    message: `Sort field must be one of: ${Object.values(PeopleSortableFields).join(', ')}`,
  })
  sortBy?: PeopleSortableFields;
}
