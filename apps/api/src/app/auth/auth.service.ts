import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserDatabaseService } from '@the-days/backend/data-service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserDatabaseService,
    private jwtService: JwtService
  ) {}

  createRefreshToken = async (userId: string) => {
    const refreshToken = this.jwtService.sign({ userId });
    await this.usersService.setRefreshToken(userId, refreshToken);
    return refreshToken;
  };

  createAccessToken = async (id: string, name: string) => {
    const payload = { username: name, sub: id };
    return this.jwtService.sign(payload);
  };

  getAccessTokenFromRefreshToken = async (
    // userId: string,
    refreshToken: string
  ) => {
    const user = await this.usersService.findOne({
      where: { refreshToken },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }

    if (user.refreshTokenExpires < new Date()) {
      throw new UnauthorizedException();
    }

    const lastRefreshToken = await this.createRefreshToken(user.id);
    await this.usersService.setRefreshToken(user.id, lastRefreshToken);

    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: lastRefreshToken,
    };
  };
}
