import { JSONSchema7, JSONSchema7Definition, JSONSchema7Type } from 'json-schema';
import * as Y from 'yjs';

import { CollaborationServiceProsumer } from './prosumer.js';

export type FromSchema<
  T extends JSONSchema7,
  B extends JSONSchema7 = T,
> = T['type'] extends 'object'
  ? FromObjectSchema<T, B>
  : T['type'] extends 'array'
    ? FromArraySchema<T, B>
    : T['const'] extends JSONSchema7Type
      ? T['const']
      : T['type'] extends 'string'
        ? string
        : T['type'] extends 'number'
          ? number
          : T['type'] extends 'boolean'
            ? boolean
            : T['type'] extends 'null'
              ? null
              : T['anyOf'] extends JSONSchema7[]
                ? FromAnyOfSchema<T['anyOf'], B>
                : T['allOf'] extends JSONSchema7[]
                  ? FromAllOfSchema<T['allOf'], B>
                  : T['$ref'] extends string
                    ? FromSchema<SubSchema<B, T['$ref']>, B>
                    : unknown;

type FromObjectSchema<T extends JSONSchema7, B extends JSONSchema7> =
  T['properties'] extends Record<string, JSONSchema7>
    ? {
        [k in keyof T['properties']]: T['properties'][k] extends JSONSchema7
          ? FromSchema<T['properties'][k], B>
          : unknown;
      } & (T['additionalProperties'] extends JSONSchema7Definition
        ? {
            [k: string]: T['additionalProperties'] extends JSONSchema7
              ? FromSchema<T['additionalProperties'], B>
              : T['additionalProperties'];
          }
        : T['additionalProperties'])
    : T['additionalProperties'] extends JSONSchema7Definition
      ? {
          [k: string]: T['additionalProperties'] extends JSONSchema7
            ? FromSchema<T['additionalProperties'], B>
            : T['additionalProperties'];
        }
      : Record<string, unknown>;

type FromArraySchema<
  T extends JSONSchema7,
  B extends JSONSchema7,
> = T['items'] extends JSONSchema7 ? FromSchema<T['items'], B>[] : Array<unknown>;

type FromAnyOfSchema<T extends JSONSchema7[], B extends JSONSchema7> = T extends [
  infer Head extends JSONSchema7,
  ...infer Tail extends JSONSchema7[],
]
  ? FromSchema<Head, B> | FromAnyOfSchema<Tail, B>
  : never;

type FromAllOfSchema<T extends JSONSchema7[], B extends JSONSchema7> = T extends [
  infer Head extends JSONSchema7,
  ...infer Tail extends JSONSchema7[],
]
  ? FromSchema<Head, B> & FromAllOfSchema<Tail, B>
  : never;

// TODO: FromOneOfSchema

type PathSegments<S extends string> = S extends '#'
  ? []
  : S extends `#/${infer SP1}/${infer SP2}`
    ? [SP1, ...PathSegments<`#/${SP2}`>]
    : S extends `#/${infer SP1}[${infer N}]`
      ? [SP1, N]
      : S extends `#/${infer SP1}`
        ? [SP1]
        : never;

export type SubSchema<T, S extends string> = _SubSchema<T, PathSegments<S>>;

type _SubSchema<T, S extends string[]> = T extends { [k: string]: unknown }
  ? S extends [infer Head extends keyof T, ...infer Tail extends string[]]
    ? _SubSchema<T[Head], Tail>
    : T
  : never;

export type Paths<T> = '#' | DeepKeys<T>;

type DeepKeys<T, B = true> =
  T extends Array<unknown>
    ? {
        [K in number & keyof T]: `${`${K}` extends `${number}`
          ? `[${K}]`
          : never}${'' | DeepKeys<T[K]>}`;
      }[number & keyof T]
    : T extends object
      ? {
          [K in (string | number) & keyof T]: `${
            | (B extends true ? `#/${K}` : `/${K}`)
            | (`${K}` extends `${number}` ? `[${K}]` : never)}${'' | DeepKeys<T[K]>}`;
        }[(string | number) & keyof T]
      : never;

export function initializeDocument(
  document: Y.Doc,
  inputValue: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  observer?: (events: Y.YEvent<any>[], transaction: Y.Transaction, key: string) => void,
) {
  for (const [key, value] of Object.entries(inputValue)) {
    let yjsValue;
    if (Array.isArray(value)) {
      yjsValue = yjsFromValue(value, document.getArray(key));
    } else if (value && typeof value === 'object') {
      yjsValue = yjsFromValue(value, document.getMap(key));
    } else {
      yjsValue = yjsFromValue(value, document.getText(key));
    }
    if (observer) {
      console.log(`collaboration: registering observer`);
      yjsValue.observeDeep((events, transaction) => {
        console.log('collaboration: something changed', events);
        observer(events, transaction, key);
      });
    }
  }
}

export function yjsFromValue(
  inputValue: unknown,
  yjsType?: Y.Map<unknown> | Y.Array<unknown> | Y.Text,
): Y.Array<unknown> | Y.Map<unknown> | Y.Text {
  if ((!inputValue || typeof inputValue !== 'object') && yjsType) {
    throw new Error(
      `When a document is supplied the value must be of type "Record<string,unknown>"!`,
    );
  }

  if (Array.isArray(inputValue)) {
    const array = yjsType instanceof Y.Array ? yjsType : new Y.Array();
    array.push(inputValue.map(value => yjsFromValue(value)));
    return array;
  }

  if (inputValue && typeof inputValue === 'object') {
    const map = yjsType instanceof Y.Map ? yjsType : new Y.Map();
    for (const [key, value] of Object.entries(inputValue)) {
      map.set(key, yjsFromValue(value));
    }
    return map;
  }

  if (yjsType instanceof Y.Text) {
    yjsType.insert(0, JSON.stringify(inputValue));
    return yjsType;
  }

  return new Y.Text(JSON.stringify(inputValue));
}

export function valueFromYjs(yjs: Y.Array<unknown> | Y.Map<unknown> | Y.Text): unknown {
  if (yjs instanceof Y.Array) {
    const array = [];
    array.push(
      yjs.map(item => {
        if (
          !(item instanceof Y.Array || item instanceof Y.Map || item instanceof Y.Text)
        ) {
          throw new Error('Array contains item that is not a valid yjs type!');
        }
        valueFromYjs(item);
      }),
    );
    return array;
  }

  if (yjs instanceof Y.Map) {
    const object: { [k: string]: unknown } = {};

    for (const [key, value] of yjs.entries()) {
      if (
        !(value instanceof Y.Array || value instanceof Y.Map || value instanceof Y.Text)
      ) {
        throw new Error('Map contains entry that is not a valid yjs type!');
      }
      object[key] = valueFromYjs(value);
    }

    return object;
  }

  return JSON.parse(yjs.toJSON());
}

export abstract class Binding {
  protected _value: Y.Map<unknown> | Y.Array<unknown> | Y.Text;

  constructor(value: Y.Map<unknown> | Y.Array<unknown> | Y.Text) {
    this._value = value;
  }

  abstract getInitialValue(
    collaborationServiceProsumer: CollaborationServiceProsumer,
  ): unknown;
  abstract handleCollaborationEvent(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events: Y.YEvent<any>[],
    transaction: Y.Transaction,
  ): void;
}
