import { Module } from '@nestjs/common';
import { CqrsModule as NestJSCqrsModule } from '@nestjs/cqrs';
import { DataServiceModule } from '@the-days/data-service';
import { queryHandlers } from './queries';

@Module({
  imports: [NestJSCqrsModule, DataServiceModule],
  providers: [...queryHandlers],
  exports: [NestJSCqrsModule],
})
export class CqrsModule {}
