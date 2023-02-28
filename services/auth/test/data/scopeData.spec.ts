import { ScopeModel } from '../../src/database/model'
import { EntityData } from './index.spec'

export const scopeNames = ['scope 1', 'scope 2', 'scope 3', 'scope 4', 'scope 5'] as const
export type ScopeName = (typeof scopeNames)[number]
export type ScopeData = Record<ScopeName, EntityData<ScopeModel>>

const scopeData: ScopeData = {
    'scope 1': {
        request: 'scope 1',
        model: {
            name: 'scope 1',
        },
        response: 'scope 1',
    },
    'scope 2': {
        request: 'scope 2',
        model: {
            name: 'scope 2',
        },
        response: 'scope 2',
    },
    'scope 3': {
        request: 'scope 3',
        model: {
            name: 'scope 3',
        },
        response: 'scope 3',
    },
    'scope 4': {
        request: 'scope 4',
        model: {
            name: 'scope 4',
        },
        response: 'scope 4',
    },
    'scope 5': {
        request: 'scope 5',
        model: {
            name: 'scope 5',
        },
        response: 'scope 5',
    },
}

export function resolveScope(scopeName: ScopeName): EntityData<ScopeModel> {
    return scopeData[scopeName]
}

export function prepareScopeData(): ScopeData {
    return scopeData
}
