import { generateKeyPair, exportJWK, JWK } from 'jose'
import { KeyModel } from '../database/model'
import dns from 'dns'
import { User } from '../generated/types'
import {
    DNSResolveError,
    MalformedAllowlistEntryError
} from '../types/errors'
import { MissingEntityError } from '@crosslab/service-common'
import { findUserModelByUsername } from '../database/methods/find'
import { saveKeyModel } from '../database/methods/save'
import { createKeyModel } from '../database/methods/create'

export const allowlist: { [key: string]: string } = {}

export async function resolveAllowlist(config: any) {
    for (const entry of config.ALLOWLIST ?? []) {
        try {
            const result = await resolveAllowlistEntry(entry)
            allowlist[result[0]] = result[1]
        } catch (error) {
            console.error(error)
        }
    }
}

/**
 * This function tries to resolve an entry of the allowlist.
 * @param entry Entry of the allowlist ("url":username") to be resolved.
 * @returns Resolved entry in the form "ip:username"
 */
export async function resolveAllowlistEntry(entry: string): Promise<[string, string]> {
    console.log(`resolveAllowlistEntry called for "${entry}"`)

    let url: string = ''
    let username: string = ''

    // Split provided entry into its url and username components
    if (entry.includes(':')) {
        const split = entry.split(':')
        if (split.length === 2) {
            [url, username] = split
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
        dns.lookup(url, (err, address) => {
            if (err || address.length === 0 || !address) 
                return res('')
            return res(address)
        })
    })
    if (!ip) throw new DNSResolveError(`Could not resolve ip for "${url}"`)

    // Search the user with the provided username
    const userModel = await findUserModelByUsername(username)
    if (!userModel) throw new MissingEntityError(`Could not find user ${username}`)

    console.log(`resolveAllowlistEntry succeeded`)

    return [ip, userModel.username]
}

/**
 * This function generates a new key.
 * @param usage The usage of the key (default: "sig")
 * @returns The newly generated key.
 */
export async function generateNewKey(usage: string = 'sig'): Promise<KeyModel> {
    const keyPair = await generateKeyPair('RS256')

    const keyModel = await createKeyModel({
        private_key: JSON.stringify(await exportJWK(keyPair.privateKey)),
        public_key: JSON.stringify(await exportJWK(keyPair.publicKey)),
        use: usage,
        alg: 'RS256'
    })

    await saveKeyModel(keyModel)

    return keyModel
}

/**
 * This function parses a JWK from the provided key.
 * @param keyModel The key to be parsed.
 * @returns The parsed JWK.
 */
export function jwk(keyModel: KeyModel) {
    const jwk: JWK = JSON.parse(keyModel.public_key)

    jwk.use = keyModel.use
    jwk.alg = keyModel.alg
    jwk.kid = keyModel.uuid

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
