import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserInput {
  @IsNotEmpty({
    message: 'Password must not be empty',
  })
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty({
    message: 'Password must not be empty',
  })
  @ApiProperty()
  readonly password: string;
}
