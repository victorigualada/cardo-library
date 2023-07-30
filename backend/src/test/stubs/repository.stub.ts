export class RepositoryStub {

  public metadata = { connection: { options: { type: null } }, columns: [], relations: [] }

  public find = jest.fn();
  public findOneBy = jest.fn();
  public create = jest.fn();
  public save = jest.fn();
  public delete = jest.fn();
  public update = jest.fn();
}