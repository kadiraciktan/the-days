import { DataSource } from 'typeorm';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'the-days-db-user',
  password: '123456',
  database: 'the-days-db',
  synchronize: false,
  logging: true,
  entities: ['./dist/libs/database/src/entities/**/*.entity.js'],
  migrations: ['./dist/libs/database/src/migrations/**/*.js'],
  subscribers: ['./dist/libs/database/src/subscribers/**/*.subscriber.js'],
});
