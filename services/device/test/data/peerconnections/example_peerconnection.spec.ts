import { EntityData } from '@crosslab/service-common/test-helper';

import { PeerconnectionRepository } from '../../../src/database/repositories/peerconnection';
import { peerconnectionUrlFromId } from '../../../src/methods/urlFromId';

const uuid = '184f5ada-84fe-4d33-ab7d-22801be1a4ff';
const type = 'webrtc';
const urlDeviceA = 'http://localhost/devices/32348c89-f302-408f-8582-cb9783c74fbb';
const urlDeviceB = 'http://localhost/devices/aa3272e6-6f4e-4d5b-a4a9-252d9bac9bd3';
const status = 'new';

const example_peerconnection: EntityData<PeerconnectionRepository> = {
  request: {
    type,
    devices: [{ url: urlDeviceA }, { url: urlDeviceB }],
  },
  model: {
    uuid,
    type,
    status,
    deviceA: { url: urlDeviceA, status: 'new' },
    deviceB: { url: urlDeviceB, status: 'new' },
  },
  response: {
    url: peerconnectionUrlFromId(uuid),
    type,
    status,
    devices: [{ url: urlDeviceA }, { url: urlDeviceB }],
  },
};

export default example_peerconnection;
