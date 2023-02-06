import { getIdentitySignature, patchIdentitySignature } from '../generated/signatures'
import { userRepository } from '../database/repositories/userRepository'

/**
 * This function implements the functionality for handling GET requests on /identity endpoint.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const getIdentity: getIdentitySignature = async (user) => {
    console.log(`getIdentity called`)

    const userModel = await userRepository.findOneOrFail({
        where: {
            username: user.JWT?.username,
        },
    })

    console.log(`getIdentity succeeded`)

    return {
        status: 200,
        body: await userRepository.format(userModel),
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

    const userModel = await userRepository.findOneOrFail({
        where: {
            username: user.JWT?.username,
        },
    })

    await userRepository.write(userModel, body ?? {})
    await userRepository.save(userModel)

    console.log(`patchIdentity succeeded`)

    return {
        status: 200,
        body: await userRepository.format(userModel),
    }
}
