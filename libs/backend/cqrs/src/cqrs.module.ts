import { Module } from '@nestjs/common';
import { CqrsModule as NestJSCqrsModule } from '@nestjs/cqrs';
import { DataServiceModule } from '@the-days/backend/data-service';
import { commandHandlers } from './commands';
import { queryHandlers } from './queries';

@Module({
  imports: [NestJSCqrsModule, DataServiceModule],
  providers: [...queryHandlers, ...commandHandlers],
  exports: [NestJSCqrsModule],
})
export class CqrsModule {}
