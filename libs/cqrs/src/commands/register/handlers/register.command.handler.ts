import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDatabaseService } from '@the-days/data-service';
import { RegisterCommand } from '../impl';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
  implements ICommandHandler<RegisterCommand>
{
  constructor(private readonly userDatabaseService: UserDatabaseService) {}

  async execute(command: RegisterCommand) {
    const { email, password } = command;
    return await this.userDatabaseService.register(email, password);
  }
}
