import {
    ActiveKeyModel,
    getModelName,
    KeyModel,
    RoleModel,
    ScopeModel,
    TokenModel,
    UserModel,
} from '../../src/database/model'
import assert from 'assert'

export default () =>
    describe('Model Tests', async function () {
        describe('getModelName', async function () {
            it('should return the correct name for the provided model', async function () {
                assert(getModelName(ActiveKeyModel) === 'Active Key')
                assert(getModelName(KeyModel) === 'Key')
                assert(getModelName(RoleModel) === 'Role')
                assert(getModelName(ScopeModel) === 'Scope')
                assert(getModelName(TokenModel) === 'Token')
                assert(getModelName(UserModel) === 'User')
                assert(getModelName(undefined as any) === 'Unknown')
            })
        })
    })
