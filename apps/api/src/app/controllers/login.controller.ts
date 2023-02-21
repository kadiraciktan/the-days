import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginQuery, RegisterCommand } from '@the-days/backend/cqrs';
import { LoginUserInput } from '../inputs';
import { LoginUserPayload } from '../payloads';

// tag
@Controller('auth')
export class LoginController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    type: LoginUserPayload,
  })
  async login(@Body() input: LoginUserInput) {
    const { email, password } = input;
    const user = await this.queryBus.execute(new LoginQuery(email, password));
    if (user) {
      const model = new LoginUserPayload();
      (model.accessToken = 'token'),
        (model.refreshToken = 'token'),
        (model.userName = user.name);
      return model;
    }
    return null;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    type: LoginUserPayload,
  })
  async register(@Body() input: LoginUserInput) {
    try {
      const { email, password } = input;
      const user = await this.commandBus.execute(
        new RegisterCommand(email, password)
      );
      if (user) {
        const model = new LoginUserPayload();
        (model.accessToken = 'token'),
          (model.refreshToken = 'token'),
          (model.userName = user.name);
        return model;
      }
      throw new HttpException('User Register Error', HttpStatus.BAD_REQUEST);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
