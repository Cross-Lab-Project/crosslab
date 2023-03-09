import { ActiveKeyRepository } from '../../src/database/repositories/activeKeyRepository'
import { keyData } from './keyData.spec'
import { EntityData } from '@crosslab/service-common'

export const activeKeyNames = ['active key 1', 'GET /auth active key'] as const
export type ActiveKeyName = (typeof activeKeyNames)[number]
export type ActiveKeyData = Record<ActiveKeyName, EntityData<ActiveKeyRepository>>

export const activeKeyData: ActiveKeyData = {
    'active key 1': {
        request: {
            key: keyData['key 1'].model.uuid,
            use: 'sig',
        },
        model: {
            id: 1,
            key: keyData['key 1'].model,
            use: 'sig',
        },
        response: undefined,
    },
    'GET /auth active key': {
        request: {
            key: keyData['GET /auth key'].model.uuid,
            use: 'sig',
        },
        model: {
            id: 2,
            key: keyData['GET /auth key'].model,
            use: 'sig',
        },
        response: undefined,
    },
}
