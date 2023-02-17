import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@the-days/database';

import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AppGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
