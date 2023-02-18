import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseEntities, dataSourceOptions } from '@the-days/database';
import { dataServices } from './data-services';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: databaseEntities,
    }),
    TypeOrmModule.forFeature([...databaseEntities]),
  ],
  providers: [...dataServices],
  exports: [...dataServices],
})
export class DataServiceModule {}
