import {FindOptionsWhere} from 'typeorm';

import {AbstractRepository} from '../abstractRepository';

export type SuiteName =
  | 'create'
  | 'write'
  | 'save'
  | 'find'
  | 'findOne'
  | 'findOneOrFail'
  | 'remove'
  | 'format'
  | 'additional';

export type CustomRecord<K extends string | number | symbol, T> = Record<K, T> & {
  [k: string]: T;
};

export interface EntityData<R extends AbstractRepository<{}, unknown, unknown>> {
  model: R extends AbstractRepository<infer M, unknown, unknown> ? M : never;
  request: R extends AbstractRepository<{}, infer RQ, unknown> ? RQ : never;
  response: R extends AbstractRepository<{}, unknown, infer RSP> ? RSP : never;
}

export type GenericTestData<
  D extends [string, string, AbstractRepository<{}, unknown, unknown>][],
> = D extends [
  infer H extends [string, string, AbstractRepository<{}, unknown, unknown>],
  ...infer T extends [string, string, AbstractRepository<{}, unknown, unknown>][],
]
  ? {
      [k in H[0]]: PartialTestData<H[1], H[2]>;
    } & GenericTestData<T>
  : {};

export type PartialTestData<
  K extends string,
  R extends AbstractRepository<{}, unknown, unknown>,
> = Record<K, EntityData<R>>;

export type ModelType<R extends AbstractRepository<{}, unknown, unknown>> =
  R extends AbstractRepository<infer M, unknown, unknown> ? M : never;

export type RequestType<R extends AbstractRepository<{}, unknown, unknown>> =
  R extends AbstractRepository<{}, infer RQ, unknown> ? RQ : never;

export type ResponseType<R extends AbstractRepository<{}, unknown, unknown>> =
  R extends AbstractRepository<{}, unknown, infer RSP> ? RSP : never;

export type RepositoryTestData<
  K extends string,
  R extends AbstractRepository<{}, unknown, unknown>,
> = {
  entityData: PartialTestData<K, R>;
  repository: R;
  validateCreate: (model: ModelType<R>, data?: RequestType<R>) => boolean;
  validateWrite(model: ModelType<R>, data: RequestType<R>): boolean;
  validateFormat(model: ModelType<R>, data: ResponseType<R>): boolean;
  compareModels(
    firstModel: ModelType<R>,
    secondModel: ModelType<R>,
    complete?: boolean,
  ): boolean;
  compareFormatted(first: ResponseType<R>, second: ResponseType<R>): boolean;
  getFindOptionsWhere(model?: ModelType<R>): FindOptionsWhere<ModelType<R>>;
  RepositoryClass: {new (): R};
};
