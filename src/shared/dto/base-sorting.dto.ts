import { IsEnum, IsOptional } from 'class-validator';
import { SortOrder } from '../enum/basic.enum';

export class BaseSortingDto {
  @IsOptional()
  @IsEnum(SortOrder, { message: 'Sort order must be either "asc" or "desc"' })
  order?: SortOrder;
}
