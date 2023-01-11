import { User } from "../../generated/types"
import { KeyModel, TokenModel, UserModel } from "../model"
import { keyRepository, tokenRepository, userRepository } from "../repositories"
import { writeKeyModel, writeTokenModel, writeUserModel } from "./write"

/**
 * This function attempts to create a UserModel with the provided User.
 * @param user The User providing the data for the UserModel.
 * @throws {MissingEntityError} Can throw errors from {@link writeUserModel}
 * @returns The newly created UserModel.
 */
export async function createUserModel(user: User<"request">): Promise<UserModel> {
    const userModel = userRepository.create()
    await writeUserModel(userModel, user)
    return userModel
}

/**
 * This function attempts to create a TokenModel with the provided Token.
 * @param token The Token providing the data for the TokenModel.
 * @throws {MissingEntityError} Can throw errors from {@link writeTokenModel}
 * @returns The newly created TokenModel.
 */
export async function createTokenModel(
    token: {
        device?: string
        expiresOn?: string
        scopes: string[]
        // token: string
    }
): Promise<TokenModel> {
    const tokenModel = tokenRepository.create()
    await writeTokenModel(tokenModel, token)
    return tokenModel
}

/**
 * This function attempts to create a KeyModel with the provided Key.
 * @param key The Key providing the data for the KeyModel.
 * @returns The newly created KeyModel.
 */
export async function createKeyModel(
    key: {
        alg: string
        private_key: string
        public_key: string
        use: string
    }
): Promise<KeyModel> {
    const keyModel = keyRepository.create()
    await writeKeyModel(keyModel, key)
    return keyModel
}