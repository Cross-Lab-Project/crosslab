import {
  IncomingMessage,
  OutgoingMessage,
} from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
import {
  DataChannel,
  PeerConnection,
  Service,
  ServiceConfiguration,
  ServiceDirection,
} from '@cross-lab-project/soa-client';
import { Ajv } from 'ajv';
import { JSONSchema } from 'json-schema-to-ts';
import { TypedEmitter } from 'tiny-typed-emitter';
import { v4 as uuidv4 } from 'uuid';

import { testingProtocol } from './protocol';
import { Arguments, FunctionDescription, SimpleFromSchema } from './types';

interface TestingServiceProducerEvents {
  'new-consumer': (consumerId: string) => void;
  'start-testing': (consumerId: string, requestId: string) => void;
  'end-testing': (consumerId: string, requestId: string) => void;
  'call-function': (
    consumerId: string,
    requestId: string,
    functionName: string,
    args: unknown[],
  ) => void;
}

export class TestingServiceProducer
  extends TypedEmitter<TestingServiceProducerEvents>
  implements Service
{
  private _consumers: Map<
    string,
    CrossLabMessagingChannel<typeof testingProtocol, 'producer'>
  > = new Map();
  private _functions: Map<
    string,
    {
      argumentSchemas: JSONSchema[];
      returnValueSchema?: JSONSchema;
      validateArgs: (...args: unknown[]) => boolean;
      validateReturnValue: (returnValue: unknown) => boolean;
      executeFunction: (...args: unknown[]) => unknown;
    }
  > = new Map();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/testing';
  serviceId: string;
  serviceDirection: ServiceDirection = 'producer';

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
      functions: Array.from(
        Array.from(this._functions.entries()).map(([name, func]) => {
          return {
            name,
            argumentSchemas: func.argumentSchemas,
            returnValueSchema: func.returnValueSchema,
          };
        }),
      ) satisfies FunctionDescription[],
    };
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    // TODO: add checkConfig function
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      testingProtocol,
      'producer',
    );
    const consumerId = uuidv4();

    messagingChannel.on('message', message => this._handleMessage(consumerId, message));

    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }

    this._consumers.set(consumerId, messagingChannel);
    this.emit('new-consumer', consumerId);
  }

  async send(
    consumerId: string,
    message: OutgoingMessage<typeof testingProtocol, 'producer'>,
  ) {
    const messagingChannel = this._consumers.get(consumerId);

    if (!messagingChannel) {
      throw new Error(
        `Could not find messaging channel for consumer with id "${consumerId}"!`,
      );
    }

    await messagingChannel.send(message);
  }

  registerFunction<AS extends JSONSchema[], RS extends JSONSchema | undefined>(
    functionName: string,
    argumentSchemas: AS,
    returnValueSchema: RS,
    handler: (
      ...args: Arguments<AS>
    ) => RS extends JSONSchema ? SimpleFromSchema<RS> : void,
  ) {
    this._functions.set(functionName, {
      argumentSchemas,
      returnValueSchema,
      validateArgs: args => {
        console.log(args);

        const ajv = new Ajv();

        if (!Array.isArray(args)) {
          return false;
        }

        for (const [index, argumentSchema] of argumentSchemas.entries()) {
          if (!ajv.validate(argumentSchema, args[index])) {
            console.log(index, argumentSchema, args[index]);
            return false;
          }
        }

        return true;
      },
      validateReturnValue: returnValue => {
        const ajv = new Ajv();

        if (returnValueSchema) return ajv.validate(returnValueSchema, returnValue);

        return returnValue === undefined;
      },
      executeFunction: handler as (...args: unknown[]) => unknown,
    });
  }

  async executeFunction(functionName: string, ...args: unknown[]) {
    const func = this._functions.get(functionName);

    if (!func) {
      throw new Error(`Could not find a function named "${functionName}"!`);
    }

    if (!func.validateArgs(args)) {
      throw new Error(
        `The provided arguments for function "${functionName}" are invalid!`,
      );
    }

    const returnValue = await func.executeFunction(...args);

    if (!func.validateReturnValue(returnValue)) {
      throw new Error(`The value returned by function "${functionName}" is invalid!`);
    }

    return returnValue;
  }

  private _handleMessage(
    consumerId: string,
    message: IncomingMessage<typeof testingProtocol, 'producer'>,
  ) {
    switch (message.type) {
      case 'testing:start:request':
        return this.emit('start-testing', consumerId, message.content.requestId);
      case 'testing:end:request':
        return this.emit('end-testing', consumerId, message.content.requestId);
      case 'testing:function:call':
        return this.emit(
          'call-function',
          consumerId,
          message.content.requestId,
          message.content.functionName,
          message.content.args,
        );
    }
  }
}
