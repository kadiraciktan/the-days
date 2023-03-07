import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@the-days/backend/database';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserDatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOne(options: FindOneOptions<UserEntity>) {
    return await this.userRepository.findOne(options);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async register(email: string, password: string) {
    const existsUser = await this.userRepository.findOne({
      where: { email },
    });

    console.log(existsUser);
    if (existsUser) {
      throw new Error('User already exists');
    }
    return await this.userRepository.save({
      email,
      password,
    });
  }

  async setRefreshToken(userId: string, refreshToken: string) {
    return await this.userRepository.update(userId, {
      refreshToken,
      refreshTokenExpires: new Date(Date.now() + 30 * 1000),
    });
  }

  async checkRefreshTokenIsExpired(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (user.refreshToken !== refreshToken) {
      return false;
    }
    if (user.refreshTokenExpires < new Date()) {
      return false;
    }
    return true;
  }
}
