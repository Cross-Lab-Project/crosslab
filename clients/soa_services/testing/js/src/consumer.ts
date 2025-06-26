import {
  IncomingMessage,
  isProtocolMessage,
} from '@cross-lab-project/abstract-messaging-channel';
import { CrossLabMessagingChannel } from '@cross-lab-project/crosslab-messaging-channel';
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
import { z } from 'zod';

import { testingProtocol } from './protocol.js';
import { Test, TestWithId, functionDescriptionSchema, testSchema } from './types.js';

const testingServiceConsumerConfigurationSchema = z.object({
  serviceType: z.string(),
  serviceId: z.string(),
  remoteServiceId: z.string(),
  remoteServiceDescription: z.object({
    functions: z.optional(z.array(functionDescriptionSchema)),
  }),
  producerId: z.string(),
  tests: z.optional(z.array(testSchema)),
});
type TestingServiceConsumerConfiguration = z.infer<
  typeof testingServiceConsumerConfigurationSchema
>;

interface TestingServiceConsumerEvents {
  'new-producer': (consumerId: string) => void;
  'new-test': (test: TestWithId) => void;
}

export class TestingServiceConsumer
  extends TypedEmitter<TestingServiceConsumerEvents>
  implements Service
{
  private _tests: Map<string, Test> = new Map();
  private _promiseManager: PromiseManager = new PromiseManager();
  private _producers: Map<
    string,
    CrossLabMessagingChannel<typeof testingProtocol, 'consumer'>
  > = new Map();
  serviceType: string = 'https://api.goldi-labs.de/serviceTypes/testing';
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
      supportedConnectionTypes: ['webrtc', 'websocket', 'local'],
    };
  }

  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void {
    const channel = new DataChannel();
    const messagingChannel = new CrossLabMessagingChannel(
      channel,
      testingProtocol,
      'consumer',
    );

    if (!this._checkServiceConfiguration(serviceConfig)) {
      console.log(serviceConfig);
      throw new Error(
        `The service configuration is not valid for a testing service consumer!`,
      );
    }

    this._parseTests(serviceConfig.tests ?? []);

    const producerId = serviceConfig.producerId;

    if (this._producers.has(producerId)) {
      throw new Error(`A producer with the id "${producerId}" is already registered!`);
    }

    messagingChannel.on('message', message => this._handleMessage(message));

    if (connection.tiebreaker) {
      connection.transmit(serviceConfig, 'data', channel);
    } else {
      connection.receive(serviceConfig, 'data', channel);
    }

    this._producers.set(producerId, messagingChannel);
    this.emit('new-producer', producerId);
  }

  async startTesting() {
    for (const [producerId, messagingChannel] of this._producers) {
      const requestId = uuidv4();

      const responsePromise = this._promiseManager.add(requestId);

      await messagingChannel.send({
        type: 'testing:start:request',
        content: {
          requestId,
        },
      });

      const response = await responsePromise;

      if (!isProtocolMessage(testingProtocol, 'testing:start:response', response)) {
        throw new Error(
          `Received response is not a valid "testing:start:response" message!`,
        );
      }

      if (!response.content.success) {
        throw new Error(
          `Something went wrong while trying to start testing for producer with id "${producerId}"` +
          response.content.message
            ? `: ${response.content.message}`
            : '!',
        );
      }
    }
  }

  async endTesting() {
    for (const [producerId, messagingChannel] of this._producers) {
      const requestId = uuidv4();

      const responsePromise = this._promiseManager.add(requestId);

      await messagingChannel.send({
        type: 'testing:end:request',
        content: {
          requestId,
        },
      });

      const response = await responsePromise;

      if (!isProtocolMessage(testingProtocol, 'testing:end:response', response)) {
        throw new Error(
          `Received response is not a valid "testing:end:response" message!`,
        );
      }

      if (!response.content.success) {
        throw new Error(
          `Something went wrong while trying to end testing for producer with id "${producerId}"` +
          response.content.message
            ? `: ${response.content.message}`
            : '!',
        );
      }
    }
  }

  async runTest(
    id: string,
  ): Promise<{ success: true } | { success: false; message: string }> {
    const test = this._tests.get(id);

    if (!test) {
      throw new Error(`Could not find test with id "${id}"!`);
    }

    for (const func of test.functions) {
      try {
        const returnValue = await this._callFunction(
          func.producerId,
          func.functionName,
          func.args,
        );

        if (func.expect !== undefined && returnValue !== func.expect) {
          return {
            success: false,
            message: `Expected return value ${func.expect}, received ${returnValue}`,
          };
        }
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : '',
        };
      }
    }

    return { success: true };
  }

  private async _callFunction(
    producerId: string,
    functionName: string,
    args: unknown[],
  ): Promise<unknown> {
    const messagingChannel = this._producers.get(producerId);

    if (!messagingChannel) {
      throw new Error(
        `Could not find messaging channel for producer with id "${producerId}"!`,
      );
    }

    const requestId = uuidv4();

    const responsePromise = this._promiseManager.add(requestId);

    await messagingChannel.send({
      type: 'testing:function:call',
      content: {
        requestId,
        functionName: functionName,
        args,
      },
    });

    const response = await responsePromise;

    if (!isProtocolMessage(testingProtocol, 'testing:function:return', response)) {
      throw new Error(
        `Received response is not a valid "testing:function:return" message!`,
      );
    }

    if (!response.content.success) {
      throw new Error(
        `Something went wrong while trying to call a function of producer with id "${producerId}"` +
        response.content.message
          ? `: ${response.content.message}`
          : '!',
      );
    }

    return response.content.returnValue;
  }

  private _handleMessage(message: IncomingMessage<typeof testingProtocol, 'consumer'>) {
    this._promiseManager.resolve(message.content.requestId, message);
  }

  private _checkServiceConfiguration(
    serviceConfiguration: ServiceConfiguration,
  ): serviceConfiguration is TestingServiceConsumerConfiguration {
    const result =
      testingServiceConsumerConfigurationSchema.safeParse(serviceConfiguration);

    console.log(result);

    return result.success;
  }

  addTest(test: Test): TestWithId {
    const id = uuidv4();

    this._tests.set(id, test);

    return {
      id,
      name: test.name,
      functions: test.functions,
      children: test.children?.map(child => this.addTest(child)),
    };
  }

  private _parseTests(tests: Test[]) {
    for (const test of tests) {
      const parsedTest = this.addTest(test);
      this.emit('new-test', parsedTest);
    }
  }
}
