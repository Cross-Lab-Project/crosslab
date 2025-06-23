import { logging } from '@crosslab/service-common';
import assert from 'assert';
import { randomUUID } from 'crypto';
import { describe } from 'mocha';
import superagent from 'superagent';
import { WebSocket } from 'ws';

import { initApp } from '../src/app';
import { config } from '../src/config';
import { validatePostRoomsOutput } from '../src/generated/requestValidation';
import { postRoomsRequestBodyType } from '../src/generated/signatures';
import { Room } from '../src/generated/types';
import { forwardingQueueMap, roomMap, webSocketMap } from '../src/globals';
import { ForwardingQueue } from '../src/methods/forwardingQueue';
import { roomUrlFromId } from '../src/methods/urlFromId';

describe('Forwarding Service Tests', function () {
  const url = config.BASE_URL + ':' + config.PORT;
  let server: ReturnType<typeof initApp> | undefined;

  before(function () {
    logging.init({ LOGGING: 'warn' });
    server = initApp();
  });

  after(function () {
    server?.close();
    for (const webSocket of webSocketMap.values()) {
      webSocket.close();
    }
  });

  it('should create a room', function (done) {
    superagent
      .post(url + '/rooms')
      .send({
        participants: [{ id: 'participant:1' }, { id: 'participant:2' }],
      } satisfies postRoomsRequestBodyType)
      .end((error, response) => {
        assert(!error, error);
        const responseJson = JSON.parse(response.text);
        const responseData = { status: response.status, body: responseJson };
        assert(validatePostRoomsOutput(responseData), 'response is not valid!');
        assert.strictEqual(responseData.status, 201);
        assert.strictEqual(responseJson.participants[0].id, 'participant:1');
        assert.strictEqual(responseJson.participants[1].id, 'participant:2');
        done();
      });
  });

  it('should allow websocket connections', async function () {
    const uuid = randomUUID();
    const room = {
      url: roomUrlFromId(uuid),
      participants: [{ id: 'participant:1' }, { id: 'participant:2' }],
    } satisfies Room;
    roomMap.set(uuid, room);

    for (const participant of room.participants) {
      forwardingQueueMap.set(
        `${uuid}:${participant.id}`,
        new ForwardingQueue(uuid, room.participants[0].id),
      );
    }

    const webSockets = room.participants.map(participant => {
      return new WebSocket(
        url +
          '/rooms/' +
          uuid +
          '?' +
          new URLSearchParams({ id: participant.id }).toString(),
      );
    });

    await Promise.all(
      webSockets.map(async webSocket => {
        await new Promise<void>((resolve, reject) => {
          webSocket.onerror = error => reject(error.error);
          webSocket.onopen = () => resolve();
        });
      }),
    );
  });

  it('should forward messages', async function () {
    const uuid = randomUUID();
    const room = {
      url: roomUrlFromId(uuid),
      participants: [{ id: 'participant:1' }, { id: 'participant:2' }],
    } satisfies Room;
    roomMap.set(uuid, room);

    for (const participant of room.participants) {
      forwardingQueueMap.set(
        `${uuid}:${participant.id}`,
        new ForwardingQueue(uuid, participant.id),
      );
    }

    const webSockets = room.participants.map(participant => {
      return new WebSocket(
        url +
          '/rooms/' +
          uuid +
          '?' +
          new URLSearchParams({ id: participant.id }).toString(),
      );
    });

    await Promise.all(
      webSockets.map(async webSocket => {
        await new Promise<void>((resolve, reject) => {
          webSocket.onerror = error => reject(error.error);
          webSocket.onopen = () => resolve();
        });
      }),
    );

    const messagePromise = Promise.all(
      webSockets.map(async webSocket => {
        await new Promise<void>((resolve, reject) => {
          webSocket.onerror = error => reject(error.error);
          webSocket.onmessage = message => {
            if (message.data === 'test') resolve();
            else reject('received wrong message');
          };
        });
      }),
    );

    for (const webSocket of webSockets) {
      webSocket.send('test');
    }

    await messagePromise;
  });

  it('should buffer messages', function (done) {
    const uuid = randomUUID();
    const room = {
      url: roomUrlFromId(uuid),
      participants: [{ id: 'participant:1' }, { id: 'participant:2' }],
    } satisfies Room;
    roomMap.set(uuid, room);

    for (const participant of room.participants) {
      forwardingQueueMap.set(
        `${uuid}:${participant.id}`,
        new ForwardingQueue(uuid, participant.id),
      );
    }

    const webSocket1 = new WebSocket(
      url +
        '/rooms/' +
        uuid +
        '?' +
        new URLSearchParams({ id: room.participants[0].id }).toString(),
    );

    webSocket1.onopen = () => {
      webSocket1.send('test', () => {
        const webSocket2 = new WebSocket(
          url +
            '/rooms/' +
            uuid +
            '?' +
            new URLSearchParams({ id: room.participants[1].id }).toString(),
        );

        webSocket2.onmessage = message => {
          if (message.data) done();
          else done(new Error('did not receive the correct message'));
        };
      });
    };
  });
});
