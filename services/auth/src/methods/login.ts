import { Client as LdapClient } from 'ldapts'
import {
    AuthenticationError,
    LdapAuthenticationError,
    LdapBindError,
    LdapError,
} from '../types/errors'
import { TokenModel, UserModel } from '../database/model'
import { compare } from 'bcryptjs'
import { tokenRepository } from '../database/repositories/tokenRepository'
import { userRepository } from '../database/repositories/userRepository'
import { roleRepository } from '../database/repositories/roleRepository'

/**
 * This function creates a token for a user.
 * @param userModel The user the token should be created for.
 * @param expiresIn Time until the token expires (default: one hour).
 * @returns Newly created token.
 */
async function createUserToken(
    userModel: UserModel,
    expiresIn: number = 3600000
): Promise<TokenModel> {
    const tokenModel = await tokenRepository.create({
        user: userModel.username,
        scopes: userModel.roles
            .flatMap((roleModel) => roleModel.scopes)
            .map((scopeModel) => scopeModel.name)
            .filter((v, i, s) => s.indexOf(v) === i),
        expiresOn: new Date(Date.now() + expiresIn).toISOString(),
    })

    userModel.tokens.push(tokenModel)

    await userRepository.save(userModel)

    return tokenModel
}

/**
 * This function creates a new user for logging in via the TUI ldap system.
 * @param username The username of the client for the TUI ldap system.
 * @returns The newly created TUI user.
 */
async function createUserTUI(username: string): Promise<UserModel> {
    const userModel = await userRepository.create({
        username: 'tui:' + username,
        password: '',
    })
    const roleModelUser = await roleRepository.findOneOrFail({
        where: {
            name: 'user',
        },
    })
    userModel.roles = [roleModelUser]
    userModel.tokens = []
    await userRepository.save(userModel)

    return userModel
}

/**
 * This function attempts to login at the TUI Ldap system with the provided credentials.
 * @param username Username of the client.
 * @param password Password of the client.
 * @throws {LdapAuthenticationError} Thrown if using invalid credentials.
 * @throws {LdapBindError} Thrown if ldap bind fails.
 * @throws {LdapError} Thrown if ldap search does not return any entries.
 * @returns A token on successful login.
 */
export async function loginTui(username: string, password: string): Promise<TokenModel> {
    // Initialize Ldap Client
    const client = new LdapClient({
        url: 'ldaps://ldapauth.tu-ilmenau.de:636',
        tlsOptions: {
            minVersion: 'TLSv1',
        },
        timeout: 10000,
    })

    // Bind Ldap Client
    const dn = `cn=${username},ou=user,o=uni`
    try {
        await client.bind(dn, password)
    } catch (err: any) {
        if (err.code === 49) {
            throw new LdapAuthenticationError(
                'TUI ldap authentication failed because of invalid login credentials',
                401
            )
        } else {
            // TODO add better error messages for the other errors (e.g. host unreachable)
            throw new LdapBindError('TUI ldap bind operation failed', 500)
        }
    }

    // Make Ldap Search Request
    const searchResult = await client.search(dn)
    if (searchResult.searchEntries.length === 0) {
        throw new LdapError(
            `No entries found for dn "cn=${username},ou=user,o=uni" during ldap search`,
            401
        )
    }

    // Find User with matching Username
    let userModel = await userRepository.findOne({
        where: {
            username: 'tui:' + username,
        },
    })

    // Create new User if no User was found
    if (!userModel) {
        console.log(`User tui:${username} not found, creating new user`)
        userModel = await createUserTUI(username)
    }

    return await createUserToken(userModel)
}

/**
 * This function attempts to login with the provided credentials.
 * @param username Username of the client.
 * @param password Password of the client.
 * @throws {AuthenticationError} Thrown if credentials are invalid.
 * @throws {InconsistentDatabaseError} Thrown if user found in database has no password.
 * @returns A token on successful login.
 */
export async function loginLocal(
    username: string,
    password: string
): Promise<TokenModel> {
    const userModel = await userRepository.findOne({
        where: {
            username,
        },
    })

    if (!userModel) throw new AuthenticationError(`Invalid login credentials`, 401)

    if (!userModel.password)
        throw new AuthenticationError(
            `Password authentication not possible for this user`,
            401
        )

    if (!(await compare(password, userModel.password)))
        throw new AuthenticationError(`Invalid login credentials`, 401)

    return await createUserToken(userModel)
}
