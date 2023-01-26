import { MissingEntityError } from "@crosslab/service-common"
import assert, { AssertionError } from "assert"
import { config } from "../../../src/config"
import { tokenRepository } from "../../../src/database/repositories/tokenRepository"
import { userRepository } from "../../../src/database/repositories/userRepository"
import { postLogout } from "../../../src/operations"

export default () => describe("POST /logout", function () {
    it("should logout the user successfully", async function () {
        // prepare token
        const userModel = await userRepository.findOneOrFail({ 
            where: {
                username: "username" 
            }
        })
        const tokenModel = await tokenRepository.create({
            scopes: []
        })

        userModel.tokens = await userModel.tokens ?? []
        userModel.tokens.push(tokenModel)

        await userRepository.save(userModel)

        // logout
        const result = await postLogout(
            {
                token: tokenModel.token
            },
            {
                JWT: {
                    username: userModel.username,
                    url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/${userModel.username}`,
                    scopes: ["test scope"]
                }
            }
        )
        assert(result.status === 204, "Status is not equal to 204")

        // check that token was deleted successfully
        assert(!await tokenRepository.findOne({ 
            where: {
                token: tokenModel.token, 
                user: {
                    username: userModel.username
                }
            }
        }), "Token still exists after logout")

        const newUserModel = await userRepository.findOneOrFail({
            where: {
                username: "username"
            },
            relations: {
                tokens: true
            }
        })
        assert(!(await newUserModel.tokens).find((token) => token.token === tokenModel.token))
    })

    it("should throw an error if the user is not found", async function () {
        const user = {
            username: "unkown",
            url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/unknown`,
            scopes: ["test scope"]
        }
        try {
            await postLogout(
                {
                    token: "token"
                },
                {
                    JWT: user
                }
            )
            assert(false, "No error was thrown")
        } catch (error) {
            // TODO: maybe another error would be better
            // TODO: maybe harder checks are needed to ensure user belongs to service
            if (error instanceof AssertionError) throw error
            assert(error instanceof MissingEntityError, "Wrong error was thrown")
            assert(error.status === 404, "Wrong status code was returned")
        }
    })

    // it("should throw an error if the token does not belong to the user", async function () {
    //     const user = {
    //         username: "username",
    //         url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/username`,
    //         scopes: ["test scope"]
    //     }
    //     try {
    //         await postLogout(
    //             {
    //                 token: "wrong"
    //             },
    //             {
    //                 JWT: user
    //             }
    //         )
    //         assert(false, "No error was thrown")
    //     } catch (error) {
    //         if (error instanceof AssertionError) throw error
    //         assert(error instanceof MissingEntityError, "Wrong error was thrown")
    //         assert(error.status === 404, "Wrong status code was returned")
    //     }
    // })

    // TODO: think about how logout should handle multiple different tokens
})