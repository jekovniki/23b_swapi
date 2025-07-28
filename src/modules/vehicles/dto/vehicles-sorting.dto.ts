import { IsEnum, IsOptional } from 'class-validator';
import { BaseSortingDto } from 'src/shared/dto/base-sorting.dto';
import { VehiclesSortableFields } from '../enum/vehicles.enum';

export class VehiclesSortingDto extends BaseSortingDto {
  @IsOptional()
  @IsEnum(VehiclesSortableFields, {
    message: `Sort field must be one of: ${Object.values(VehiclesSortableFields).join(', ')}`,
  })
  sortBy?: VehiclesSortableFields;
}
