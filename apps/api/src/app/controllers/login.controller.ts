import { Controller, Get, Post } from '@nestjs/common';
import { LoginService } from '../services';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login() {
    return 'login';
  }

  @Get()
  get() {
    return this.loginService.login();
  }
}
