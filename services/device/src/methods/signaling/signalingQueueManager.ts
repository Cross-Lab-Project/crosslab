import { MissingEntityError, logger } from '@crosslab/service-common';

import { repositories } from '../../database/dataSource.js';
import { PeerconnectionModel } from '../../database/model.js';
import {
  ClosePeerconnectionMessage,
  CreatePeerconnectionMessage,
  SignalingMessage,
} from '../../generated/types.js';
import { peerconnectionUrlFromId } from '../urlFromId.js';
import { SignalingQueue } from './signalingQueue.js';

export class SignalingQueueManager {
  private queueMap: Map<
    string,
    {
      deviceA: { url: string; queue: SignalingQueue };
      deviceB: { url: string; queue: SignalingQueue };
    }
  >;
  private static instance: SignalingQueueManager;

  private constructor() {
    this.queueMap = new Map();
  }

  public static getInstance(): SignalingQueueManager {
    if (!SignalingQueueManager.instance) {
      SignalingQueueManager.instance = new SignalingQueueManager();
    }

    return SignalingQueueManager.instance;
  }

  public async createSignalingQueues(
    peerconnectionId: string,
    addCreateMessages: boolean,
  ) {
    const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId);

    logger.log(
      'info',
      `Trying to create signaling queues for peerconnection '${peerconnectionUrl}'`,
    );

    // TODO: change to more meaningful error
    if (this.queueMap.has(peerconnectionUrl))
      throw new Error(
        `Peerconnection '${peerconnectionUrl}' already has signaling queues`,
      );

    const peerconnectionModel = await repositories.peerconnection.findOneOrFail({
      where: {
        uuid: peerconnectionId,
      },
    });

    if (peerconnectionModel.status !== 'new') {
      logger.log(
        'info',
        `Status of peerconnection '${peerconnectionUrl}' is not 'new', '${peerconnectionModel.status}'`,
      );
      return;
    }

    // create SignalingQueues
    const queueDeviceA = new SignalingQueue(
      peerconnectionUrl,
      peerconnectionModel.deviceA.url,
    );

    const queueDeviceB = new SignalingQueue(
      peerconnectionUrl,
      peerconnectionModel.deviceB.url,
    );

    const queues = {
      deviceA: { url: peerconnectionModel.deviceA.url, queue: queueDeviceA },
      deviceB: { url: peerconnectionModel.deviceB.url, queue: queueDeviceB },
    };

    if (addCreateMessages)
      this.addCreatePeerconnectionMessages(
        peerconnectionModel,
        peerconnectionUrl,
        queues,
      );

    this.queueMap.set(peerconnectionUrl, queues);

    logger.log(
      'info',
      `Successfully created signaling queues for peerconnection '${peerconnectionUrl}'`,
    );
  }

  private async addCreatePeerconnectionMessages(
    peerconnectionModel: PeerconnectionModel,
    peerconnectionUrl: string,
    queues: {
      deviceA: { url: string; queue: SignalingQueue };
      deviceB: { url: string; queue: SignalingQueue };
    },
  ) {
    // prepare createPeerconnection messages
    const common = <CreatePeerconnectionMessage>{
      messageType: 'command',
      command: 'createPeerconnection',
      connectionType: peerconnectionModel.type,
      connectionUrl: peerconnectionUrl,
    };

    const createPeerConnectionMessageA: CreatePeerconnectionMessage = {
      ...common,
      services: peerconnectionModel.deviceA.config?.services ?? [],
      tiebreaker: true,
    };

    const createPeerConnectionMessageB: CreatePeerconnectionMessage = {
      ...common,
      services: peerconnectionModel.deviceB.config?.services ?? [],
      tiebreaker: false,
    };

    // add createPeerconnection messages
    queues.deviceA.queue.add(createPeerConnectionMessageA);
    queues.deviceB.queue.add(createPeerConnectionMessageB);
  }

  public startSignalingQueues(peerconnectionId: string) {
    const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId);
    const queues = this.queueMap.get(peerconnectionUrl);

    if (!queues)
      throw new MissingEntityError(
        `Peerconnection '${peerconnectionUrl}' does not have any associated signaling queues`,
        500,
      );

    queues.deviceA.queue.start();
    queues.deviceB.queue.start();
  }

  public stopSignalingQueues(peerconnectionId: string) {
    const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId);
    const queues = this.queueMap.get(peerconnectionUrl);

    if (!queues)
      throw new MissingEntityError(
        `Peerconnection '${peerconnectionUrl}' does not have any associated signaling queues`,
        500,
      );

    queues.deviceA.queue.stop();
    queues.deviceB.queue.stop();
  }

  public addSignalingMessage(
    peerconnectionUrl: string,
    deviceUrl: string,
    signalingMessage:
      | CreatePeerconnectionMessage
      | ClosePeerconnectionMessage
      | SignalingMessage,
  ) {
    const queues = this.queueMap.get(peerconnectionUrl);

    if (queues?.deviceA.url === deviceUrl)
      return queues.deviceA.queue.add(signalingMessage);
    if (queues?.deviceB.url === deviceUrl)
      return queues.deviceB.queue.add(signalingMessage);

    throw new MissingEntityError(
      `Peerconnection '${peerconnectionUrl}' does not have any associated signaling queue for device '${deviceUrl}'`,
      500,
    );
  }

  public async closeSignalingQueues(peerconnectionId: string) {
    const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId);
    const queues = this.queueMap.get(peerconnectionUrl);

    // TODO: change to more meaningful error
    if (!queues)
      throw new MissingEntityError(
        `Peerconnection '${peerconnectionUrl}' does not have any associated signaling queues`,
        500,
      );

    return Promise.all([queues.deviceA.queue.close(), queues.deviceB.queue.close()]);
  }

  public async deleteSignalingQueues(peerconnectionId: string) {
    const peerconnectionUrl = peerconnectionUrlFromId(peerconnectionId);
    const queues = this.queueMap.get(peerconnectionUrl);

    if (!queues) return;

    if (
      queues.deviceA.queue.state !== 'closed' ||
      queues.deviceB.queue.state !== 'closed'
    )
      await this.closeSignalingQueues(peerconnectionId);

    this.queueMap.delete(peerconnectionUrl);
  }
}

export const signalingQueueManager = SignalingQueueManager.getInstance();
