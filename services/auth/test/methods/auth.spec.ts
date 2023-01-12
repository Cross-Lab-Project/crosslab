import { MissingEntityError } from "@crosslab/service-common"
import assert from "assert"
import { allowlist } from "../../src/methods/allowlist"
import { getAllowlistedUser } from "../../src/methods/auth"

export default () => describe("auth methods", async function () {
    describe("getAllowlistedUser", async function () {
        it("should find the user for an allowlisted ip", async function () {
            const userModel = await getAllowlistedUser("127.0.0.1")
            assert(userModel.username === "username")
        })

        it("should not find a user for a non-allowlisted ip", async function () {
            try {
                assert(allowlist["non-existent"] === undefined)
                await getAllowlistedUser("non-existent:username")
                assert(false)
            } catch (error) {
                assert(error instanceof MissingEntityError)
                assert(error.status === 500)
            }
        })

        it("should throw an error if the user for an allowlisted ip is not found", async function () {
            try {
                await getAllowlistedUser("localhost:non-existent")
                assert(false)
            } catch (error) {
                assert(error instanceof MissingEntityError)
                assert(error.status === 500)
            }
        })
    })

    describe("sign", async function () {
        // TBD
    })

    describe("signUserToken", async function () {
        // TBD
    })

    describe("signDeviceToken", async function () {
        // TBD
    })

    describe("getTokenStringFromAuthorization", async function () {
        xit("should get the token from a valid 'Authorization'-header", async function () {
            // TBD
        })

        xit("should not get a token from a malformed 'Authorization'-header", async function () {
            // TBD
        })
    })

    describe("getTokenByTokenString", async function () {
        xit("should find a valid token", async function () {
            // TBD
        })

        xit("should not find an invalid token", async function () {
            // TBD
        })

        xit("should throw an error if the found token has no associated user", async function () {
            // TBD
        })
    })
})