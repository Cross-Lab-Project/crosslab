import { EntityData } from '@crosslab/service-common/test-helper';

import { PeerconnectionModel } from '../../../src/database/model.js';
import { PeerconnectionRepository } from '../../../src/database/repositories/peerconnection.js';
import { ExperimentModelWithLinks, ExperimentName } from '../experiments/index.spec.js';
import { ReplaceWithIteratively, TestDataWithLinks } from '../index.spec.js';
import { example_peerconnection } from './example_peerconnection.spec.js';

export const peerconnectionNames = ['example peerconnection'] as const;
export type PeerconnectionName = (typeof peerconnectionNames)[number];
export type PeerconnectionData = Record<
  PeerconnectionName,
  EntityData<PeerconnectionRepository>
>;

export type PeerconnectionModelWithLinks = ReplaceWithIteratively<
  PeerconnectionModel,
  ['experiment'],
  [ExperimentName]
>;
export type PeerconnectionEntityDataWithLinks = {
  request: string;
  model: PeerconnectionModelWithLinks;
  response: string;
};
export type PeerconnectionDataWithLinks = Record<
  PeerconnectionName,
  PeerconnectionEntityDataWithLinks
>;

export const peerconnectionDataWithLinks: PeerconnectionDataWithLinks = {
  'example peerconnection': { ...example_peerconnection },
};

export function resolveLinksPeerconnectionData(testData: TestDataWithLinks) {
  for (const peerconnectionName of peerconnectionNames) {
    const peerconnection = testData.peerconnections[peerconnectionName];

    // resolve model.experiment
    const modelExperimentName = peerconnection.model.experiment;
    (peerconnection.model.experiment as unknown as ExperimentModelWithLinks) =
      testData.experiments[modelExperimentName].model;
  }
}
