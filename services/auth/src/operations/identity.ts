import {
    getIdentitySignature,
	patchIdentitySignature
} from "../generated/signatures/identity"
import { AppDataSource } from "../data_source"
import { UserModel } from "../model"
import { formatUser, writeUser } from "./users"

export const getIdentity: getIdentitySignature = async (user) => {
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOneBy({ username: user.username })

    if (!userModel) {
        return {
            status: 404
        }
    }

    return {
        status: 200,
        body: formatUser(userModel)
    }
}

export const patchIdentity: patchIdentitySignature = async (body, user) => {
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOneBy({ username: user.username })

    if (!userModel) {
        return {
            status: 404
        }
    }

    try {
        await writeUser(userModel, body ?? {})
    } catch {
        return {
            status: 400
        }
    }
    await userRepository.save(userModel)
    
    return {
        status: 200,
        body: formatUser(userModel)
    }
}
