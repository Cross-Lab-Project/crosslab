import * as federation from "./tests/federation.spec.js"
import * as device from "./tests/devices.spec.js"
import * as experiment from "./tests/experiment.spec.js"

async function main() {
    device.test()
    federation.test()
    experiment.test()
}

main()