import * as federation from "./tests/federation.spec"
import * as device from "./tests/devices.spec"
import * as experiment from "./tests/experiment.spec"
import * as auth from "./tests/auth.spec"

async function main() {
    auth.test()
    // federation.test()
    device.test()
    // experiment.test()
}

main()