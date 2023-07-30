import { JwtModuleOptions } from '@nestjs/jwt';import { TypeOrmModuleOptions } from '@nestjs/typeorm';import { ConnectionOptions } from 'typeorm';import { IRateLimit } from './rate-limit.interface';import { ISwaggerConfig } from './swagger.interface';export interface IConfig {  isDev: boolean;  host: string;  frontendHost: string;  port: number;  version: string;  globalPrefix?: string;  swaggerConfig: ISwaggerConfig;  jwtConfig: JwtModuleOptions;  database?: ConnectionOptions;  saltRounds: number;  rateLimit: IRateLimit;  ormConfig: TypeOrmModuleOptions;}