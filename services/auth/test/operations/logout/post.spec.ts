import { MissingEntityError } from "@crosslab/service-common"
import assert from "assert"
import { config } from "../../../src/config"
import { AppDataSource } from "../../../src/database/data_source"
import { TokenModel, UserModel } from "../../../src/database/model"
import { postLogout } from "../../../src/operations"

export default () => describe("POST /logout", async function () {
    it("should logout the user successfully", async function () {
        const tokenRepository = AppDataSource.getRepository(TokenModel)
        const userRepository = AppDataSource.getRepository(UserModel)
        
        // prepare token
        const user = await userRepository.findOneByOrFail({ username: "username" })
        const token = tokenRepository.create()
        token.scopes = []

        user.tokens = await user.tokens ?? []
        user.tokens.push(token)

        await userRepository.save(user)

        // logout
        const result = await postLogout({
            token: token.token
        },
        {
            JWT: {
                username: user.username,
                url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/${user.username}`,
                scopes: ["test scope"]
            }
        })
        assert(result.status === 200)

        // check that token was deleted successfully
        assert(!tokenRepository.findOneBy({ 
            token: token.token, 
            user: {
                username: user.username
            }
        }))
    })

    it("should throw an error if the user is not found", async function () {
        const user = {
            username: "unkown",
            url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/unknown`,
            scopes: ["test scope"]
        }
        try {
            await postLogout({
                token: "token"
            },
            {
                JWT: user
            })
            assert(false)
        } catch (error) {
            // TODO: maybe another error would be better
            // TODO: maybe harder checks are needed to ensure user belongs to service
            assert(error instanceof MissingEntityError)
            assert(error.status === 404)
        }
    })

    it("should throw an error if the token does not belong to the user", async function () {
        const user = {
            username: "username",
            url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/username`,
            scopes: ["test scope"]
        }
        try {
            await postLogout({
                token: "wrong"
            },
            {
                JWT: user
            })
            assert(false)
        } catch (error) {
            assert(error instanceof MissingEntityError)
            assert(error.status === 404)
        }
    })

    // TODO: think about how logout should handle multiple different tokens
})