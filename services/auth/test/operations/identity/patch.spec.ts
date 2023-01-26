import { InvalidValueError, MissingEntityError } from "@crosslab/service-common"
import assert from "assert"
import { config } from "../../../src/config"
import { patchIdentity } from "../../../src/operations"

// TODO: rethink what can be patched for a user
export default () => describe("PATCH /identity", function () {
    it("should update the identity of a known user", async function () {
        const user = {
            username: "username",
            url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/username`,
            scopes: ["test scope"]
        }
        const result = await patchIdentity({
            username: "newUsername",
            password: "newPassword"
        },{
            JWT: user
        })
        assert(result.status === 200)
        assert(result.body.username === "newUsername")
        assert(result.body.url === `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/newUsername`)
        assert(result.body.roles)
        assert(result.body.roles.length === 1)
        assert(result.body.roles[0].name === "test role")

        const resultRevert = await patchIdentity({
            username: "username",
            password: "password",
            roles: [{
                name: "test role"
            }]
        },{
            JWT: user
        })
        assert(resultRevert.status === 200)
        assert(resultRevert.body.username === "username")
        assert(resultRevert.body.url === `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/username`)
        assert(resultRevert.body.roles)
        assert(resultRevert.body.roles.length === 1)
        assert(resultRevert.body.roles[0].name === "test role")
    })

    it("should not update the identity of an unknown user", async function () {
        try {
            const user = {
                username: "unknown",
                url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/unknown`,
                scopes: ["test scope"]
            }
            await patchIdentity({
                username: "newUsername",
                password: "newPassword"
            },{
                JWT: user
            })
            assert(false)
        } catch (error) {
            assert(error instanceof MissingEntityError)
            assert(error.status === 404)
        }
    })

    it("should not allow the user to set an unknown role", async function () {
        try {
            const user = {
                username: "username",
                url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/unknown`,
                scopes: ["test scope"]
            }
            await patchIdentity({
                roles: [{
                    name: "unknown"
                }]
            },{
                JWT: user
            })
            assert(false)
        } catch (error) {
            assert(error instanceof InvalidValueError)
            assert(error.status === 400)
        }
    })
})