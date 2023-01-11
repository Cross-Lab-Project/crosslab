import authTests from "./auth/index.spec"
import deviceAuthenticationTokenTests from "./device_authentication_token/index.spec"
import identityTests from "./identity/index.spec"
import loginTests from "./login/index.spec"
import logoutTests from "./logout/index.spec"
import usersTests from "./users/index.spec"

const tests = [
    ...authTests,
    ...deviceAuthenticationTokenTests,
    ...identityTests,
    ...loginTests,
    ...logoutTests,
    ...usersTests
]

export default () => describe("Operations", async function () {
    for (const test of tests) {
        test()
    }
})