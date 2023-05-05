import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',  // '172.17.0.1', //=>  docker bridge ip address
  port: 5432,
  username: 'the-days-db-user',
  password: '123456',
  database: 'the-days-db',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/libs/backend/database/src/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
