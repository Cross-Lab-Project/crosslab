import Mocha from 'mocha';

import {AbstractApplicationDataSource} from '../abstractDataSource.js';
import {AbstractRepository} from '../abstractRepository.js';
import {testSuiteCreate} from './create.spec.js';
import {testSuiteFind} from './find.spec.js';
import {testSuiteFindOne} from './findOne.spec.js';
import {testSuiteFindOneOrFail} from './findOneOrFail.spec.js';
import {testSuiteFormat} from './format.spec.js';
import {testSuiteRemove} from './remove.spec.js';
import {testSuiteSave} from './save.spec.js';
import {CustomRecord, PartialTestData, RepositoryTestData, SuiteName} from './types.spec.js';
import {testSuiteWrite} from './write.spec.js';

/**
 * An abstract class for a repository.
 * @typeParam K - Keys of the EntityData
 * @typeParam R - Type of the Repository
 */
export abstract class AbstractRepositoryTestSuite<
  K extends string,
  R extends AbstractRepository<object, unknown, unknown, Record<string, object>>,
> {
  protected entityData?: PartialTestData<K, R>;
  protected testSuites?: CustomRecord<SuiteName, Mocha.Suite>;
  protected repositoryTestData?: RepositoryTestData<K, R>;
  protected AppDataSource: AbstractApplicationDataSource<
    Record<string, AbstractRepository<object, unknown, unknown, Record<string, object>>>
  >;

  constructor(
    AppDataSource: AbstractApplicationDataSource<Record<string, AbstractRepository<object, unknown, unknown, Record<string, object>>>>,
  ) {
    this.AppDataSource = AppDataSource;
  }

  protected abstract repository: R;
  protected abstract getEntityData: () => Promise<PartialTestData<K, R>>;
  protected abstract RepositoryClass: {new (): R};

  public async initialize() {
    this.entityData = await this.getEntityData();

    this.repositoryTestData = {
      entityData: this.entityData,
      repository: this.repository,
      compareModels: this.compareModels.bind(this),
      compareFormatted: this.compareFormatted.bind(this),
      getFindOptionsWhere: this.getFindOptionsWhere.bind(this),
      validateCreate: this.validateCreate.bind(this),
      validateFormat: this.validateFormat.bind(this),
      validateWrite: this.validateWrite.bind(this),
      RepositoryClass: this.RepositoryClass,
    };

    this.testSuites = {
      additional: (() => {
        const testSuite = new Mocha.Suite('additional');
        return testSuite;
      })(),
      create: testSuiteCreate(this.repositoryTestData),
      find: testSuiteFind(this.repositoryTestData),
      findOne: testSuiteFindOne(this.repositoryTestData),
      findOneOrFail: testSuiteFindOneOrFail(this.repositoryTestData),
      format: testSuiteFormat(this.repositoryTestData),
      remove: testSuiteRemove(this.repositoryTestData),
      save: testSuiteSave(this.repositoryTestData),
      write: testSuiteWrite(this.repositoryTestData),
    };
  }

  public addTestToSuite(suiteName: SuiteName, test: (data: RepositoryTestData<K, R>) => Mocha.Test) {
    if (!this.testSuites || !this.repositoryTestData) throw new Error('Test suite has not been initialized');
    this.testSuites[suiteName].addTest(test(this.repositoryTestData));
  }

  public addSuiteToSuite(suiteName: SuiteName, suite: (data: RepositoryTestData<K, R>) => Mocha.Suite) {
    if (!this.testSuites || !this.repositoryTestData) throw new Error('Test suite has not been initialized');
    this.testSuites[suiteName].addSuite(suite(this.repositoryTestData));
  }

  public addSuite(suiteName: string, suite: (data: RepositoryTestData<K, R>) => Mocha.Suite) {
    if (!this.testSuites || !this.repositoryTestData) throw new Error('Test suite has not been initialized');
    this.testSuites[suiteName] = suite(this.repositoryTestData);
  }

  public removeSuite(suiteName: SuiteName) {
    if (!this.testSuites || !this.repositoryTestData) throw new Error('Test suite has not been initialized');
    delete this.testSuites[suiteName];
  }

  protected async resetDatabase() {
    if (this.AppDataSource.connected) {
      await this.AppDataSource.teardown();
    }
    const newEntityData = await this.getEntityData();

    for (const key in newEntityData) {
      (this.entityData as any)[key] = (newEntityData as any)[key];
    }
  }

  public execute() {
    const testSuites = this.testSuites;
    const testSuite = new Mocha.Suite(`${this.repository.name} Repository Test`);
    for (const suite in testSuites) {
      const boundResetDatabase = this.resetDatabase.bind(this);
      testSuites[suite].beforeEach(async function () {
        await boundResetDatabase();
      });
      testSuite.addSuite(testSuites[suite]);
    }
    return testSuite;
  }

  abstract validateCreate(...args: Parameters<RepositoryTestData<K, R>['validateCreate']>): boolean;
  abstract validateWrite(...args: Parameters<RepositoryTestData<K, R>['validateWrite']>): boolean;
  abstract validateFormat(...args: Parameters<RepositoryTestData<K, R>['validateFormat']>): boolean;
  abstract compareModels(...args: Parameters<RepositoryTestData<K, R>['compareModels']>): boolean;
  abstract compareFormatted(...args: Parameters<RepositoryTestData<K, R>['compareFormatted']>): boolean;
  abstract getFindOptionsWhere(
    ...args: Parameters<RepositoryTestData<K, R>['getFindOptionsWhere']>
  ): ReturnType<RepositoryTestData<K, R>['getFindOptionsWhere']>;
}
