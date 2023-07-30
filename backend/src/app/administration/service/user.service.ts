import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) readonly repo: Repository<User>
  ) {
    super(repo);
  }

  async findOneByUsernameAuth(username: string): Promise<User> {
    return await this.repo.findOne({ where: { username }});
  }

  async getUserProfile(user: User): Promise<User> {
    return await this.repo.createQueryBuilder('user')
      .where('user.username = :username', { username: user.username })
      .getOne();
  }

  async createUser(user: User): Promise<User> {
    user.password = await this.cryptPassword(user.password);
    return await this.saveUserAndRemovePassword(user);
  }

  async signUp(user: User): Promise<User> {
    user.password = await this.cryptPassword(user.password);
    return await this.saveUserAndRemovePassword(user);
  }

  async saveUserAndRemovePassword(user: User): Promise<User> {
    const userDto: User = await this.repo.save(user);
    delete userDto.password;
    return userDto;
  }

  async cryptPassword(password: string): Promise<string> {
    // TODO: Use this.configService.saltRounds
    return await bcrypt.hash(password, 10);
  }
}
