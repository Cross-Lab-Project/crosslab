import { hash } from 'bcryptjs'
import { AppDataSource } from '../data_source'
import { User } from '../generated/types'
import { UserModel, RoleModel } from '../model'
import { InvalidValueError } from '../types/errors'
import { addRole } from './utils'

/**
 * This function writes the data of an User to an UserModel
 * @param userModel The UserModel the data should be written to.
 * @param user The User providing the data to be written.
 * @throws {InvalidValueError} Throws an error when the provided user has unknown roles.
 */
export async function writeUser(userModel: UserModel, user: User) {
    if (user.username) userModel.username = user.username
    if (user.password) userModel.password = await hash(user.password, 10)
    if (user.roles) {
        userModel.roles = []
        const roleRepository = AppDataSource.getRepository(RoleModel)
        for (const role of user.roles) {
            const roleModel = await roleRepository.findOneBy({ name: role.name })
            if (!roleModel)
                throw new InvalidValueError(
                    `Requested role is not known: ${role.name}`,
                    400
                )
            addRole(userModel, roleModel)
        }
    }
}

/**
 * This function creates a new user.
 * @param userdata The data to be used for creating the new user.
 * @throws {InvalidValueError} Can throw errors from {@link writeUser}
 * @returns The newly created user.
 */
export async function createUser(userdata: Required<User>): Promise<UserModel> {
    const userRepository = AppDataSource.getRepository(UserModel)

    const user = userRepository.create()
    await writeUser(user, userdata)
    await userRepository.save(user)

    return user
}
