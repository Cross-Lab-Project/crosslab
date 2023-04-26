import {DataSource, DataSourceOptions, EntityTarget, ObjectLiteral} from 'typeorm';

export abstract class AbstractApplicationDataSource {
  private dataSource?: DataSource;
  public connected = false;

  protected abstract initializeRepositories(): void;

  public async initialize(options: DataSourceOptions) {
    this.dataSource = new DataSource(options);
    await this.dataSource.initialize();
    this.connected = true;
    this.initializeRepositories();
  }

  public async teardown() {
    if (!this.dataSource?.isInitialized) throw new Error('Data Source has not been initialized!');

    await this.dataSource.destroy();
    this.connected = false;
  }

  public getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>) {
    if (!this.dataSource?.isInitialized) throw new Error('Data Source has not been initialized!');

    return this.dataSource.getRepository(target);
  }
}
