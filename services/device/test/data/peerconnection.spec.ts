import { PeerconnectionRepository } from '../../src/database/repositories/peerconnection'
import { EntityData } from '@crosslab/service-common'

export const peerconnectionNames = ['example peerconnection'] as const
export type PeerconnectionName = (typeof peerconnectionNames)[number]
export type PeerconnectionData = Record<
    PeerconnectionName,
    EntityData<PeerconnectionRepository>
>

export const peerconnectionData: PeerconnectionData = {
    'example peerconnection': {
        request: {
            type: 'webrtc',
            devices: [
                { url: 'http://localhost/devices/32348c89-f302-408f-8582-cb9783c74fbb' },
                { url: 'http://localhost/devices/aa3272e6-6f4e-4d5b-a4a9-252d9bac9bd3' },
            ],
        },
        model: {
            uuid: '184f5ada-84fe-4d33-ab7d-22801be1a4ff',
            type: 'webrtc',
            status: 'waiting-for-devices',
            deviceA: {
                url: 'http://localhost/devices/32348c89-f302-408f-8582-cb9783c74fbb',
            },
            deviceB: {
                url: 'http://localhost/devices/aa3272e6-6f4e-4d5b-a4a9-252d9bac9bd3',
            },
        },
        response: {
            url: 'http://localhost/peeerconnections/184f5ada-84fe-4d33-ab7d-22801be1a4ff',
            type: 'webrtc',
            status: 'waiting-for-devices',
            devices: [
                { url: 'http://localhost/devices/32348c89-f302-408f-8582-cb9783c74fbb' },
                { url: 'http://localhost/devices/aa3272e6-6f4e-4d5b-a4a9-252d9bac9bd3' },
            ],
        },
    },
}
