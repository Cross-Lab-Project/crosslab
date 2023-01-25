import { ActiveKeyModel, KeyModel, Model, ModelType, RoleModel, ScopeModel, TokenModel, UserModel } from "../../src/database/model"
import { activeKeyData, ActiveKeyName } from "./activeKeyData.spec"
import { keyData, KeyName } from "./keyData.spec"
import { prepareRoleData, RoleName } from "./roleData.spec"
import { prepareScopeData, ScopeName } from "./scopeData.spec"
import { prepareTokenData, TokenName } from "./tokenData.spec"
import { prepareUserData, UserName } from "./userData.spec"

export type ReplaceWith<T,P extends keyof RemoveIndex<T>,R> = { [K in keyof T]: K extends P ? R : T[K] }
export type RemoveIndex<T> = {
    [ K in keyof T as string extends K ? never : number extends K ? never : K ] : T[K]
}
export type SubstituteType<T, A, B> =
    T extends A
    ? B
    : T extends {}
    ? { [K in keyof T]: SubstituteType<T[K], A, B> }
    : T;
export type Subset<K> = {
    [attr in keyof K]?: K[attr] extends object
        ? Subset<K[attr]>
        : K[attr] extends object | null
        ? Subset<K[attr]> | null
        : K[attr] extends object | null | undefined
        ? Subset<K[attr]> | null | undefined
        : K[attr];
};

export const entityDataKeys = ["request","model","response"] as const
export interface EntityData<M extends Model> {
    request: ModelType<M, "request">
    model: M
    response: ModelType<M, "response">
}

export type EntityName<M extends Model> = M extends ActiveKeyModel 
    ? ActiveKeyName
    : M extends KeyModel
    ? KeyName
    : M extends RoleModel
    ? RoleName
    : M extends ScopeModel
    ? ScopeName
    : M extends TokenModel
    ? TokenName
    : M extends UserModel
    ? UserName
    : never

export type PartialTestData<M extends Model> = Record<EntityName<M>, EntityData<M>>



export interface TestData {
    activeKeys: PartialTestData<ActiveKeyModel>
    keys: PartialTestData<KeyModel>
    roles: PartialTestData<RoleModel>
    scopes: PartialTestData<ScopeModel>
    tokens: PartialTestData<TokenModel>
    users: PartialTestData<UserModel>
}

export function prepareTestData(): TestData {
    const userData = prepareUserData()
    const roleData = prepareRoleData(userData)
    const tokenData = prepareTokenData(userData)
    const scopeData = prepareScopeData()
    return {
        activeKeys: activeKeyData,
        keys: keyData,
        roles: roleData,
        scopes: scopeData,
        tokens: tokenData,
        users: userData,
    }
}

export function getFromTestData<M extends Model>(testData: TestData, model: { new(): M }): PartialTestData<M> {
    switch (model) {
        case ActiveKeyModel:
            return testData.activeKeys as any
        case KeyModel:
            return testData.keys as any
        case RoleModel:
            return testData.roles as any
        case ScopeModel:
            return testData.scopes as any
        case TokenModel:
            return testData.tokens as any
        case UserModel:
            return testData.users as any
        default:
            throw Error("No test data exists for the given model")
    }
}