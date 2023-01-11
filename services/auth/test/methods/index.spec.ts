import apiTest from "./api.spec";
import authTest from "./auth.spec";
import formatTest from "./format.spec";
import loginTest from "./login.spec";
import utilsTest from "./utils.spec";
import writeTest from "./write.spec";

const tests =  [apiTest, authTest, formatTest, loginTest, utilsTest, writeTest]

export default () => describe("Methods", async function () {
    for (const test of tests) {
        test()
    }
})