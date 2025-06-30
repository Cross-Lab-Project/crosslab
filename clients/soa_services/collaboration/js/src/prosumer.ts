import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import {
  DataChannel,
  PeerConnection,
  Service,
  ServiceConfiguration,
  ServiceDirection,
} from '@cross-lab-project/soa-client';
import { TypedEmitter } from 'tiny-typed-emitter';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import {
  CollaborationType,
  CollaborationTypeName,
  CollaborationUpdateEventType,
} from './collaborationTypes.js';
import { collaborationProtocol } from './protocol.js';
import { Room } from './room.js';

const serviceConfigurationSchema = z.object({
  serviceType: z.string(),
  serviceId: z.string(),
  remoteServiceId: z.string(),
  rooms: z.array(z.string()),
});
function checkServiceConfiguration(
  serviceConfiguration: ServiceConfiguration,
): serviceConfiguration is z.infer<typeof serviceConfigurationSchema> {
  return serviceConfigurationSchema.safeParse(serviceConfiguration).success;
}

type CollaborationServiceProsumerEvents = {
  'new-participant': (participantId: string) => void;
  update: (room: string, events: CollaborationUpdateEventType[]) => void;
};

export class CollaborationServiceProsumer
  extends TypedEmitter<CollaborationServiceProsumerEvents>
  implements Service
{
  private _prosumers: Map<
    string,
    CrossLabMessagingChannel<typeof collaborationProtocol, 'prosumer'>
  > = new Map();
  private _initialValues: Map<
    string,
    | Record<string, unknown>
    | Promise<Record<string, unknown>>
    | (() => Promise<Record<string, unknown>> | Record<string, unknown>)
  > = new Map();
  private _rooms: Map<string, Room> = new Map();
  private _id: string;
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/collaboration';
  serviceId: string;
  serviceDirection: ServiceDirection = 'prosumer';

  constructor(serviceId: string) {
    super();
    this.serviceId = serviceId;
    this._id = uuidv4();
  }

  get id() {
    return this._id;
  }

  getAwareness(roomName: string) {
    const room = this._rooms.get(roomName);
    if (!room) {
      throw new Error(`Room with name "${roomName}" could not be found!`);
    }
    return room.awareness;
  }

  hasRoom(roomName: string) {
    return this._rooms.has(roomName);
  }

  executeTransaction(roomName: string, transaction: () => void, origin: unknown) {
    const room = this._rooms.get(roomName);
    if (!room) {
      throw new Error(`Room with name "${roomName}" could not be found!`);
    }
    room.executeTransaction(transaction, origin);
  }

  valueToCollaborationType(roomName: string, value: unknown): CollaborationType {
    const room = this._rooms.get(roomName);
    if (!room) {
      throw new Error(`Room with name "${roomName}" could not be found!`);
    }
    return room.valueToCollaborationType(value);
  }

  setInitialValue(
    room: string,
    initialValue:
      | Record<string, unknown>
      | Promise<Record<string, unknown>>
      | (() => Promise<Record<string, unknown>> | Record<string, unknown>),
  ) {
    this._initialValues.set(room, initialValue);
  }

  createRoom(
    roomName: string,
    collaborationProvider: 'yjs',
    initialValue?: Record<string, unknown>,
  ) {
    const room = new Room(this._id, roomName, collaborationProvider, initialValue);
    room.on('update', events => {
      this.emit('update', roomName, events);
    });
    this._rooms.set(roomName, room);
  }

  getCollaborationValue<T extends CollaborationTypeName>(
    roomName: string,
    key: string,
    type: T,
  ) {
    const room = this._rooms.get(roomName);
    if (!room) {
      throw new Error(`Room with name "${roomName}" could not be found!`);
    }
    return room.get(key, type);
  }

  getMeta() {
    return {
      serviceId: this.serviceId,
      serviceType: this.serviceType,
      serviceDirection: this.serviceDirection,
      supportedConnectionTypes: ['webrtc', 'websocket', 'local'],
    };
  }

  setupConnection(
    connection: PeerConnection,
    serviceConfiguration: ServiceConfiguration,
  ): void {
    // TODO: add checkConfig function
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      collaborationProtocol,
      'prosumer',
    );

    if (!checkServiceConfiguration(serviceConfiguration)) {
      throw new Error('Service configuration is invalid!');
    }

    const initializationRequestPromise =
      this._receiveInitializationRequest(messagingChannel);

    messagingChannel.once('ready', async () => {
      await messagingChannel.send({
        type: 'collaboration:initialization:request',
        content: {
          id: this._id,
        },
      });
      const [prosumerId, initializationResponsePromise] =
        await initializationRequestPromise;

      this.emit('new-participant', prosumerId);

      for (const roomName of serviceConfiguration.rooms) {
        if (!this._rooms.has(roomName)) {
          const initialValue = this._initialValues.get(roomName);
          const room = new Room(
            this._id,
            roomName,
            'yjs',
            typeof initialValue === 'function'
              ? await initialValue()
              : await initialValue,
          );
          room.on('update', events => {
            this.emit('update', roomName, events);
          });
          this._rooms.set(roomName, room);
        }
        const room = this._rooms.get(roomName);
        if (!room) {
          throw new Error(`Room with name "${roomName}" could not be found!`);
        }
        room.addParticipant(prosumerId, messagingChannel);
      }

      await messagingChannel.send({
        type: 'collaboration:initialization:response',
        content: undefined,
      });

      await initializationResponsePromise;

      for (const roomName of serviceConfiguration.rooms) {
        const room = this._rooms.get(roomName);
        if (!room) {
          throw new Error(`Room with name "${roomName}" could not be found!`);
        }
        room.startSynchronization(prosumerId);
      }
    });

    messagingChannel.on('close', () => {});

    if (connection.tiebreaker) {
      connection.transmit(serviceConfiguration, 'data', channel);
    } else {
      connection.receive(serviceConfiguration, 'data', channel);
    }
  }

  private _receiveInitializationRequest(
    messagingChannel: CrossLabMessagingChannel<typeof collaborationProtocol, 'prosumer'>,
  ): Promise<[string, Promise<void>]> {
    return new Promise<[string, Promise<void>]>((resolve, reject) => {
      messagingChannel.once('message', message => {
        if (message.type !== 'collaboration:initialization:request') {
          return reject(
            `Expected first message to be of type "collaboration:initialization:request", instead received "${message.type}"!`,
          );
        }
        this._prosumers.set(message.content.id, messagingChannel);
        resolve([
          message.content.id,
          this._receiveInitializationResponse(messagingChannel),
        ]);
      });
    });
  }

  private async _receiveInitializationResponse(
    messagingChannel: CrossLabMessagingChannel<typeof collaborationProtocol, 'prosumer'>,
  ) {
    return new Promise<void>((resolve, reject) => {
      messagingChannel.once('message', message => {
        if (message.type !== 'collaboration:initialization:response') {
          return reject(
            `Expected second message to be of type "collaboration:initialization:response", instead received "${message.type}"!`,
          );
        }
        resolve();
      });
    });
  }
}
