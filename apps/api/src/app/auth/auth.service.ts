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
      if (user.refreshTokenExpires < new Date() || !user.refreshToken) {
        const refreshToken = await this.createRefreshToken(user.id);
        await this.usersService.setRefreshToken(user.id, refreshToken);
      }
      return result;
    }
    return null;
  }

  createRefreshToken = async (userId: string) => {
    const refreshToken = this.jwtService.sign({ userId });
    await this.usersService.setRefreshToken(userId, refreshToken);
    return refreshToken;
  };

  getAccessTokenFromRefreshToken = async (
    // userId: string,
    refreshToken: string
  ) => {
    const user = await this.usersService.findOne({
      where: { refreshToken },
    });

    if (user.refreshToken !== refreshToken) {
      return null;
    }

    if (user.refreshTokenExpires < new Date()) {
      return null;
    }

    const lastRefreshToken = await this.createRefreshToken(user.id);
    await this.usersService.setRefreshToken(user.id, lastRefreshToken);

    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: lastRefreshToken,
    };
  };

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
