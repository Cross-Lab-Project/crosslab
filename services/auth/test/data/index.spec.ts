import { ActiveKeyRepository } from '../../src/database/repositories/activeKeyRepository'
import { KeyRepository } from '../../src/database/repositories/keyRepository'
import { RoleRepository } from '../../src/database/repositories/roleRepository'
import { ScopeRepository } from '../../src/database/repositories/scopeRepository'
import { TokenRepository } from '../../src/database/repositories/tokenRepository'
import { UserRepository } from '../../src/database/repositories/userRepository'
import { activeKeyData, ActiveKeyName } from './activeKeyData.spec'
import { keyData, KeyName } from './keyData.spec'
import { prepareRoleData, RoleName } from './roleData.spec'
import { prepareScopeData, ScopeName } from './scopeData.spec'
import { prepareTokenData, TokenName } from './tokenData.spec'
import { prepareUserData, UserName } from './userData.spec'
import { GenericTestData } from '@crosslab/service-common'

export type TestData = GenericTestData<
    [
        ['active keys', ActiveKeyName, ActiveKeyRepository],
        ['keys', KeyName, KeyRepository],
        ['roles', RoleName, RoleRepository],
        ['scopes', ScopeName, ScopeRepository],
        ['tokens', TokenName, TokenRepository],
        ['users', UserName, UserRepository]
    ]
>

export function prepareTestData(): TestData {
    const userData = prepareUserData()
    const roleData = prepareRoleData(userData)
    const tokenData = prepareTokenData(userData)
    const scopeData = prepareScopeData()
    return {
        'active keys': activeKeyData,
        'keys': keyData,
        'roles': roleData,
        'scopes': scopeData,
        'tokens': tokenData,
        'users': userData,
    }
}
