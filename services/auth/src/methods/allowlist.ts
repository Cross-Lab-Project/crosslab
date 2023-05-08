import { MissingEntityError } from '@crosslab/service-common'
import { userRepository } from '../database/repositories/userRepository'
import { DNSResolveError, MalformedAllowlistError } from '../types/errors'
import dns from 'dns'
import { UserModel } from '../database/model'
import { AllowlistEntry } from '../types/types'

export const allowlist: { [key: string]: string } = {}

export function parseAllowlist(allowlistToParse: string): AllowlistEntry[] {
    const removedWhitespaceAllowlist = allowlistToParse.replace(/\s+/g, '')
    const rawEntries = removedWhitespaceAllowlist.split(",")
    const entries = rawEntries.map((rawEntry) => {
        const splitRawEntry = rawEntry.split(':')
        if (splitRawEntry.length !== 3) {
            throw new MalformedAllowlistError(`The allowlist is malformed`)
        }
        return <AllowlistEntry>{
            url: splitRawEntry[0],
            username: `${splitRawEntry[1]}:${splitRawEntry[2]}`,
        }
    })

    return entries
}

export async function resolveAllowlist(allowlistEntries: AllowlistEntry[]) {
    for (const entry of allowlistEntries) {
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
 * @param allowlistEntry Entry of the allowlist ("url":username") to be resolved.
 * @returns Resolved entry in the form "ip:username"
 */
export async function resolveAllowlistEntry(
    allowlistEntry: AllowlistEntry
): Promise<[string, string]> {
    console.log(`resolveAllowlistEntry called for "${allowlistEntry.url}"`)

    // Resolve the ip of the provided url
    const ip = await new Promise<string>((res) => {
        dns.lookup(allowlistEntry.url, (err, address) => {
            if (err || address.length === 0 || !address) return res('')
            return res(address)
        })
    })
    if (!ip) throw new DNSResolveError(`Could not resolve ip for "${allowlistEntry.url}"`)

    // Search the user with the provided username
    const userModel = await userRepository.findOne({
        where: {
            username: allowlistEntry.username,
        },
    })
    if (!userModel)
        throw new MissingEntityError(`Could not find user ${allowlistEntry.username}`)

    console.log(`resolveAllowlistEntry succeeded`)

    return [ip, userModel.username]
}

/**
 * Try to find user associated to allowlisted IP.
 * @param ip IP from the client that is potentially allowlisted.
 * @throws {MissingEntityError} User associated with allowlisted IP needs to exist in the database.
 * @returns The user associated with the allowlisted IP.
 */
export async function getAllowlistedUser(ip: string): Promise<UserModel> {
    console.warn(
        `IP ${ip} is allowlisted, trying to find associated user ${allowlist[ip]}`
    )

    const user = allowlist[ip]
        ? await userRepository.findOne({
              where: {
                  username: allowlist[ip],
              },
          })
        : undefined

    if (!user)
        throw new MissingEntityError(
            `User ${allowlist[ip]} for allowlisted IP ${ip} is not in the database`,
            500
        )

    return user
}
