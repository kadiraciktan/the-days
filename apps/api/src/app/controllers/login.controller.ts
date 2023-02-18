import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LoginQuery } from '@the-days/cqrs';

@Controller('login')
export class LoginController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post()
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.queryBus.execute(new LoginQuery(email, password));
  }

  @Get()
  get() {
    return 'get';
  }
}
