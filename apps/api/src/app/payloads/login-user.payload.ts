import { ApiProperty } from '@nestjs/swagger';

export class LoginUserPayload {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  userName: string;
}
