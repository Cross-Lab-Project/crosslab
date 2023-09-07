import {FindOptionsWhere} from 'typeorm';

import {AbstractRepository} from '../abstractRepository.js';

export type SuiteName = 'create' | 'write' | 'save' | 'find' | 'findOne' | 'findOneOrFail' | 'remove' | 'format' | 'additional';

export type CustomRecord<K extends string | number | symbol, T> = Record<K, T> & {
  [k: string]: T;
};

export interface EntityData<R extends AbstractRepository<object, unknown, unknown, Record<string, object>>> {
  model: R extends AbstractRepository<infer M, unknown, unknown, Record<string, object>> ? M : never;
  request: R extends AbstractRepository<object, infer RQ, unknown, Record<string, object>> ? RQ : never;
  response: R extends AbstractRepository<object, unknown, infer RSP, Record<string, object>> ? RSP : never;
}

export type GenericTestData<D extends [string, string, AbstractRepository<object, unknown, unknown, Record<string, object>>][]> =
  D extends [
    infer H extends [string, string, AbstractRepository<object, unknown, unknown, Record<string, object>>],
    ...infer T extends [string, string, AbstractRepository<object, unknown, unknown, Record<string, object>>][],
  ]
    ? {
        [k in H[0]]: PartialTestData<H[1], H[2]>;
      } & GenericTestData<T>
    : object;

export type PartialTestData<K extends string, R extends AbstractRepository<object, unknown, unknown, Record<string, object>>> = Record<
  K,
  EntityData<R>
>;

export type ModelType<R extends AbstractRepository<object, unknown, unknown, Record<string, object>>> = R extends AbstractRepository<
  infer M,
  unknown,
  unknown,
  Record<string, object>
>
  ? M
  : never;

export type RequestType<R extends AbstractRepository<object, unknown, unknown, Record<string, object>>> = R extends AbstractRepository<
  object,
  infer RQ,
  unknown,
  Record<string, object>
>
  ? RQ
  : never;

export type ResponseType<R extends AbstractRepository<object, unknown, unknown, Record<string, object>>> = R extends AbstractRepository<
  object,
  unknown,
  infer RSP,
  Record<string, object>
>
  ? RSP
  : never;

export type RepositoryTestData<K extends string, R extends AbstractRepository<object, unknown, unknown, Record<string, object>>> = {
  entityData: PartialTestData<K, R>;
  repository: R;
  validateCreate: (model: ModelType<R>, data?: RequestType<R>) => boolean;
  validateWrite(model: ModelType<R>, data: RequestType<R>): boolean;
  validateFormat(model: ModelType<R>, data: ResponseType<R>): boolean;
  compareModels(firstModel: ModelType<R>, secondModel: ModelType<R>, complete?: boolean): boolean;
  compareFormatted(first: ResponseType<R>, second: ResponseType<R>): boolean;
  getFindOptionsWhere(model?: ModelType<R>): FindOptionsWhere<ModelType<R>>;
  RepositoryClass: {new (): R};
};
