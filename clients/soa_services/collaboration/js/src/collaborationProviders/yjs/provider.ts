import {
  IncomingMessage,
  Message,
  ProtocolMessage,
  isIncomingMessage,
} from '@cross-lab-project/abstract-messaging-channel';
// import * as awarenessProtocol from "y-protocols/awareness.js";
import * as decoding from 'lib0/decoding';
import * as encoding from 'lib0/encoding';
import * as syncProtocol from 'y-protocols/sync';
import * as Y from 'yjs';

import {
  CollaborationProvider,
  CollaborationTypeName,
  CollaborationUpdateEventType,
} from '../../collaborationTypes.js';
import { collaborationProtocol } from '../../protocol.js';
import { yjsCollaborationProtocol } from './protocol.js';
import {
  YjsCollaborationArray,
  YjsCollaborationBoolean,
  YjsCollaborationNull,
  YjsCollaborationNumber,
  YjsCollaborationObject,
  YjsCollaborationString,
  YjsCollaborationType,
  yjsToCollaborationType,
} from './types.js';

export class YjsCollaborationProvider extends CollaborationProvider {
  private _document: Y.Doc = new Y.Doc();

  constructor(initialValue: Record<string, unknown>) {
    super(initialValue);

    this._document.on('update', async (update, origin) => {
      if (origin !== this) {
        this.emit('update-message', {
          type: 'yjs:sync:update',
          content: {
            message: update as Uint8Array<ArrayBuffer>,
          },
        } satisfies ProtocolMessage<typeof yjsCollaborationProtocol, 'yjs:sync:update'>);
      }
    });
  }

  valueToCollaborationType(value: unknown): YjsCollaborationType {
    if (
      typeof value === 'undefined' ||
      typeof value === 'function' ||
      typeof value === 'symbol' ||
      typeof value === 'bigint'
    ) {
      throw new Error(`Cannot convert type "${typeof value}" to yjs collaboration type!`);
    }

    if (Array.isArray(value)) {
      const array = new YjsCollaborationArray();
      array.push(...value.map(item => this.valueToCollaborationType(item)));
      return array;
    }

    if (typeof value === 'object') {
      if (value === null) {
        return new YjsCollaborationNull();
      }
      const object = new YjsCollaborationObject();
      for (const [key, val] of Object.entries(value)) {
        object.set(key, this.valueToCollaborationType(val));
      }
      return object;
    }

    switch (typeof value) {
      case 'number': {
        const number = new YjsCollaborationNumber();
        number.set(value);
        return number;
      }
      case 'string': {
        const string = new YjsCollaborationString();
        string.set(value);
        return string;
      }
      case 'boolean': {
        const boolean = new YjsCollaborationBoolean();
        boolean.set(value);
        return boolean;
      }
    }

    throw new Error(`Could not convert "${value}" to yjs collaboration type!`);
  }

  executeTransaction(transaction: () => void, origin: unknown) {
    this._document.transact(transaction, origin);
  }

  startSynchronization(): ProtocolMessage<
    typeof yjsCollaborationProtocol,
    'yjs:sync:step1'
  > {
    const encoder = new encoding.Encoder();
    syncProtocol.writeSyncStep1(encoder, this._document);
    return {
      type: 'yjs:sync:step1',
      content: {
        message: encoding.toUint8Array(encoder) as Uint8Array<ArrayBuffer>,
      },
    };
  }

  handleCollaborationMessage(
    message: ProtocolMessage<
      typeof collaborationProtocol,
      'collaboration:message'
    >['content'],
  ): Promise<Message | void> | Message | void {
    if (!isIncomingMessage(yjsCollaborationProtocol, 'prosumer', message)) {
      throw new Error('Received invalid yjs collaboration message!');
    }

    return this._handleYjsMessage(message);
  }

