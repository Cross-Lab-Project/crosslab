import {
    getIdentitySignature,
	patchIdentitySignature
} from "../generated/signatures/identity"
import { AppDataSource } from "../data_source"
import { UserModel } from "../model"
import { formatUser, writeUser } from "../methods/users"

export const getIdentity: getIdentitySignature = async (user) => {
    console.log(`getIdentity called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOne({
        where: { 
            username: user.username 
        },
        relations: {
            roles: {
                scopes: true
            }
        }
    })

    // TODO: check if 404 is truly the best response status
    if (!userModel) {
        console.error(`getIdentity failed: could not find user ${user.username}`)
        return {
            status: 404
        }
    }

    console.log(`getIdentity succeeded`)

    return {
        status: 200,
        body: formatUser(userModel)
    }
}

export const patchIdentity: patchIdentitySignature = async (body, user) => {
    console.log(`patchIdentity called`)
    const userRepository = AppDataSource.getRepository(UserModel)
    const userModel = await userRepository.findOneBy({ username: user.username })

    // TODO: check if 404 is truly the best response status
    if (!userModel) {
        console.error(`patchIdentity failed: could not find user ${user.username}`)
        return {
            status: 404
        }
    }

    try {
        await writeUser(userModel, body ?? {})
    } catch {
        console.error(`patchIdentity failed: could not apply requested changes`)
        return {
            status: 400
        }
    }
    await userRepository.save(userModel)

    console.log(`patchIdentity succeeded`)
    
    return {
        status: 200,
        body: formatUser(userModel)
    }
}
