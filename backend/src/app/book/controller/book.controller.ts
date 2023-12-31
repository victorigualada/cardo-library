import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards} from '@nestjs/common';
import {BookService} from '../service/book.service';
import {DeleteResult} from 'typeorm';
import {JwtGuard} from '../../core/guards/auth.guard';
import {Book} from '../entity/book.entity';
import {Public} from '../../core/decorators/public.decorator';
import {SearchParams} from '../interfaces/search-params.interface';

@UseGuards(JwtGuard)
@Controller('books')
export class BookController {

  constructor(private readonly service: BookService) {}

  @Public()
  @Get()
  async listBooks(): Promise<Book[]> {
    return await this.service.listBooks();
  }

  @Public()
  @Get('search')
  async searchBooks(@Query() query: SearchParams): Promise<Book[]> {
    return await this.service.searchBooks(query);
  }

  @Patch(':id')
  async updateOneBase(@Param('id') id: number, @Body() partialBook: Book): Promise<Book> {
    return await this.service.update(id, partialBook);
  }

  @Post()
  async createBook(@Body() book: Book): Promise<Book> {
    return await this.service.save(book);
  }

  @Put()
  async replaceBook(@Body() book: Book): Promise<Book> {
    return await this.service.save(book);
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}
