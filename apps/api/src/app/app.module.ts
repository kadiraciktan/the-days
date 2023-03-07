import { Module } from '@nestjs/common';
import { CqrsModule } from '@the-days/backend/cqrs';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { controllers } from './controllers';

@Module({
  imports: [AppGateway, CqrsModule, AuthModule],
  controllers: [...controllers],
  providers: [],
})
export class AppModule {}
