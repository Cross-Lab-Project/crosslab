import assert from "assert"
import { userRepository } from "../../../src/database/repositories/userRepository"
import { postLogin } from "../../../src/operations"
import { AuthenticationError } from "../../../src/types/errors"

export default () => describe("POST /login", async function () {
    it("should login the local test user successfully", async function () {
        const result = await postLogin({
            username: "username",
            password: "password",
            method: "local"
        })
        assert(result.status === 201)
        assert(result.body)

        const userModel = await userRepository.findOneOrFail({
            where: {
                username: "username" 
            },
            relations: {
                tokens: true
            }
        })
        assert((await userModel.tokens).find((token) => token.token === result.body))
    })

    it("should not login a local user with wrong username", async function () {
        try {
            await postLogin({
                username: "wrong",
                password: "password",
                method: "local"
            })
            assert(false)
        } catch (error) {
            assert(error instanceof AuthenticationError)
            assert(error.status === 401)
        }
    })

    it("should not login a local user with wrong password", async function () {
        try {
            await postLogin({
                username: "username",
                password: "wrong",
                method: "local"
            })
            assert(false)
        } catch (error) {
            assert(error instanceof AuthenticationError)
            assert(error.status === 401)
        }
    })

    // TODO: test tui authentication
    // TODO: test empty password handling
})