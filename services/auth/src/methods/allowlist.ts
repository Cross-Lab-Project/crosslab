import { UserModel } from '../database/model'
import { userRepository } from '../database/repositories/userRepository'
import { MalformedAllowlistError } from '../types/errors'
import { AllowlistEntry } from '../types/types'
import { MissingEntityError, logger } from '@crosslab/service-common'

export const allowlist: { [key: string]: string } = {}

export function parseAllowlist(allowlistToParse: string): AllowlistEntry[] {
    const removedWhitespaceAllowlist = allowlistToParse.replace(/\s+/g, '')
    const rawEntries = removedWhitespaceAllowlist.split(',')
    const entries = rawEntries.map((rawEntry) => {
        const splitRawEntry = rawEntry.split(':')
        if (splitRawEntry.length !== 3) {
            throw new MalformedAllowlistError(`The allowlist is malformed`)
        }
        return {
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
            logger.log('error', 'An error has occurred while resolving the allowlist', {
                data: { error },
            })
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
    logger.log('info', 'resolveAllowlistEntry called')

    // Search the user with the provided username
    const userModel = await userRepository.findOne({
        where: {
            username: allowlistEntry.username,
        },
    })
    if (!userModel)
        throw new MissingEntityError(`Could not find user ${allowlistEntry.username}`)

    logger.log('info', 'resolveAllowlistEntry succeeded')

    return [allowlistEntry.token, userModel.username]
}

/**
 * Try to find user associated to allowlisted Token.
 * @param token Token of the client that is potentially allowlisted.
 * @throws {MissingEntityError} User associated with allowlisted token needs to
 * exist in the database.
 * @returns The user associated with the allowlisted token.
 */
export async function getAllowlistedUser(token: string): Promise<UserModel> {
    logger.log('warn', `trying to find allowlisted user ${allowlist[token]}`)

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
