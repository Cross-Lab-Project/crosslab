import { EntityData } from '@crosslab/service-common/test-helper';

import { PeerconnectionRepository } from '../../../src/database/repositories/peerconnection';
import example_peerconnection from './example_peerconnection.spec.js';

export const peerconnectionNames = ['example peerconnection'] as const;
export type PeerconnectionName = (typeof peerconnectionNames)[number];
export type PeerconnectionData = Record<
  PeerconnectionName,
  EntityData<PeerconnectionRepository>
>;

export const peerconnectionData: PeerconnectionData = {
  'example peerconnection': example_peerconnection,
};
