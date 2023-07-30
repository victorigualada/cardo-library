import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RepositoryStub } from '../stubs/repository.stub';
import { BookController } from '../../app/book/controller/book.controller';
import { BookService } from '../../app/book/service/book.service';
import { Book } from '../../app/book/entity/book.entity';
import { BookMock } from '../mocks/book.mock';

describe('Book API integration tests', () => {
  let controller: BookController;
  let service: BookService;
  let repository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [
        BookController,
      ],
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useClass: RepositoryStub,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should have definitions for controller and service', () => {
    // arrange & act & assert
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('#listBooks', () => {
    it('should return list of books', async () => {
      // arrange
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() => Promise.resolve(BookMock));

      // act
      const books = await controller.listBooks();

      // assert
      expect(books).toEqual(BookMock);
    });
  });

  describe('#getBook', () => {
    it('should return a book', async () => {
      // arrange
      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(BookMock[0]));

      // act
      const books = await controller.getBook(1);

      // assert
      expect(books).toEqual(BookMock[0]);
    });
  });

  describe('#createBook', () => {
    it('should create a book', async () => {
      // arrange
      const newBook = BookMock[3];
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(newBook));

      // act
      const books = await controller.createBook(BookMock[3]);

      // assert
      expect(books).toEqual(newBook);
    });
  });
});