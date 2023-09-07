import {EntityManager, FindManyOptions, FindOneOptions, FindOptionsRelations, ObjectLiteral, Repository} from 'typeorm';

import {MissingEntityError, UninitializedRepositoryError} from '../errors.js';
import {NonNullableProperties} from '../types.js';

/**
 * An abstract class for a repository.
 * @typeParam M - Type of the model.
 * @typeParam RQ - Type of possible request.
 * @typeParam RSP - Type of possible response.
 */
export abstract class AbstractRepository<M extends ObjectLiteral, RQ, RSP, D extends Record<string, object> = Record<string, never>> {
  public name: string;
  protected repository?: Repository<M>;
  protected abstract dependencies: Partial<D>;

  constructor(name: string) {
    this.name = name;
  }

  protected abstract dependenciesMet(): boolean;

  protected isInitialized(): this is {
    repository: Repository<M>;
    dependencies: NonNullableProperties<D>;
  } {
    if (!this.repository) return false;
    if (!this.dependenciesMet()) return false;

    return true;
  }

  protected throwUninitializedRepositoryError(): never {
    throw new UninitializedRepositoryError(`${this.name} Repository has not been initialized!`);
  }

  abstract initialize(entityManager: EntityManager): void;

  public async create(data?: RQ): Promise<M> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();
    const model = this.repository.create();
    if (data === undefined) return model;
    await this.write(model, data);
    return model;
  }

  abstract write(model: M, data: Partial<RQ>): Promise<void>;

  public async save(model: M): Promise<M> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();
    return await this.repository.save(model);
  }

  public async find(options?: FindManyOptions<M>): Promise<M[]> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();
    const findOptions: FindManyOptions<M> = {
      ...(options ?? {}),
      relations: options?.relations ?? this.getDefaultFindOptionsRelations(),
    };
    return await this.repository.find(findOptions);
  }

  public async findOne(options: FindOneOptions<M>): Promise<M | null> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();
    const findOptions: FindManyOptions<M> = {
      ...options,
      relations: options?.relations ?? this.getDefaultFindOptionsRelations(),
    };
    return await this.repository.findOne(findOptions);
  }

  public async findOneOrFail(options: FindOneOptions<M>): Promise<M> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();
    const findOptions: FindOneOptions<M> = {
      ...options,
      relations: options.relations ?? this.getDefaultFindOptionsRelations(),
    };
    const model = await this.repository.findOne(findOptions);

    if (!model) {
      throw new MissingEntityError(`The requested ${this.name} does not exist in the database`, 404);
    }

    return model;
  }

  abstract format(model: M): Promise<RSP>;

  public async remove(model: M): Promise<void> {
    if (!this.isInitialized()) this.throwUninitializedRepositoryError();
    await this.repository.remove(model);
  }

  protected getDefaultFindOptionsRelations(): FindOptionsRelations<M> | undefined {
    return undefined;
  }

  public setDependencies(dependencies: D) {
    this.dependencies = dependencies;
  }
}
