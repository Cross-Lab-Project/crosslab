import {
    getIdentitySignature,
    patchIdentitySignature,
} from '../generated/signatures'
import { AppDataSource } from '../database/data_source'
import { UserModel } from '../database/model'
import { formatUserModel } from '../database/methods/format'
import { writeUserModel } from '../database/methods/write'
import { MissingEntityError } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on /identity endpoint.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const getIdentity: getIdentitySignature = async (user) => {
    console.log(`getIdentity called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOneBy({
        username: user.JWT?.username
    })

    if (!userModel)
        throw new MissingEntityError(`Could not find user ${user.JWT?.username}`, 404)

    console.log(`getIdentity succeeded`)

    return {
        status: 200,
        body: formatUserModel(userModel),
    }
}

/**
 * This function implements the functionality for handling PATCH requests on /identity endpoint.
 * @param body The body of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 * @throws {InvalidValueError} Can throw errors from {@link writeUserModel}.
 */
export const patchIdentity: patchIdentitySignature = async (body, user) => {
    console.log(`patchIdentity called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOneBy({ username: user.JWT?.username })

    if (!userModel)
        throw new MissingEntityError(`Could not find user ${user.JWT?.username}`, 404)

    await writeUserModel(userModel, body ?? {})
    await userRepository.save(userModel)

    console.log(`patchIdentity succeeded`)

    return {
        status: 200,
        body: formatUserModel(userModel),
    }
}
