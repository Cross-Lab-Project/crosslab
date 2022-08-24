import { Client as LdapClient } from "ldapts"
import { AppDataSource } from "../data_source"
import { RoleModel, TokenModel, UserModel } from "../model"

export async function loginTui(username: string, password: string): Promise<TokenModel|undefined> {
    const HOUR = 60 * 60 * 1000
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)
    const tokenRepository = AppDataSource.getRepository(TokenModel)

    const client = new LdapClient({
        url: "ldaps://ldapauth.tu-ilmenau.de:636", tlsOptions: {
            minVersion: 'TLSv1'
        }, 
        timeout: 10000
    });

    const dn = `cn=${username},ou=user,o=uni`;
    try {
        await client.bind(dn, password)
    } catch(err: any) {
        if (err.code === 49) {
            console.error("Ldap authentication failed because of wrong login credentials")
            return undefined
        } else {
            console.error("Ldap bind failed")
            throw err
        }
    }

    const searchResult = await client.search(dn)

    if (searchResult.searchEntries.length === 0) {
        console.error("No entries found during ldap search")
        return undefined
    }

    let user = await userRepository.findOne({ 
        where: {
            username: "tui:" + username 
        },
        relations: {
            tokens: true
        }
    });

    if (!user) {
        console.log(`User tui:${username} not found, creating new user`)
        user = userRepository.create()
        user.username = "tui:" + username
        user.roles = [await roleRepository.findOneByOrFail({ name: "user" })]
        user.tokens = []
    }
    if (!user.tokens) user.tokens = []
    if (!user.roles) user.roles = [await roleRepository.findOneByOrFail({ name: "user" })]
    const token = tokenRepository.create()
    token.expiresOn = new Date(Date.now() + HOUR).toISOString()
    user.tokens.push(token)

    await userRepository.save(user)
    return token
}