import { Module } from '@nestjs/common';
import { DataServiceModule } from '@the-days/data-service';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { controllers } from './controllers';
import { services } from './services';

@Module({
  imports: [AppGateway, DataServiceModule],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...services],
})
export class AppModule {}
