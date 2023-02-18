import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@the-days/database';
import { Repository } from 'typeorm';

@Injectable()
export class UserDatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }
}
