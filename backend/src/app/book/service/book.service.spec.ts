import {BookService} from './book.service';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {Book} from '../entity/book.entity';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {RepositoryStub} from '../../../test/stubs/repository.stub';
import {BookMock} from '../../../test/mocks/book.mock';
import clearAllMocks = jest.clearAllMocks;

describe('BookService', () => {
  let repository: Repository<Book>;

  let service: BookService;

  const createQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    getMany: () => BookMock,
  }  as unknown as SelectQueryBuilder<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useClass: RepositoryStub,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  afterEach(() => {
    clearAllMocks();
  });

  it.only('should return a book list when searching by existing title' , async () => {
    // arrange
    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(createQueryBuilder);

    // act
    const result = await service.searchBooks({ title: 'Lord' });

    // assert
    expect(result).toBe(BookMock);
  });
});