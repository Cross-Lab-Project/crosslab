import assert from "assert"
import * as sinon from "sinon"
import { capitalizeFirstLetter, die } from "../../src/methods/utils"

export default () => describe("utils methods", async function () {
    // TBD
    describe("capitalizeFirstLetter", async function () {
        it("should capitalize the first letter of the provided string", async function () {
            assert(capitalizeFirstLetter("test") === "Test")
            assert(capitalizeFirstLetter("Test") === "Test")
            assert(capitalizeFirstLetter("tEST") === "TEST")
            assert(capitalizeFirstLetter("TEST") === "TEST")
        })

        it("should return an empty string when the provided string is empty", async function () {
            assert(capitalizeFirstLetter("") === "")
        })
    })

    describe("die", async function () {
        it("should exit the program and log the reason", async function () {
            const consoleErrorStub = sinon.stub(console, "error")
            const processExitStub = sinon.stub(process, "exit")

            die("test reason")

            assert(consoleErrorStub.calledWith("test reason"))
            assert(processExitStub.calledWith(1))

            consoleErrorStub.restore()
            processExitStub.restore()
        })
    })
})