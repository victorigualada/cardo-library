import { Injectable } from '@nestjs/common';
import { Book } from '../entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {SearchParams} from '../interfaces/search-params.interface';

@Injectable()
export class BookService extends TypeOrmCrudService<Book> {

  constructor(
    @InjectRepository(Book) readonly repo: Repository<Book>,
  ) {
    super(repo);
  }

  async listBooks(): Promise<Book[]> {
    return await this.repo.find();
  }

  async getBook(id: number): Promise<Book> {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, item: Book): Promise<Book> {
    return (await this.repo.update(id, item)).raw[0];
  }

  async save(item: Book): Promise<Book> {
    const newItem = this.repo.create({ ...item });
    return await this.repo.save(newItem);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }

  async searchBooks(query: SearchParams): Promise<Book[]> {
    return this.repo.createQueryBuilder('b')
      .select()
      .where('b.title ILIKE :title', { title: `%${query.title}%` })
      .orWhere('b.author ILIKE :author', { author: `%${query.authorName}%` })
      .getMany();
  }
}
