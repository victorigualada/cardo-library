import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTRGRES_USERNAME || 'cardo',
  password: process.env.POSTRGRES_PASSWORD || 'cardo',
  database: process.env.POSTRGRES_DATABASE || 'cardo',
  synchronize: false,
  migrationsTransactionMode: 'each',
  logging: true,
  migrationsRun: true,
  migrations: [
    './dist/migrations/*.js',
  ],
  entities: [
    './dist/**/*.entity.js'
  ]
});