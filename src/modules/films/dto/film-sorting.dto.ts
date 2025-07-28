import { IsEnum, IsOptional } from 'class-validator';
import { BaseSortingDto } from '../../../shared/dto/base-sorting.dto';
import { FilmSortableFields } from '../enum/film.enum';

export class FilmSortingDto extends BaseSortingDto {
  @IsOptional()
  @IsEnum(FilmSortableFields, {
    message: `Sort field must be one of: ${Object.values(FilmSortableFields).join(', ')}`,
  })
  sortBy?: FilmSortableFields;
}
