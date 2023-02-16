import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from './game.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { postgresDataSource } from '@the-days/database';

@Module({
  imports: [
    GameGateway,
    TypeOrmModule.forRoot(postgresDataSource as DataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService, GameGateway],
})
export class AppModule {}
