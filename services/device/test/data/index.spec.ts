import { DeviceRepository } from '../../src/database/repositories/device'
import { PeerconnectionRepository } from '../../src/database/repositories/peerconnection'
import { deviceData, DeviceName } from './devices/index.spec'
import { peerconnectionData, PeerconnectionName } from './peerconnections/index.spec'
import { GenericTestData } from '@crosslab/service-common'

export type TestData = GenericTestData<
    [
        ['devices', DeviceName, DeviceRepository],
        ['peerconnections', PeerconnectionName, PeerconnectionRepository]
    ]
>

export function prepareTestData(): TestData {
    return {
        devices: deviceData,
        peerconnections: peerconnectionData,
    }
}
