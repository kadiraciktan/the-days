import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@the-days/database';

import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { controllers } from './controllers';
import { services } from './services';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AppGateway],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...services],
})
export class AppModule {}
