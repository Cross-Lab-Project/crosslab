import { Client as LdapClient } from 'ldapts'
import { AppDataSource } from '../data_source'
import {
    AuthenticationError,
    InconsistentDatabaseError,
    LdapAuthenticationError,
    LdapBindError,
    LdapError,
} from '../types/errors'
import { RoleModel, TokenModel, UserModel } from '../model'
import { compare } from 'bcryptjs'

/**
 * This function creates a token for a user.
 * @param user The user the token should be created for.
 * @param expiresIn Time until the token expires (default: one hour).
 * @returns Newly created token.
 */
async function createUserToken(
    user: UserModel,
    expiresIn: number = 3600000
): Promise<TokenModel> {
    const userRepository = AppDataSource.getRepository(UserModel)
    const tokenRepository = AppDataSource.getRepository(TokenModel)

    const token = tokenRepository.create()
    token.expiresOn = new Date(Date.now() + expiresIn).toISOString()
    if (!user.tokens) user.tokens = []
    user.tokens.push(token)
    await userRepository.save(user)

    return token
}

/**
 * This function creates a new user for logging in via the TUI ldap system.
 * @param username The username of the client for the TUI ldap system.
 * @returns The newly created TUI user.
 */
async function createUserTUI(username: string): Promise<UserModel> {
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)

    const user = userRepository.create()
    user.username = 'tui:' + username
    user.roles = [await roleRepository.findOneByOrFail({ name: 'user' })]
    user.tokens = []
    await userRepository.save(user)

    return user
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
export async function loginTui(
    username: string,
    password: string
): Promise<TokenModel | undefined> {
    const userRepository = AppDataSource.getRepository(UserModel)

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
    let user = await userRepository.findOne({
        where: {
            username: 'tui:' + username,
        },
        relations: {
            tokens: true,
        },
    })

    // Create new User if no User was found
    if (!user) {
        console.log(`User tui:${username} not found, creating new user`)
        user = await createUserTUI(username)
    }

    return await createUserToken(user)
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
): Promise<TokenModel | undefined> {
    const userRepository = AppDataSource.getRepository(UserModel)
    const user = await userRepository.findOne({
        where: {
            username: username,
        },
    })

    if (!user) throw new AuthenticationError(`Invalid login credentials`, 401)
    if (!user.password) throw new InconsistentDatabaseError(`User has no password`, 500)

    if (!(await compare(password, user.password)))
        throw new AuthenticationError(`Invalid login credentials`, 401)

    return await createUserToken(user)
}
