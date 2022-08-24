import { APIClient } from "@cross-lab-project/api-client"
import assert from "assert"
import { config } from "../config"

export async function test() {
    const apiClient = new APIClient(config.ENDPOINT)

    describe("Auth Service", async function () {
        it("should login successfully via tui ldap", async function () {
            this.timeout(0)
            const response = await apiClient.postLogin({ username: config.USERNAME, password: config.PASSWORD, method: "tui"})
            assert(response.status === 201, "Unexpected response status")
        })

        it("should get the identity of the logged in user", async function() {
            this.timeout(0)
            const loginResponse = await apiClient.postLogin({ username: config.USERNAME, password: config.PASSWORD, method: "tui" })
            assert(loginResponse.status === 201, "Login unsuccessful")
            const response = await apiClient.getIdentity()
            assert(response.status === 200, "Unexpected response status")
            assert(response.body, "Response does not contain a body")
            assert.strictEqual(response.body.username, "tui:" + config.USERNAME, "Returned user does not match")
        })
    })
}