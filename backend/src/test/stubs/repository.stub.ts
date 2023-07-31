export class RepositoryStub {
  public createQueryBuilder = jest.fn(() => ({
    offset: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    addFrom: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    getMany: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
  }));

  public metadata = { connection: { options: { type: null } }, columns: [], relations: [] }

  public find = jest.fn();
  public findOneBy = jest.fn();
  public create = jest.fn();
  public save = jest.fn();
  public delete = jest.fn();
  public update = jest.fn();
}