import {DataSource, DataSourceOptions, EntityManager} from 'typeorm';

import {AbstractRepository} from './abstractRepository';

type RepositoryDict = {[k: string]: AbstractRepository<object, unknown, unknown, Record<string, object>>};

export abstract class AbstractApplicationDataSource<RD extends RepositoryDict> {
  private _dataSource: DataSource;
  private entityManager?: EntityManager;
  public repositories: RD;
  public connected = false;

  constructor(options: DataSourceOptions) {
    this._dataSource = new DataSource(options);
    this.repositories = this.createRepositories();
  }

  protected abstract createRepositories(): RD;

  private initializeRepositories(repositories: RD, entityManager: EntityManager): Promise<void> | void {
    for (const key in repositories) {
      repositories[key].initialize(entityManager);
    }
  }

  public async initialize(options?: DataSourceOptions) {
    options ??= this._dataSource.options;
    if (this._dataSource.isInitialized) {
      await this._dataSource.destroy();
      this._dataSource = new DataSource(options);
    } else if (options !== this._dataSource.options) {
      this._dataSource = new DataSource(options);
    }
    await this._dataSource.initialize();
    this.connected = true;
    this.entityManager = this._dataSource.createEntityManager();
    await this.initializeRepositories(this.repositories, this.entityManager);
  }

  public async teardown() {
    if (!this._dataSource?.isInitialized) throw new Error('Data Source has not been initialized!');

    await this._dataSource.destroy();
    this.connected = false;
  }

  public get dataSource() {
    return this._dataSource;
  }

  public async transaction<T>(runInTransaction: (repositories: RD) => Promise<T>): Promise<T> {
    return this._dataSource?.transaction(async entityManager => {
      const repositories = this.createRepositories();
      await this.initializeRepositories(repositories, entityManager);
      return runInTransaction(repositories);
    });
  }
}