  get<T extends CollaborationTypeName>(key: string, type: T): YjsCollaborationType<T> {
    switch (type) {
      case 'object': {
        const yMap = this._document.getMap(key);
        if (!this._knownProperties.has(key)) {
          this._knownProperties.add(key);
          yMap.observeDeep((events, transaction) =>
            this._handleYjsEvents(key, events, transaction),
          );
        }
        return new YjsCollaborationObject(yMap) as YjsCollaborationType<T>;
      }
      case 'array': {
        const yArray = this._document.getArray(key);
        if (!this._knownProperties.has(key)) {
          this._knownProperties.add(key);
          yArray.observeDeep((events, transaction) =>
            this._handleYjsEvents(key, events, transaction),
          );
        }
        return new YjsCollaborationArray(yArray) as YjsCollaborationType<T>;
      }
      case 'number': {
        const yText = this._document.getText(key);
        if (!this._knownProperties.has(key)) {
          this._knownProperties.add(key);
          yText.observeDeep((events, transaction) =>
            this._handleYjsEvents(key, events, transaction),
          );
        }
        return new YjsCollaborationNumber(yText) as YjsCollaborationType<T>;
      }
      case 'string': {
        const yText = this._document.getText(key);
        if (!this._knownProperties.has(key)) {
          this._knownProperties.add(key);
          yText.observeDeep((events, transaction) =>
            this._handleYjsEvents(key, events, transaction),
          );
        }
        return new YjsCollaborationString(yText) as YjsCollaborationType<T>;
      }
      case 'boolean': {
        const yText = this._document.getText(key);
        if (!this._knownProperties.has(key)) {
          this._knownProperties.add(key);
          yText.observeDeep((events, transaction) =>
            this._handleYjsEvents(key, events, transaction),
          );
        }
        return new YjsCollaborationBoolean(yText) as YjsCollaborationType<T>;
      }
      case 'null': {
        const yText = this._document.getText(key);
        if (!this._knownProperties.has(key)) {
          this._knownProperties.add(key);
          yText.observeDeep((events, transaction) =>
            this._handleYjsEvents(key, events, transaction),
          );
        }
        return new YjsCollaborationNull(yText) as YjsCollaborationType<T>;
      }
    }

    throw new Error(`Cannot get value of type "${type}"!`);
  }

  private _handleYjsMessage(
    message: IncomingMessage<typeof yjsCollaborationProtocol, 'prosumer'>,
  ) {
    switch (message.type) {
      case 'yjs:sync:step1':
        return this._handleSyncStep1Message(message.content);
      case 'yjs:sync:step2':
        return this._handleSyncStep2Message(message.content);
      case 'yjs:sync:done':
        return this._handleSyncDoneMessage(message.content);
      case 'yjs:sync:update':
        return this._handleSyncUpdateMessage(message.content);
    }
  }

  private _handleSyncStep1Message(
    syncStep1Message: ProtocolMessage<
      typeof yjsCollaborationProtocol,
      'yjs:sync:step1'
    >['content'],
  ): ProtocolMessage<typeof yjsCollaborationProtocol, 'yjs:sync:step2'> {
    const decoder = new decoding.Decoder(syncStep1Message.message);
    const encoder = new encoding.Encoder();

    // TODO: check if "this" is correct here!
    syncProtocol.readSyncMessage(decoder, encoder, this._document, this);

    return {
      type: 'yjs:sync:step2',
      content: {
        message: encoding.toUint8Array(encoder) as Uint8Array<ArrayBuffer>,
      },
    };
  }

  private _handleSyncStep2Message(
    syncStep2Message: ProtocolMessage<
      typeof yjsCollaborationProtocol,
      'yjs:sync:step2'
    >['content'],
  ): ProtocolMessage<typeof yjsCollaborationProtocol, 'yjs:sync:done'> {
    const encoder = new encoding.Encoder();
    const decoder = new decoding.Decoder(syncStep2Message.message);

    // TODO: check if "this" is correct here!
    syncProtocol.readSyncMessage(decoder, encoder, this._document, this);

    return {
      type: 'yjs:sync:done',
      content: undefined,
    };
  }

  private _handleSyncDoneMessage(
    _syncDoneMessage: ProtocolMessage<
      typeof yjsCollaborationProtocol,
      'yjs:sync:done'
    >['content'],
  ) {}

  private _handleSyncUpdateMessage(
    syncUpdateMessage: ProtocolMessage<
      typeof yjsCollaborationProtocol,
      'yjs:sync:update'
    >['content'],
  ) {
    // TODO: check if "this" is correct here!
    Y.applyUpdate(this._document, syncUpdateMessage.message, this);
  }

