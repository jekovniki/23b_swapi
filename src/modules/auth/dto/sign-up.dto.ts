import { IsPositive, IsNumber } from 'class-validator';
import { SignInDto } from './sign-in.dto';

export class SignUpDto extends SignInDto {
  @IsPositive({ message: 'Role Id must be positive number' })
  @IsNumber()
  roleId: number;
}
