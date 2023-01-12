import dataSourceSpec from "./dataSource.spec"
import repositorySuite from "./repositories/index.spec"

const tests = [
    dataSourceSpec,
    repositorySuite
]

export default () => describe("Database", async function () {
    for (const test of tests) {
        test()
    }
})