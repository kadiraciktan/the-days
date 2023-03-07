import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserDatabaseService } from '@the-days/backend/data-service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserDatabaseService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({
      where: { email },
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  getRefreshToken = async (userId: string) => {
    const refreshToken = this.jwtService.sign({ userId });

    return refreshToken;
  };

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
