import { Module } from '@nestjs/common';
import { CqrsModule } from '@the-days/cqrs';
import { AppGateway } from './app.gateway';
import { controllers } from './controllers';

@Module({
  imports: [AppGateway, CqrsModule],
  controllers: [...controllers],
  providers: [],
})
export class AppModule {}
