import {
  IncomingMessage,
  ProtocolMessage,
  isProtocolMessage,
} from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import { Directory, File } from '@cross-lab-project/filesystem-schemas';
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

import { FileSystemProtocol, fileSystemProtocol } from './protocol.js';

interface FileSystemWatcherEvents {
  changed: (path: string, entry: Directory['content'] | File['content']) => void;
  created: (path: string, content: Directory | File) => void;
  deleted: (path: string) => void;
  moved: (oldPath: string, newPath: string) => void;
}

interface FileSystemServiceConsumerEvents {
  'new-producer': (producerId: string) => void;
}

export class FileSystemServiceConsumer
  extends TypedEmitter<FileSystemServiceConsumerEvents>
  implements Service
{
  private _producers: Map<
    string,
    CrossLabMessagingChannel<FileSystemProtocol, 'consumer'>
  > = new Map();
  private _promiseManager: PromiseManager = new PromiseManager();
  private _fileSystemWatchers: Map<string, TypedEmitter<FileSystemWatcherEvents>> =
    new Map();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/filesystem';
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
      supportedConnectionTypes: ['webrtc', 'websocket'],
    };
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    // TODO: add checkConfig function
    const producerId = uuidv4();
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      fileSystemProtocol,
      'consumer',
    );
    messagingChannel.on('message', message => this._handleIncomingMessage(message));
    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }
    this._producers.set(producerId, messagingChannel);
    this.emit('new-producer', producerId);
  }

  private _handleIncomingMessage(
    message: IncomingMessage<FileSystemProtocol, 'consumer'>,
  ) {
    switch (message.type) {
      case 'createDirectory:response':
        this._promiseManager.resolve(message.content.requestId, message);
        break;
      case 'delete:response':
        this._promiseManager.resolve(message.content.requestId, message);
        break;
      case 'move:response':
        this._promiseManager.resolve(message.content.requestId, message);
        break;
      case 'readDirectory:response':
        this._promiseManager.resolve(message.content.requestId, message);
        break;
      case 'readFile:response':
        this._promiseManager.resolve(message.content.requestId, message);
        break;
      case 'unwatch:response':
        this._promiseManager.resolve(message.content.requestId, message);
        break;
      case 'watch:response':
        this._promiseManager.resolve(message.content.requestId, message);
        break;
      case 'watch-event': {
        const fileSystemWatcher = this._fileSystemWatchers.get(message.content.watcherId);

        switch (message.content.type) {
          case 'changed':
            fileSystemWatcher?.emit(
              'changed',
              message.content.path,
              message.content.newContent,
            );
            break;
          case 'moved':
            fileSystemWatcher?.emit(
              'moved',
              message.content.oldPath,
              message.content.newPath,
            );
            break;
          case 'created':
            fileSystemWatcher?.emit(
              'created',
              message.content.path,
              message.content.entry,
            );
            break;
          case 'deleted':
            fileSystemWatcher?.emit('deleted', message.content.path);
            break;
        }
        break;
      }
      case 'writeFile:response':
        this._promiseManager.resolve(message.content.requestId, message);
        break;
    }
  }

  async createDirectory(
    producerId: string,
    path: string,
    content?: (Directory | File)[],
  ) {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'createDirectory:request',
      content: { requestId, path, content },
    });

    const response = await promise;

    this._parseResponse(response, 'createDirectory:response');
  }

  async delete(producerId: string, path: string) {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'delete:request',
      content: { requestId, path },
    });

    const response = await promise;

    this._parseResponse(response, 'delete:response');
  }

  async move(producerId: string, path: string, newPath: string) {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'move:request',
      content: { requestId, path, newPath },
    });

    const response = await promise;

    this._parseResponse(response, 'move:response');
  }

  async copy(producerId: string, path: string, newPath: string) {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'copy:request',
      content: { requestId, path, newPath },
    });

    const response = await promise;

    this._parseResponse(response, 'copy:response');
  }

  async readDirectory(producerId: string, path: string): Promise<Directory> {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'readDirectory:request',
      content: { requestId, path },
    });

    const response = await promise;
    this._parseResponse(response, 'readDirectory:response');

    return response.content.directory;
  }

  async readFile(producerId: string, path: string): Promise<File> {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'readFile:request',
      content: { requestId, path },
    });

    const response = await promise;

    this._parseResponse(response, 'readFile:response');

    return response.content.file;
  }

  async watch(
    producerId: string,
    path?: string,
  ): Promise<TypedEmitter<FileSystemWatcherEvents>> {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'watch:request',
      content: { requestId, path },
    });

    const response = await promise;

    this._parseResponse(response, 'watch:response');

    const fileSystemWatcher = new TypedEmitter();

    this._fileSystemWatchers.set(response.content.watcherId, fileSystemWatcher);

    return fileSystemWatcher;
  }

  async writeFile(producerId: string, path: string, content: Uint8Array) {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'writeFile:request',
      content: { requestId, path, content: content as Uint8Array<ArrayBuffer> },
    });

    const response = await promise;

    this._parseResponse(response, 'writeFile:response');
  }

  async exists(producerId: string, path: string) {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'exists:request',
      content: { requestId, path },
    });

    const response = await promise;

    this._parseResponse(response, 'exists:response');

    return response.content.exists;
  }

  async stat(producerId: string, path: string) {
    const messagingChannel = this._producers.get(producerId);
    if (!messagingChannel) {
      throw new Error('No messaging channel has been set up!');
    }

    const requestId = uuidv4();
    const promise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'stat:request',
      content: { requestId, path },
    });

    const response = await promise;

    this._parseResponse(response, 'stat:response');

    return response.content.stat;
  }

  private _parseResponse<
    MT extends Exclude<
      IncomingMessage<FileSystemProtocol, 'consumer'>['type'],
      'watch-event'
    >,
  >(
    response: unknown,
    messageType: MT,
  ): asserts response is ProtocolMessage<FileSystemProtocol, MT> & {
    content: { success: true };
  } {
    if (!isProtocolMessage(fileSystemProtocol, messageType, response)) {
      throw new Error(`Did not receive response with expected type "${messageType}"!`);
    }

    if (!response.content.success) {
      throw new Error(
        `Request of type "${messageType.replace(
          'response',
          'request',
        )}" with id "${response.content.requestId}" was unsuccessful! ${
          response.content.message ? `Message: ${response.content.message}` : ''
        }`,
      );
    }
  }
}
