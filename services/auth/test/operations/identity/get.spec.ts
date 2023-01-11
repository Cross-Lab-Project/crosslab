import { MissingEntityError } from "@crosslab/service-common"
import assert from "assert"
import { config } from "../../../src/config"
import { getIdentity } from "../../../src/operations"

export default () => describe("GET /identity", async function () {
    it("should get the identity of a known user", async function () {
        const user = {
            username: "username",
            url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/username`,
            scopes: ["test scope"]
        }
        const result = await getIdentity({
            JWT: user
        })
        assert(result.status === 200)
        assert(result.body.username === user.username)
        assert(result.body.url === user.url)
        assert(result.body.roles)
        assert(result.body.roles.length === 1)
        assert(result.body.roles[0].name === "test role")
    })

    it("should not get the identity of an unknown user", async function () {
        try {
            const user = {
                username: "unknown",
                url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/unknown`,
                scopes: ["test scope"]
            }
            await getIdentity({
                JWT: user
            })
            assert(false)
        } catch (error) {
            assert(error instanceof MissingEntityError)
            assert(error.status === 404)
        }
    })
})