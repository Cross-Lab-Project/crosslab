import { MissingEntityError } from '@crosslab/service-common'
import { userRepository } from '../database/repositories/userRepository'
import { MalformedAllowlistError } from '../types/errors'
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
            token: splitRawEntry[0],
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
    console.log(`resolveAllowlistEntry called`)

    // Search the user with the provided username
    const userModel = await userRepository.findOne({
        where: {
            username: allowlistEntry.username,
        },
    })
    if (!userModel)
        throw new MissingEntityError(`Could not find user ${allowlistEntry.username}`)

    console.log(`resolveAllowlistEntry succeeded`)

    return [allowlistEntry.token, userModel.username]
}

/**
 * Try to find user associated to allowlisted IP.
 * @param token IP from the client that is potentially allowlisted.
 * @throws {MissingEntityError} User associated with allowlisted IP needs to exist in the database.
 * @returns The user associated with the allowlisted IP.
 */
export async function getAllowlistedUser(token: string): Promise<UserModel> {
    console.warn(
        `trying to find allowlisted user ${allowlist[token]}`
    )

    const user = allowlist[token]
        ? await userRepository.findOne({
              where: {
                  username: allowlist[token],
              },
          })
        : undefined

    if (!user)
        throw new MissingEntityError(
            `User ${allowlist[token]} is not in the database`,
            500
        )

    return user
}
