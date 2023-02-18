import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginQuery } from '@the-days/cqrs';
import { LoginUserInput } from '../inputs';
import { LoginUserPayload } from '../payloads';

// tag
@Controller('login')
export class LoginController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post()
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    type: LoginUserPayload,
  })
  login(@Body() input: LoginUserInput) {
    const { email, password } = input;
    const user = this.queryBus.execute(new LoginQuery(email, password));
    const model = new LoginUserPayload();
    return model;
  }
}
