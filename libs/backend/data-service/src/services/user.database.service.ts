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
}
