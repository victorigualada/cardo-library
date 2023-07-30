import { IConfig } from 'src/app/core/config/types';

const dev: Partial<IConfig> = {
  port: 3000,
  frontendHost: 'frontend:3000',
  ormConfig: {
    host: 'db',
    migrations: [
      'dist/migrations/*.js',
    ],
  },
};

module.exports = dev;
