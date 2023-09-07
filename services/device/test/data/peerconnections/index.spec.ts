import { PeerconnectionRepository } from '../../../src/database/repositories/peerconnection.js.ts";
import example_peerconnection from './example_peerconnection.spec.js';
import { EntityData } from '@crosslab/service-common/test-helper';

export const peerconnectionNames = ['example peerconnection'] as const;
export type PeerconnectionName = (typeof peerconnectionNames)[number];
export type PeerconnectionData = Record<
    PeerconnectionName,
    EntityData<PeerconnectionRepository>
>;

export const peerconnectionData: PeerconnectionData = {
    'example peerconnection': example_peerconnection,
};
