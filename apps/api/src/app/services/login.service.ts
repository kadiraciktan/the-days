import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  login(): string {
    return 'login service works!';
  }
}
