import allowlistSpec from "./allowlist.spec"
import apiSpec from "./api.spec"
import authSpec from "./auth.spec"
import loginSpec from "./login.spec"
import utilsSpec from "./utils.spec"

const tests =  [allowlistSpec, apiSpec, authSpec, loginSpec, utilsSpec]

export default () => describe("Methods", async function () {
    for (const test of tests) {
        test()
    }
})