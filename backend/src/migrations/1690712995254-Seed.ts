import { hashSync } from 'bcrypt';
import config from 'config';
import { DataSource, MigrationInterface, Repository } from 'typeorm';
import { User } from '../app/administration/entity/user.entity';
import { UserSeed } from './seeds/user.seed';
import { Book } from '../app/book/entity/book.entity';
import { BookSeed } from './seeds/book.seed';

export class Seed1690712995254 implements MigrationInterface {
  public async up(): Promise<void> {
    const { type, host, port, username, password, database } = config.ormConfig;
    const dataSource = new DataSource({
      name: 'default',
      type,
      host,
      port,
      username,
      password,
      database,
      entities: [
        __dirname + '/../app/**/entity/*.entity.js',
        __dirname + 'dist/app/**/entity/!*.entity.js',
        __dirname + 'app/**/entity/!*.entity.js',
      ],
    });
    await dataSource.initialize();
    const defaultUserSeed: any = UserSeed;
    const userRepo: Repository<User> = await dataSource.getRepository(User);
    defaultUserSeed.password = await hashSync(defaultUserSeed.password, 10);
    await userRepo.save(defaultUserSeed);

    await dataSource.getRepository(Book).save(BookSeed);
  }

  public async down(): Promise<void> {}
}
