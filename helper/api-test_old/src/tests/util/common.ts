import assert from "assert"

export function describeSequential(title: string, fn: (this: Mocha.Suite) => void): Mocha.Suite {
    return describe(title, async function () {
        let failed = false
        this.beforeEach(function () {
            if (failed) this.skip() 
        })
        this.afterEach(function () {
            if (this.currentTest && this.currentTest.isFailed()) failed = true
        })
        fn.call(this)
    })
}

export function getId(object: any): string {
    assert(object.url, "Object has no url")
    const objectId = object.url.split("/").pop()
    assert(objectId, "Object has no id")
    return objectId
}