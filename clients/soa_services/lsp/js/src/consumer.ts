import {
  IncomingMessage,
  ProtocolMessage,
  isProtocolMessage,
} from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import {
  Directory,
  DirectoryWithoutName,
  FileWithoutName,
} from '@cross-lab-project/filesystem-schemas';
import { PromiseManager } from '@cross-lab-project/promise-manager';
import {
  DataChannel,
  PeerConnection,
  Service,
  ServiceConfiguration,
  ServiceDirection,
} from '@cross-lab-project/soa-client';
import { TypedEmitter } from 'tiny-typed-emitter';
import { v4 as uuidv4 } from 'uuid';

import {
  LanguageServerMessagingProtocol,
  languageServerMessagingProtocol,
} from './protocol';

export interface LanguageServerConsumerEvents {
  'new-producer': (producerId: string) => void;
  'filesystem:event:create': () => void;
  'filesystem:event:change': () => void;
  'filesystem:event:delete': () => void;
  message: (
    producerId: string,
    message: IncomingMessage<LanguageServerMessagingProtocol, 'client'>,
  ) => void;
}

export class LanguageServerConsumer
  extends TypedEmitter<LanguageServerConsumerEvents>
  implements Service
{
  private _producers: Map<
    string,
    CrossLabMessagingChannel<LanguageServerMessagingProtocol, 'client'>
  > = new Map();
  private _promiseManager: PromiseManager = new PromiseManager();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/lsp';
  serviceId: string;
  serviceDirection: ServiceDirection = 'consumer';

  constructor(serviceId: string) {
    super();
    this.serviceId = serviceId;
  }

  getMeta() {
    return {
      serviceId: this.serviceId,
      serviceType: this.serviceType,
      serviceDirection: this.serviceDirection,
      supportedConnectionTypes: ['websocket', 'webrtc', 'local'],
    };
  }

  setupConnection(
    connection: PeerConnection,
    serviceConfiguration: ServiceConfiguration,
  ): void {
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      languageServerMessagingProtocol,
      'client',
    );

    const producerId = uuidv4();
    this._producers.set(producerId, messagingChannel);

    messagingChannel.once('ready', async () => {
      this.emit('new-producer', producerId);

      messagingChannel.on('message', message => {
        if (message.type === 'lsp:filesystem:read:response') {
          return this._promiseManager.resolve(message.content.requestId, message);
        }
        if (message.type === 'lsp:initialization:response') {
          return this._promiseManager.resolve(`initialization:${producerId}`, message);
        }
        this.emit('message', producerId, message);
      });
    });

    messagingChannel.on('close', () => {});

    if (connection.tiebreaker) {
      connection.transmit(serviceConfiguration, 'data', channel);
    } else {
      connection.receive(serviceConfiguration, 'data', channel);
    }
  }

  async readFile(producerId: string, path: string) {
    const producer = this._producers.get(producerId);
    if (!producer) {
      throw new Error(`Could not find producer with id "${producerId}"!`);
    }

    const requestId = uuidv4();

    const responsePromise = this._promiseManager.add(requestId);

    await producer.send({
      type: 'lsp:filesystem:read:request',
      content: {
        requestId,
        path,
      },
    });

    const response = await responsePromise;

    if (
      !isProtocolMessage(
        languageServerMessagingProtocol,
        'lsp:filesystem:read:response',
        response,
      )
    ) {
      throw new Error(
        `Did not receive valid response of type "lsp:filesystem:read:response"!`,
      );
    }

    if (!response.content.success) {
      throw new Error(
        response.content.message ??
          `Something went wrong while trying to delete entry at path "${path}" of producer "${producerId}"!`,
      );
    }

    return response.content;
  }

  async sendLspMessage(producerId: string, message: string) {
    const producer = this._producers.get(producerId);
    if (!producer) {
      throw new Error(`Could not find producer with id "${producerId}"!`);
    }

    await producer.send({
      type: 'lsp:message',
      content: message,
    });
  }

  async initialize(
    producerId: string,
    sourceDirectory: Directory,
    sourceUrl: string,
  ): Promise<
    ProtocolMessage<
      LanguageServerMessagingProtocol,
      'lsp:initialization:response'
    >['content']
  > {
    const producer = this._producers.get(producerId);
    if (!producer) {
      throw new Error(`Could not find producer with id "${producerId}"!`);
    }

    const initializationResponsePromise = this._promiseManager.add(
      `initialization:${producerId}`,
    );

    await producer.send({
      type: 'lsp:initialization:request',
      content: {
        sourceDirectory,
        sourceUri: sourceUrl,
      },
    });

    const initializationResponse = await initializationResponsePromise;

    if (
      !isProtocolMessage(
        languageServerMessagingProtocol,
        'lsp:initialization:response',
        initializationResponse,
      )
    ) {
      throw new Error(`Expected response of type "lsp:initialization:response"!`);
    }

    return initializationResponse.content;
  }

  async sendFilesystemEvent(
    producerId: string,
    event:
      | {
          type: 'created';
          path: string;
          entry: FileWithoutName | DirectoryWithoutName;
        }
      | {
          type: 'changed';
          path: string;
          entry: FileWithoutName | DirectoryWithoutName;
        }
      | { type: 'deleted'; path: string },
  ) {
    const producer = this._producers.get(producerId);
    if (!producer) {
      throw new Error(`Could not find producer with id "${producerId}"!`);
    }

    switch (event.type) {
      case 'created':
        return await producer.send({
          type: 'lsp:filesystem:event:created',
          content: {
            path: event.path,
            entry: event.entry,
          },
        });
      case 'changed':
        return await producer.send({
          type: 'lsp:filesystem:event:changed',
          content: {
            path: event.path,
            entry: event.entry,
          },
        });
      case 'deleted':
        return await producer.send({
          type: 'lsp:filesystem:event:deleted',
          content: {
            path: event.path,
          },
        });
    }
  }
}
