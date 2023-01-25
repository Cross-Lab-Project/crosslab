import { ScopeModel } from "../../src/database/model";
import { EntityData } from "./index.spec";

export const scopeNames = ["scope 1", "scope 2", "scope 3", "scope 4", "scope 5"] as const
export type ScopeName = typeof scopeNames[number]
export type ScopeData = Record<ScopeName, EntityData<ScopeModel>>

const scopeData: ScopeData = {
    "scope 1": {
        request: "test scope 1",
        model: {
            name: "test scope 1"
        },
        response: "test scope 1"
    },
    "scope 2": {
        request: "test scope 2",
        model: {
            name: "test scope 2"
        },
        response: "test scope 2"
    },
    "scope 3": {
        request: "test scope 3",
        model: {
            name: "test scope 3"
        },
        response: "test scope 3"
    },
    "scope 4": {
        request: "test scope 4",
        model: {
            name: "test scope 4"
        },
        response: "test scope 4"
    },
    "scope 5": {
        request: "test scope 5",
        model: {
            name: "test scope 5"
        },
        response: "test scope 5"
    }
}

export function resolveScope(scopeName: ScopeName): EntityData<ScopeModel> {
    return scopeData[scopeName]
}

export function prepareScopeData(): ScopeData {
    return scopeData
}