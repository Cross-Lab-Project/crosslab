import * as Y from 'yjs';

import {
  CollaborationArray,
  CollaborationBoolean,
  CollaborationNull,
  CollaborationNumber,
  CollaborationObject,
  CollaborationString,
  CollaborationTypeName,
} from '../../collaborationTypes.js';

export type YjsCollaborationType<
  T extends CollaborationTypeName | undefined = undefined,
> = T extends 'object'
  ? YjsCollaborationObject
  : T extends 'array'
    ? YjsCollaborationArray
    : T extends 'number'
      ? YjsCollaborationNumber
      : T extends 'string'
        ? YjsCollaborationString
        : T extends 'boolean'
          ? YjsCollaborationBoolean
          : T extends 'null'
            ? YjsCollaborationNull
            :
                | YjsCollaborationObject
                | YjsCollaborationArray
                | YjsCollaborationNumber
                | YjsCollaborationString
                | YjsCollaborationBoolean
                | YjsCollaborationNull;

export class YjsCollaborationObject extends CollaborationObject {
  private _yMap: Y.Map<unknown>;

  constructor(yMap?: Y.Map<unknown>) {
    super();
    this._yMap = yMap ?? new Y.Map();
  }

  set(key: string, value: YjsCollaborationType): void {
    this._yMap.set(key, value.toYjs());
  }

  get(key: string): YjsCollaborationType | undefined {
    const yValue = this._yMap.get(key);
    return yValue ? yjsToCollaborationType(yValue) : undefined;
  }

  delete(key: string): void {
    this._yMap.delete(key);
  }

  toJSON(): Record<string, unknown> {
    return this._yMap.toJSON();
  }

  toYjs(): Y.Map<unknown> {
    return this._yMap;
  }
}

export class YjsCollaborationArray extends CollaborationArray {
  private _yArray: Y.Array<unknown>;

  constructor(yArray?: Y.Array<unknown>) {
    super();
    this._yArray = yArray ?? new Y.Array();
  }

  push(...items: YjsCollaborationType[]): void {
    this._yArray.push(items.map(item => item.toYjs()));
  }

  get(index: number): YjsCollaborationType | undefined {
    const yValue = this._yArray.get(index);
    return yValue ? yjsToCollaborationType(yValue) : undefined;
  }

  delete(index: number, length?: number): void {
    this._yArray.delete(index, length);
  }

  toJSON(): Array<unknown> {
    return this._yArray.toJSON();
  }

  toYjs(): Y.Array<unknown> {
    return this._yArray;
  }
}

export class YjsCollaborationNumber extends CollaborationNumber {
  private _yText: Y.Text;

  constructor(yText?: Y.Text) {
    super();
    this._yText = yText ?? new Y.Text(JSON.stringify(0));
    const type = this._yText.getAttribute('type');
    if (type && type !== 'number') {
      throw new Error(`Expected type "number" or "undefined", got "${type}"`);
    }
    if (!type) {
      this._yText.insert(0, JSON.stringify(0));
      this._yText.setAttribute('type', 'number');
    }
  }

  set(value: number): void {
    this._yText.delete(0, this._yText.length);
    this._yText.insert(0, JSON.stringify(value));
  }

  toJSON(): number {
    return JSON.parse(this._yText.toJSON());
  }

  toYjs(): Y.Text {
    return this._yText;
  }
}

export class YjsCollaborationString extends CollaborationString {
  private _yText: Y.Text;

  constructor(yText?: Y.Text) {
    super();
    this._yText = yText ?? new Y.Text();
    const type = this._yText.getAttribute('type');
    if (type && type !== 'string') {
      throw new Error(`Expected type "string" or "undefined", got "${type}"`);
    }
    if (!type) {
      this._yText.setAttribute('type', 'string');
    }
  }

  set(value: string): void {
    this._yText.delete(0, this._yText.length);
    this._yText.insert(0, value);
  }

  insert(index: number, value: string): void {
    this._yText.insert(index, value);
  }

  delete(index: number, count: number): void {
    this._yText.delete(index, count);
  }

  toJSON(): string {
    return this._yText.toJSON();
  }

  toYjs(): Y.Text {
    return this._yText;
  }
}

export class YjsCollaborationBoolean extends CollaborationBoolean {
  private _yText: Y.Text;

  constructor(yText?: Y.Text) {
    super();
    this._yText = yText ?? new Y.Text(JSON.stringify(false));
    const type = this._yText.getAttribute('type');
    if (type && type !== 'boolean') {
      throw new Error(`Expected type "boolean" or "undefined", got "${type}"`);
    }
    if (!type) {
      this._yText.insert(0, JSON.stringify(false));
      this._yText.setAttribute('type', 'boolean');
    }
  }

  set(value: boolean): void {
    this._yText.delete(0, this._yText.length);
    this._yText.insert(0, JSON.stringify(value));
  }

  toJSON(): boolean {
    return JSON.parse(this._yText.toJSON());
  }

  toYjs(): Y.Text {
    return this._yText;
  }
}

export class YjsCollaborationNull extends CollaborationNull {
  private _yText: Y.Text;

  constructor(yText?: Y.Text) {
    super();
    this._yText = yText ?? new Y.Text(JSON.stringify(null));
    const type = this._yText.getAttribute('type');
    if (type && type !== 'null') {
      throw new Error(`Expected type "null" or "undefined", got "${type}"`);
    }
    if (!type) {
      this._yText.insert(0, JSON.stringify(null));
      this._yText.setAttribute('type', 'null');
    }
  }

  toJSON(): null {
    return JSON.parse(this._yText.toJSON());
  }

  toYjs(): Y.Text {
    return this._yText;
  }
}

export function yjsToCollaborationType(yValue: unknown): YjsCollaborationType {
  if (yValue instanceof Y.Map) {
    return new YjsCollaborationObject(yValue);
  }

  if (yValue instanceof Y.Array) {
    return new YjsCollaborationArray(yValue);
  }

  if (yValue instanceof Y.Text) {
    const type = yValue.getAttribute('type') as unknown;

    if (
      !type ||
      (type !== 'number' &&
        type !== 'integer' &&
        type !== 'string' &&
        type !== 'boolean' &&
        type !== 'null')
    ) {
      throw new Error(`Cannot convert y text instance with type "${type}"!`);
    }

    switch (type) {
      case 'number':
        return new YjsCollaborationNumber(yValue);
      case 'string':
        return new YjsCollaborationString(yValue);
      case 'boolean':
        return new YjsCollaborationBoolean(yValue);
      case 'null':
        return new YjsCollaborationNull(yValue);
    }
  }

  throw new Error(`Could not convert y value!`);
}
