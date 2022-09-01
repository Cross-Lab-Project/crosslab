import {
    getIdentitySignature,
    patchIdentitySignature,
} from '../generated/signatures/identity'
import { AppDataSource } from '../data_source'
import { UserModel } from '../model'
import { MissingEntityError } from '../types/errors'
import { formatUser } from '../methods/format'
import { writeUser } from '../methods/write'

/**
 * This function implements the functionality for handling GET requests on /identity endpoint.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const getIdentity: getIdentitySignature = async (user) => {
    console.log(`getIdentity called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOne({
        where: {
            username: user.username,
        },
        relations: {
            roles: {
                scopes: true,
            },
        },
    })

    if (!userModel)
        throw new MissingEntityError(`Could not find user ${user.username}`, 404)

    console.log(`getIdentity succeeded`)

    return {
        status: 200,
        body: formatUser(userModel),
    }
}

/**
 * This function implements the functionality for handling PATCH requests on /identity endpoint.
 * @param body The body of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 * @throws {InvalidValueError} Can throw errors from {@link writeUser}.
 */
export const patchIdentity: patchIdentitySignature = async (body, user) => {
    console.log(`patchIdentity called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOneBy({ username: user.username })

    if (!userModel)
        throw new MissingEntityError(`Could not find user ${user.username}`, 404)

    await writeUser(userModel, body ?? {})
    await userRepository.save(userModel)

    console.log(`patchIdentity succeeded`)

    return {
        status: 200,
        body: formatUser(userModel),
    }
}
