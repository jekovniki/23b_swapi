import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from '../enum/basic.enum';

export class BaseSortingDto {
  @IsOptional()
  @IsString({ message: 'Sort field must be a string' })
  sortBy?: string;

  @IsOptional()
  @IsEnum(SortOrder, { message: 'Sort order must be either "asc" or "desc"' })
  order?: SortOrder;
}
