import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@the-days/database';
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
}
