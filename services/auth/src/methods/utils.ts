import { generateKeyPair, exportJWK, JWK } from 'jose'
import { AppDataSource } from '../data_source'
import { UserModel, KeyModel, RoleModel } from '../model'
import dns from 'dns'
import { User } from '../generated/types'
import {
    DNSResolveError,
    MalformedAllowlistEntryError,
    MissingEntityError,
} from '../types/errors'

/**
 * This function tries to resolve an entry of the allowlist.
 * @param entry Entry of the allowlist ("url":username") to be resolved.
 * @returns Resolved entry in the form "ip:username"
 */
export async function resolveAllowlistEntry(entry: string): Promise<[string, string]> {
    console.log(`resolveAllowlistEntry called for "${entry}"`)
    const userRepository = AppDataSource.getRepository(UserModel)

    let url: string = ''
    let username: string = ''

    // Split provided entry into its url and username components
    if (entry.includes(':')) {
        const split = entry.split(':')
        if (split.length === 2) {
            ;[url, username] = split
        } else {
            throw new MalformedAllowlistEntryError(
                `Allowlist entry "${entry}" does not conform to format "url:username"`
            )
        }
    }
    if (!url) throw new MalformedAllowlistEntryError(`Could not extract url from entry`)
    if (!username)
        throw new MalformedAllowlistEntryError(
            `Could not extract username from allowlist entry`
        )

    // Resolve the ip of the provided url
    const ip = await new Promise<string>((res) => {
        dns.resolve4(url, (err, addresses) => {
            if (err || addresses.length === 0 || !addresses) res('')
            res(addresses[0])
        })
    })
    if (!ip) throw new DNSResolveError(`Could not resolve ip for "${url}"`)

    // Search the user with the provided username
    const user = await userRepository.findOne({
        where: {
            username: username,
        },
        relations: {
            roles: {
                scopes: true,
            },
        },
    })
    if (!user) throw new MissingEntityError(`Could not find user ${username}`)

    console.log(`resolveAllowlistEntry succeeded`)

    return [ip, user.username]
}

/**
 * This function generates a new key.
 * @param usage The usage of the key (default: "sig")
 * @returns The newly generated key.
 */
export async function generateNewKey(usage: string = 'sig'): Promise<KeyModel> {
    const keyRepository = AppDataSource.getRepository(KeyModel)
    const keyPair = await generateKeyPair('RS256')
    const key = keyRepository.create()

    key.private_key = JSON.stringify(await exportJWK(keyPair.privateKey))
    key.public_key = JSON.stringify(await exportJWK(keyPair.publicKey))
    key.use = usage
    key.alg = 'RS256'
    await keyRepository.save(key)

    return key
}

/**
 * This function parses a JWK from the provided key.
 * @param key The key to be parsed.
 * @returns The parsed JWK.
 */
export function jwk(key: KeyModel) {
    const jwk: JWK = JSON.parse(key.public_key)

    jwk.use = key.use
    jwk.alg = key.alg
    jwk.kid = key.uuid

    return jwk
}

/**
 * This function checks if a user has values for all possible properties.
 * @param user The user to be checked.
 * @returns True if user has values for all possible properties, else false.
 */
export function isRequiredUser(user?: User): user is Required<User> {
    return (
        user !== undefined &&
        user.username !== undefined &&
        user.password !== undefined &&
        user.roles !== undefined
    )
}

/**
 * This function adds a role to an user.
 * @param user The UserModel the role should be added to.
 * @param role The RoleModel to be added.
 */
export function addRole(user: UserModel, role: RoleModel) {
    if (!user.roles.find((r) => r.name === role.name)) {
        user.roles.push(role)
    }
}
