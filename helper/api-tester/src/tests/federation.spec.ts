import { APIClient } from "@cross-lab-project/api-client"
import { Institution } from "@cross-lab-project/api-client/dist/generated/federation/types"
import assert, { fail } from "assert"
import { config } from "../config.js"
import { exampleInstitutions } from "../example_data/federation.js"
import { startTestServer, stopTestServer } from "../test_server/index.js"
import { getId } from "./util/common.js"
import { compareInstitutions } from "./util/compare/federation.js"
import { createInstitution, deleteInstitutions } from "./util/operations/federation.js"

async function sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time))
}

export async function test() {
    const apiClient = new APIClient(config.ENDPOINT)
    const TESTSERVER_ENDPOINT = "http://host.docker.internal:3001"

    describe("Federation Service", async function() {
        describe("Proxy", async function() {
            before(async () => {
                await startTestServer()
                await sleep(100)
            })

            after(() => {
                stopTestServer()
            })

            it(`should forward GET request`, async function() {
                const response = await apiClient.getProxy({ URL: TESTSERVER_ENDPOINT }, undefined)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "GET")
            })

            it(`should forward POST request`, async function() {
                const response = await apiClient.postProxy({ URL: TESTSERVER_ENDPOINT }, undefined)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "POST")
            })

            it(`should forward PATCH request`, async function() {
                const response = await apiClient.patchProxy({ URL: TESTSERVER_ENDPOINT }, undefined)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "PATCH")
            })

            it(`should forward HEAD request`, async function() {
                const response = await apiClient.headProxy({ URL: TESTSERVER_ENDPOINT })
                assert.strictEqual(response.status, 200)
                assert(!response.body)
            })

            it(`should forward OPTIONS request`, async function() {
                const response = await apiClient.optionsProxy({ URL: TESTSERVER_ENDPOINT })
                assert.strictEqual(response.status, 204)
                assert.strictEqual(response.body, "")
            })

            it(`should forward DELETE request`, async function() {
                const response = await apiClient.deleteProxy({ URL: TESTSERVER_ENDPOINT }, undefined)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "DELETE")
            })

            it(`should forward PUT request`, async function() {
                const response = await apiClient.putProxy({ URL: TESTSERVER_ENDPOINT }, undefined)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "PUT")
            })

            it(`should forward TRACE request`, async function() {
                const response = await apiClient.traceProxy({ URL: TESTSERVER_ENDPOINT })
                assert.strictEqual(response.status, 405)
                assert.strictEqual(response.body.message, "Method not allowed")
            })
        })
        
        describe("Institutions", async function() {
            describe("Basic Institution Management", async function() {
                const createdInstitutions: Institution[] = []

                this.afterEach(async function () {
                    await deleteInstitutions(apiClient, createdInstitutions)
                })

                it("should get all institutions", async function () {
                    const response = await apiClient.getInstitutions()
                    assert(response.status == 200, "Unexpected response status")
                })

                it("should create a new institution", async function () {
                    for (const key in exampleInstitutions) {
                        await createInstitution(apiClient, createdInstitutions, exampleInstitutions[key])
                    }
                })

                it("should get the created institutions by their ids", async function () {
                    for (const key in exampleInstitutions) {
                        const institution = await createInstitution(apiClient, createdInstitutions, exampleInstitutions[key])
                        const response = await apiClient.getInstitutionsByInstitutionId({ institution_id: getId(institution) })
                        assert(response.status == 200, "Unexpected response status")
                        assert(compareInstitutions(response.body, institution))
                    }
                })

                it("should update the institution", async function () {
                    const institution = await createInstitution(apiClient, createdInstitutions, exampleInstitutions[0])
                    const response = await apiClient.patchInstitutionsByInstitutionId({ institution_id: getId(institution) }, exampleInstitutions[1])
                    assert(response.status == 200, "Unexpected response status")
                    assert(compareInstitutions(response.body, exampleInstitutions[1]))
                })
            })
        })
    })
}