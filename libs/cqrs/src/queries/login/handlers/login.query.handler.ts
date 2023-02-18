import { QueryHandler } from '@nestjs/cqrs';
import { UserDatabaseService } from '@the-days/data-service';
import { LoginQuery } from '../impl';

@QueryHandler(LoginQuery)
export class LoginQueryHandler {
  constructor(private readonly userDatabaseService: UserDatabaseService) {}

  async execute(query: LoginQuery) {
    const { email, password } = query;
    return await this.userDatabaseService.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  }
}
