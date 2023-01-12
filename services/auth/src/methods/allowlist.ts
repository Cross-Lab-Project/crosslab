import { MissingEntityError } from "@crosslab/service-common"
import { userRepository } from "../database/repositories/userRepository"
import { MalformedAllowlistEntryError, DNSResolveError } from "../types/errors"
import dns from "dns"

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
    const userModel = await userRepository.findOne({ 
        where: {
            username 
        }
    })
    if (!userModel) throw new MissingEntityError(`Could not find user ${username}`)

    console.log(`resolveAllowlistEntry succeeded`)

    return [ip, userModel.username]
}