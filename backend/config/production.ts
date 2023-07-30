import { IConfig } from 'src/app/core/config/types';

const prod: Partial<IConfig> = {
  isDev: false,
  host: 'cardo-library.com',
  frontendHost: 'frontend:3000',
  port: 3000,
  version: '0.0.1',
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '24h',
    },
  },
  ormConfig: {
    host: 'db',
    synchronize: false,
    logging: false,
    migrationsRun: true,
    migrations: [
      'dist/migrations/*.js',
    ],
    autoLoadEntities: true,
  },
};

module.exports = prod;