  private _handleYjsEvents(
    property: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events: Y.YEvent<any>[],
    transaction: Y.Transaction,
  ) {
    const updatedEvents: CollaborationUpdateEventType[] = [];
    for (const event of events) {
      if (event instanceof Y.YMapEvent) {
        const updatedEvent = this._handleYjsMapEvent(event, transaction);
        updatedEvents.push({
          ...updatedEvent,
          path: [property, ...updatedEvent.path],
        });
        continue;
      }

      if (event instanceof Y.YArrayEvent) {
        const updatedEvent = this._handleYjsArrayEvent(event, transaction);
        updatedEvents.push({
          ...updatedEvent,
          path: [property, ...updatedEvent.path],
        });
        continue;
      }

      if (event instanceof Y.YTextEvent) {
        const updatedEvent = this._handleYjsTextEvent(event, transaction);
        updatedEvents.push({
          ...updatedEvent,
          path: [property, ...updatedEvent.path],
        });
        continue;
      }
    }
    this.emit('update', updatedEvents);
  }

  private _handleYjsMapEvent(
    event: Y.YMapEvent<unknown>,
    transaction: Y.Transaction,
  ): CollaborationUpdateEventType<'object'> {
    return {
      target: new YjsCollaborationObject(event.target),
      path: event.path,
      origin: transaction.origin,
      changes: new Map(
        Array.from(event.keys.entries()).map(([key, entry]) => {
          return [
            key,
            {
              action: entry.action,
              oldValue:
                entry.oldValue !== undefined
                  ? yjsToCollaborationType(entry.oldValue).toJSON()
                  : undefined,
              newValue:
                entry.newValue !== undefined
                  ? yjsToCollaborationType(entry.newValue).toJSON()
                  : undefined,
            },
          ];
        }),
      ),
    };
  }

  private _handleYjsArrayEvent(
    event: Y.YArrayEvent<unknown>,
    transaction: Y.Transaction,
  ): CollaborationUpdateEventType<'array'> {
    return {
      target: new YjsCollaborationArray(event.target),
      path: event.path,
      origin: transaction.origin,
      delta: event.delta
        .map(action => {
          if (action.insert) {
            const inserted = action.insert;

            if (
              !Array.isArray(inserted) &&
              !(inserted instanceof Y.Map) &&
              !(inserted instanceof Y.Array) &&
              !(inserted instanceof Y.Text)
            ) {
              throw Error(`Invalid insertion into array!`);
            }

            if (Array.isArray(inserted)) {
              for (const insert of inserted) {
                if (
                  !Array.isArray(inserted) &&
                  !(insert instanceof Y.Map) &&
                  !(insert instanceof Y.Array) &&
                  !(insert instanceof Y.Text)
                ) {
                  throw Error(`Invalid insertion into array!`);
                }
              }
            }

            return {
              insert: Array.isArray(inserted)
                ? inserted.map(insert => yjsToCollaborationType(insert).toJSON())
                : yjsToCollaborationType(inserted).toJSON(),
            };
          }

          if (action.retain) {
            return { retain: action.retain };
          }

          if (action.delete) {
            return { delete: action.delete };
          }

          throw new Error('Invalid action!');
        })
        .filter(action => action !== undefined),
    };
  }

  private _handleYjsTextEvent(
    event: Y.YTextEvent,
    transaction: Y.Transaction,
  ):
    | CollaborationUpdateEventType<'number'>
    | CollaborationUpdateEventType<'string'>
    | CollaborationUpdateEventType<'boolean'> {
    const type = event.target.getAttribute('type') as unknown;

    if (type !== 'number' && type !== 'string' && type !== 'boolean') {
      throw new Error(`Cannot handle event for unknown type "${type}"!`);
    }

    switch (type) {
      case 'number':
        return {
          target: new YjsCollaborationNumber(event.target),
          path: event.path,
          origin: transaction.origin,
          newValue: JSON.parse(event.target.toJSON()),
        } satisfies CollaborationUpdateEventType<'number'>;
      case 'string':
        return {
          target: new YjsCollaborationString(event.target),
          path: event.path,
          origin: transaction.origin,
          changes: event.delta
            .map(action => {
              if (action.insert && typeof action.insert === 'string') {
                return { insert: action.insert };
              }

              if (action.retain) {
                return { retain: action.retain };
              }

              if (action.delete) {
                return { delete: action.delete };
              }

              throw new Error('Invalid action!');
            })
            .filter(action => action !== undefined),
        } satisfies CollaborationUpdateEventType<'string'>;
      case 'boolean':
        return {
          target: new YjsCollaborationBoolean(event.target),
          path: event.path,
          origin: transaction.origin,
          newValue: JSON.parse(event.target.toJSON()),
        } satisfies CollaborationUpdateEventType<'boolean'>;
    }
  }
}
