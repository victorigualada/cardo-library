import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { BookController } from './controller/book.controller';
import { Book } from './entity/book.entity';
import { BookService } from './service/book.service';

@Module({
  controllers: [
    BookController,
  ],
  imports: [
    CoreModule,
    TypeOrmModule.forFeature(
      [
        Book,
      ],
    ),
  ],
  providers: [
    BookService,
  ]
})
export class BookModule {}
