import { Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ConnectionOptions } from 'typeorm';
import { IConfig, ISwaggerConfig } from '../types';
import config from 'config';

@Injectable()
export class ConfigService implements IConfig {

  get(name: string): any {
    return config.get(name);
  }

  get isDev(): boolean {
    return !!this.get('isDev')!;
  }

  get host(): string {
    return this.get('host')!;
  }

  get frontendHost(): string {
    return this.get('frontendHost')!;
  }

  get port(): number {
    return Number(this.get('port')!);
  }

  get version(): string {
    return this.get('version')!;
  }

  get globalPrefix(): string {
    return this.get('globalPrefix');
  }

  get swaggerConfig(): ISwaggerConfig {
    return { ...this.get('swaggerConfig')! };
  }

  get jwtConfig(): JwtModuleOptions {
    return { ...this.get('jwtConfig')! };
  }

  get database(): ConnectionOptions {
    // return a plain object in order to be modificable by typeorm
    return { ...this.get('database')! };
  }

  get saltRounds(): number {
    return this.get('saltRounds');
  }

  get rateLimit(): any {
    return this.get('rateLimit');
  }

  get mail(): any {
    return { ...this.get('mail')! };
  }
}
