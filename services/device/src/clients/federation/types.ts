/**
 * This file was automatically generated by openapi-codegeneration.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source OpenAPI file,
 * and run openapi-codegeneration to regenerate this file.
 */
import * as _BasicValidation from './basicValidation.cjs';

/**
 * @internal
 */
export interface FunctionWithErrors {
  (...args: unknown[]): unknown;
  errors?: unknown;
}

/**
 * @internal
 */
export interface RequestInfo {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'OPTIONS' | 'PATCH' | 'HEAD';
  body?: string;
  headers?: [string, string][];
}

/**
 * @internal
 */
export type FetchFunction = (
  url: string,
  info?: RequestInfo,
) => Promise<ResponseData> | ResponseData;

export interface ResponseData {
  status: number;
  headers?: {
    [key: string]: string | undefined;
  };
  body?: unknown;
}

export interface SuccessResponse extends ResponseData {
  success?: true;
}

export interface ErrorResponse extends ResponseData {
  success?: false;
}

/**
 * @internal
 */
export function isSuccessResponse(response: ResponseData): response is SuccessResponse {
  return response.status < 400;
}

/**
 * @internal
 */
export function isErrorResponse(response: ResponseData): response is ErrorResponse {
  return response.status >= 400;
}

/**
 * This type allows to pick the required properties of another type.
 */
export type Require<Type, Key extends keyof Type> = Partial<Type> & {
  [Property in Key]-?: Type[Property];
};

export type SizedTuple<
  T,
  MIN extends number | undefined = undefined,
  MAX extends number | undefined = undefined,
> = MIN extends number
  ? MAX extends number
    ? _SizedTuple<T, NumericRangeTuple<MIN, MAX>>
    : TupleObject<T, NumericRangeTuple<0, MIN>> & T[]
  : MAX extends number
  ? _SizedTuple<T, NumericRangeTuple<0, MAX>, true>
  : T[];

type _SizedTuple<T, ARR extends number[], Z extends boolean = false> = ARR extends [
  infer HEAD extends number,
  ...infer TAIL extends number[],
]
  ? Tuple<T, HEAD, Z> | _SizedTuple<T, TAIL, Z>
  : never;

type Tuple<T, N extends number, Z extends boolean = false> = _Tuple<
  T,
  NumericRangeTuple<Z extends true ? 0 : 1, N>
>;

type _Tuple<T, N extends number[]> = N extends [
  infer HEAD,
  ...infer TAIL extends number[],
]
  ? HEAD extends 0
    ? [] | _Tuple<T, TAIL>
    : [T, ..._Tuple<T, TAIL>]
  : [];

type TupleObject<T, N extends number[]> = N extends [
  infer HEAD extends number,
  ...infer TAIL extends number[],
]
  ? TAIL extends []
    ? Record<string, never>
    : { [P in HEAD]: T } & TupleObject<T, TAIL>
  : Record<string, never>;

export type NumericRange<
  START extends number,
  END extends number,
  ARR extends unknown[] = [],
  ACC extends number = never,
> = ARR['length'] extends END
  ? ACC | START | END
  : NumericRange<
      START,
      END,
      [...ARR, 1],
      ARR[START] extends undefined ? ACC : ACC | ARR['length']
    >;

type NumericRangeTuple<
  START extends number,
  END extends number,
  ARR extends unknown[] = [],
  ACC extends number[] = [],
> = ARR['length'] extends END
  ? [START, ...ACC, END]
  : NumericRangeTuple<
      START,
      END,
      [...ARR, 1],
      ARR[START] extends undefined ? ACC : [...ACC, ARR['length']]
    >;

export type Institution<T extends 'request' | 'response' | 'all' = 'all'> =
  T extends 'all'
    ? {
        name?: string;
        homepage?: string;
        api?: string;
        federatedApi?: string;
        apiToken?: string;
        [k: string]: unknown;
      }
    : T extends 'request'
    ? {
        name?: string;
        homepage?: string;
        api?: string;
        federatedApi?: string;
        apiToken?: string;
        [k: string]: unknown;
      }
    : T extends 'response'
    ? {
        name?: string;
        homepage?: string;
        api?: string;
        federatedApi?: string;
        [k: string]: unknown;
      }
    : never;