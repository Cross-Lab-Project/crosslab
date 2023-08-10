import { InternalServerError } from '@crosslab/service-common'
import * as ldapts from 'ldapts'

/**
 * This function attempts to login at the TUI Ldap system with the provided credentials.
 * @param username Username of the client.
 * @param password Password of the client.
 * @throws {LdapBindError} Thrown if ldap bind fails.
 * @returns true if the credentials are valid, false otherwise.
 */
export async function loginTui(username: string, password: string): Promise<boolean> {
    // Initialize Ldap Client
    const client = new ldapts.Client({
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
    } catch (err) {
        if (err instanceof ldapts.InvalidCredentialsError) {
            return false
        } else if (err instanceof Error) {
            throw new InternalServerError('Ldap bind failed', err)
        } else{
            throw new InternalServerError('Ldap bind failed')
        }
    }

    // Make Ldap Search Request
    const searchResult = await client.search(dn)
    if (searchResult.searchEntries.length === 0) {
        return false
    }

    return true
}
