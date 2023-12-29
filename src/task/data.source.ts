import { DataSource, DataSourceOptions } from 'typeorm';

export const dbdatasource: DataSourceOptions = {
  // TypeORM PostgreSQL DB Drivers
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'aass1122',
    // Database name
    database: 'task',
    // Synchronize database schema with entities 
    synchronize: false,
    // TypeORM Entity
    entities: ['build/task/url.entity.js'],
    // Your Migration path
    migrations: ['build/task/migrations/*.js'],
    migrationsTableName: "task_migrations",

};

const dataSource = new DataSource(dbdatasource)
export default dataSource