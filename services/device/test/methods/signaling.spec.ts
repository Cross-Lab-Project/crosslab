import { logger } from '@crosslab/service-common';
import assert from 'assert';
import seedrandom from 'seedrandom';
import * as sinon from 'sinon';

import { repositories } from '../../src/database/dataSource';
import { PeerconnectionModel } from '../../src/database/model';
import { apiClient } from '../../src/globals';
import { signalingQueue } from '../../src/methods/signaling';
import { peerconnectionUrlFromId } from '../../src/methods/urlFromId';

export default () =>
  xdescribe('signaling methods', function () {
    describe('signalingQueue', function () {
      let peerconnectionModels: (PeerconnectionModel & {
        signalingStarted: boolean;
      })[];
      let findOneOrFailStub: sinon.SinonStub<
        Parameters<typeof repositories.peerconnection.findOneOrFail>,
        ReturnType<typeof repositories.peerconnection.findOneOrFail>
      >;
      let saveStub: sinon.SinonStub<
        Parameters<typeof repositories.peerconnection.save>,
        ReturnType<typeof repositories.peerconnection.save>
      >;
      let sendSignalingMessageStub: sinon.SinonStub<
        Parameters<typeof apiClient.sendSignalingMessage>,
        ReturnType<typeof apiClient.sendSignalingMessage>
      >;
      let loggerLogStub: sinon.SinonStub<
        Parameters<typeof logger.log>,
        ReturnType<typeof logger.log>
      >;

      this.beforeAll(function () {
        peerconnectionModels = Array.from(Array(100).keys()).map(n => {
          return {
            uuid: n.toString(),
            type: n % 2 === 0 ? 'webrtc' : 'local',
            status: 'new',
            deviceA: {
              status: 'new',
              url: `http://localhost/devices/${n}/a`,
            },
            deviceB: {
              status: 'new',
              url: `http://localhost/devices/${n}/b`,
            },
            signalingStarted: false,
          };
        });
        findOneOrFailStub = sinon.stub(peerconnectionRepository, 'findOneOrFail');
        saveStub = sinon.stub(peerconnectionRepository, 'save');
        sendSignalingMessageStub = sinon.stub(apiClient, 'sendSignalingMessage');
        loggerLogStub = sinon.stub(logger, 'log');
      });

      this.afterEach(function () {
        findOneOrFailStub.reset();
        saveStub.reset();
        sendSignalingMessageStub.reset();
        loggerLogStub.reset();
      });

      this.afterAll(function () {
        findOneOrFailStub.restore();
        saveStub.restore();
        sendSignalingMessageStub.restore();
        loggerLogStub.restore();
      });

      function addPeerconnections() {
        const rng = seedrandom('test');
        for (let i = 0; i < 10 * peerconnectionModels.length; i++) {
          const index = Math.floor(rng() * peerconnectionModels.length);
          assert(peerconnectionModels[index]);
          signalingQueue.addPeerconnection(peerconnectionModels[index]);
        }
      }

      function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      function findDevice(peerconnectionModel: PeerconnectionModel, device: 'a' | 'b') {
        return sendSignalingMessageStub.args.find(
          args =>
            args[0] ===
              `http://localhost/devices/${peerconnectionModel.uuid}/${device}` &&
            args[1].messageType === 'command' &&
            args[1].command === 'createPeerconnection' &&
            args[1].connectionType === peerconnectionModel.type &&
            args[1].connectionUrl === peerconnectionUrlFromId(peerconnectionModel.uuid) &&
            JSON.stringify(args[1].services) ===
              JSON.stringify(peerconnectionModel.deviceA.config?.services ?? []) &&
            args[1].tiebreaker === (device === 'b') &&
            args[2] === peerconnectionUrlFromId(peerconnectionModel.uuid),
        );
      }

      it('should correctly handle added peerconnections', async function () {
        findOneOrFailStub.callsFake(async options => {
          assert(typeof options.where === 'object');
          assert(!Array.isArray(options.where));
          assert(typeof options.where.uuid === 'string');
          return peerconnectionModels[parseInt(options.where.uuid)];
        });
        saveStub.callsFake(
          async (
            peerconnectionModel: PeerconnectionModel & {
              signalingStarted?: boolean;
            },
          ) => {
            assert(peerconnectionModel.status === 'connecting');
            assert(peerconnectionModel.signalingStarted === false);
            peerconnectionModel.signalingStarted = true;
            return peerconnectionModel;
          },
        );

        addPeerconnections();
        while (!signalingQueue.isEmpty()) {
          await sleep(20);
        }

        assert(saveStub.callCount === peerconnectionModels.length);
        assert(sendSignalingMessageStub.callCount === 2 * peerconnectionModels.length);

        for (const peerconnectionModel of peerconnectionModels) {
          assert(saveStub.args.find(args => args[0].uuid === peerconnectionModel.uuid));
          assert(findDevice(peerconnectionModel, 'a'));
          assert(findDevice(peerconnectionModel, 'b'));
        }
      });

      it('should log errors of peerconnectionRepository.findOneOrFail', async function () {
        const error = new Error('Test Error');
        findOneOrFailStub.rejects(error);
        signalingQueue.addPeerconnection(peerconnectionModels[0]);
        while (!signalingQueue.isEmpty()) {
          await sleep(20);
        }
        assert(findOneOrFailStub.calledOnce);
        assert(loggerLogStub.lastCall.args[0] === 'error');
      });

      it('should log errors of peerconnectionRepository.save', async function () {
        const error = new Error('Test Error');
        findOneOrFailStub.resolves(peerconnectionModels[0]);
        saveStub.rejects(error);
        peerconnectionModels[0].status = 'new';
        signalingQueue.addPeerconnection(peerconnectionModels[0]);
        while (!signalingQueue.isEmpty()) {
          await sleep(20);
        }
        assert(saveStub.calledOnce);
        assert(loggerLogStub.lastCall.args[0] === 'error');
      });

      it('should log errors of first apiClient.sendSignalingMessage', async function () {
        const error = new Error('Test Error');
        findOneOrFailStub.resolves(peerconnectionModels[0]);
        sendSignalingMessageStub.onFirstCall().rejects(error);
        peerconnectionModels[0].status = 'new';
        signalingQueue.addPeerconnection(peerconnectionModels[0]);
        while (!signalingQueue.isEmpty()) {
          await sleep(20);
        }
        assert(sendSignalingMessageStub.calledOnce);
        assert(loggerLogStub.lastCall.args[0] === 'error');
      });

      it('should log errors of second apiClient.sendSignalingMessage', async function () {
        const error = new Error('Test Error');
        findOneOrFailStub.resolves(peerconnectionModels[0]);
        sendSignalingMessageStub.onSecondCall().rejects(error);
        peerconnectionModels[0].status = 'new';
        signalingQueue.addPeerconnection(peerconnectionModels[0]);
        while (!signalingQueue.isEmpty()) {
          await sleep(20);
        }
        assert(sendSignalingMessageStub.callCount === 2);
        assert(loggerLogStub.lastCall.args[0] === 'error');
      });
    });

    // describe('startSignaling', function () {})
  });
