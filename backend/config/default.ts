import { IConfig } from 'src/app/core/config/types';

const def: IConfig = {
  isDev: true,
  host: 'localhost',
  frontendHost: 'localhost:3001',
  port: 3000,
  version: '0.1.0',
  jwtConfig: {
    secret: 'ZVkusWjxIo8UuJadtlwYiI5zYLFoN4yQaLlUdcgMh49WNNHhxoQH0iViRyAGmLt=',
    signOptions: {
      expiresIn: '168h',
    },
  },
  globalPrefix: 'api',
  rateLimit: {
    windowMs: 15 * 60 * 1000, // minutes
    max: 10000, // limit each IP to max requests per windowMs
  },
  swaggerConfig: {
    swaggerTitle: 'Cardo Library',
    swaggerDescription: 'API Documentation',
    swaggerVersion: '0.0.1',
  },
  saltRounds: 10,
  ormConfig: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'cardo',
    password: 'cardo',
    database: 'cardo',
    synchronize: false,
    migrationsTransactionMode: 'none',
    logging: true,
    migrationsRun: true,
    migrations: [
      '../dist/migrations/*.js',
    ],
    autoLoadEntities: true,
  },
};

module.exports = def;
