import { Injectable } from '@nestjs/common';
import { UserDatabaseService } from '@the-days/data-service';

@Injectable()
export class LoginService {
  constructor(private readonly userDataService: UserDatabaseService) {}

  async login() {
    return await this.userDataService.findAll();
  }
}
