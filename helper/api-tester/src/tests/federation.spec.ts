import { APIClient, isFetchError } from "@cross-lab-project/api-client"
import { Institution } from "@cross-lab-project/api-client/dist/generated/federation/types"
import assert, { fail } from "assert"
import { exampleInstitutions } from "../example_data/federation.js"
import { startTestServer, stopTestServer } from "../test_server/index.js"
import { getId } from "./util/common.js"
import { compareInstitutions } from "./util/compare/federation.js"
import { createInstitution, deleteInstitutions } from "./util/operations/federation.js"

async function sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time))
}

export async function test() {
    const apiClient = new APIClient("http://localhost:80")
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
                const response = await apiClient.federationClient.getProxy({ URL: TESTSERVER_ENDPOINT })
                if (isFetchError(response)) fail(response.error)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "GET")
            })

            it(`should forward POST request`, async function() {
                const response = await apiClient.federationClient.postProxy({ URL: TESTSERVER_ENDPOINT })
                if (isFetchError(response)) fail(response.error)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "POST")
            })

            it(`should forward PATCH request`, async function() {
                const response = await apiClient.federationClient.patchProxy({ URL: TESTSERVER_ENDPOINT })
                if (isFetchError(response)) fail(response.error)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "PATCH")
            })

            it(`should forward HEAD request`, async function() {
                const response = await apiClient.federationClient.headProxy({ URL: TESTSERVER_ENDPOINT })
                if (isFetchError(response)) fail(response.error)
                assert.strictEqual(response.status, 200)
                assert(!response.body)
            })

            it(`should forward OPTIONS request`, async function() {
                const response = await apiClient.federationClient.optionsProxy({ URL: TESTSERVER_ENDPOINT })
                if (isFetchError(response)) fail(response.error)
                assert.strictEqual(response.status, 204)
                assert.strictEqual(response.body, "")
            })

            it(`should forward DELETE request`, async function() {
                const response = await apiClient.federationClient.deleteProxy({ URL: TESTSERVER_ENDPOINT })
                if (isFetchError(response)) fail(response.error)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "DELETE")
            })

            it(`should forward PUT request`, async function() {
                const response = await apiClient.federationClient.putProxy({ URL: TESTSERVER_ENDPOINT })
                if (isFetchError(response)) fail(response.error)
                assert.strictEqual(response.status, 200)
                assert.strictEqual(response.body, "PUT")
            })

            it(`should forward TRACE request`, async function() {
                const response = await apiClient.federationClient.traceProxy({ URL: TESTSERVER_ENDPOINT })
                if (isFetchError(response)) fail(response.error)
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
                    const response = await apiClient.federationClient.getInstitutions()
                    if (isFetchError(response)) fail(response.error)
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
                        const response = await apiClient.federationClient.getInstitutionsByInstitutionId({ institution_id: getId(institution) })
                        if (isFetchError(response)) fail(response.error)
                        assert(response.status == 200, "Unexpected response status")
                        assert(compareInstitutions(response.body, institution))
                    }
                })

                it("should update the institution", async function () {
                    const institution = await createInstitution(apiClient, createdInstitutions, exampleInstitutions[0])
                    const response = await apiClient.federationClient.patchInstitutionsByInstitutionId({ institution_id: getId(institution) }, exampleInstitutions[1])
                    if (isFetchError(response)) fail(response.error) 
                    assert(response.status == 200, "Unexpected response status")
                    assert(compareInstitutions(response.body, exampleInstitutions[1]))
                })
            })
        })
    })
}