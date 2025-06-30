import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import { TypedEmitter } from 'tiny-typed-emitter';

import { YjsCollaborationProvider } from './collaborationProviders/index.js';
import {
  Awareness,
  AwarenessProvider,
  CollaborationProvider,
  CollaborationType,
  CollaborationUpdateEventType,
} from './collaborationTypes.js';
import { collaborationProtocol } from './protocol.js';

interface RoomEvents {
  update: (events: CollaborationUpdateEventType[]) => void;
}

export class Room extends TypedEmitter<RoomEvents> {
  // TODO: change depending on service direction
  private _participants: Map<
    string,
    CrossLabMessagingChannel<typeof collaborationProtocol, 'prosumer'>
  > = new Map();
  private _name: string;
  private _collaborationProvider: CollaborationProvider;
  private _awarenessProvider: AwarenessProvider;

  constructor(
    id: string,
    name: string,
    _collaborationProvider: 'yjs',
    initialValue: Record<string, unknown> = {},
  ) {
    super();
    this._name = name;
    this._awarenessProvider = new AwarenessProvider(id);
    this._collaborationProvider = new YjsCollaborationProvider(initialValue);

    this._awarenessProvider.on('update', (_changes, origin) => {
      for (const [id, participant] of this._participants.entries()) {
        if (id === origin) {
          continue;
        }

        participant.send({
          type: 'collaboration:awareness:update',
          content: {
            room: this._name,
            states: this._awarenessProvider.encodeStates(),
          },
        });
      }
    });

    this._collaborationProvider.on('update-message', update => {
      for (const participant of this._participants.values()) {
        participant.send({
          type: 'collaboration:message',
          content: { room: this._name, ...update },
        });
      }
    });

    this._collaborationProvider.on('update', events => {
      this.emit('update', events);
    });
  }

  get awareness(): Awareness {
    return {
      getLocalState: this._awarenessProvider.getLocalState.bind(this._awarenessProvider),
      getStates: this._awarenessProvider.getStates.bind(this._awarenessProvider),
      setLocalState: this._awarenessProvider.setLocalState.bind(this._awarenessProvider),
      setLocalStateField: this._awarenessProvider.setLocalStateField.bind(
        this._awarenessProvider,
      ),
      on: this._awarenessProvider.on.bind(this._awarenessProvider),
    };
  }

  // TODO: change depending on service direction
  addParticipant(
    participantId: string,
    messagingChannel: CrossLabMessagingChannel<typeof collaborationProtocol, 'prosumer'>,
  ) {
    this._participants.set(participantId, messagingChannel);
  }

  valueToCollaborationType(value: unknown): CollaborationType {
    return this._collaborationProvider.valueToCollaborationType(value);
  }

  executeTransaction(transaction: () => void, origin: unknown) {
    this._collaborationProvider.executeTransaction(transaction, origin);
  }

  async startSynchronization(participantId: string) {
    const participant = this._participants.get(participantId);
    if (!participant) {
      throw new Error(`Could not find participant with id "${participantId}"!`);
    }

    participant.on('message', async message => {
      if (!this._participants.has(participantId)) {
        return;
      }

      if (message.type === 'collaboration:awareness:update') {
        if (message.content.room !== this._name) {
          return;
        }
        this._awarenessProvider.applyUpdate(message.content.states, participantId);
        return;
      }

      if (message.type !== 'collaboration:message') {
        throw new Error(
          `Expected message of type "collaboration:message", got "${message.type}"`,
        );
      }

      if (message.content.room !== this._name) {
        return;
      }

      const response = await this._collaborationProvider.handleCollaborationMessage(
        message.content,
      );

      if (response) {
        await participant.send({
          type: 'collaboration:message',
          content: {
            room: this._name,
            ...response,
          },
        });
      }
    });

    const startMessage = this._collaborationProvider.startSynchronization();

    await participant.send({
      type: 'collaboration:message',
      content: {
        room: this._name,
        ...startMessage,
      },
    });
  }

  removeParticipant(participantId: string) {
    this._participants.delete(participantId);
  }

  get: CollaborationProvider['get'] = (key, type) => {
    return this._collaborationProvider.get(key, type);
  };
}
