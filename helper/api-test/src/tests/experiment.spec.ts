import { APIClient } from "@cross-lab-project/api-client"
import assert from "assert"
import { config } from "../config"
import { DeviceHandler } from "@cross-lab-project/soa-client"
import { generateTestData } from "./testdata.spec"
import { ElectricalConnectionService } from "@cross-lab-project/soa-service-electrical"

export async function test() {
    describe("Example Test", async function () {
        const apiClient = new APIClient(config.API_URL)

        this.beforeAll(async function () {
            await apiClient.login(config.USERNAME, config.PASSWORD, { method: "local" })
        })

        it("should start the experiment correctly", async function () {
            this.timeout(0)

            const device1 = await apiClient.createDevice({
                type: "device",
                name: "Test Device 1",
                description: "A test device",
                announcedAvailability: [{
                    available: true
                }]
            })
            const device2 = await apiClient.createDevice({
                type: "device",
                name: "Test Device 2",
                description: "A test device",
                announcedAvailability: [{
                    available: true
                }]
            })
            const device3 = await apiClient.createDevice({
                type: "edge instantiable",
                name: "Test Device 3",
                description: "A test device",
                code_url: "http://localhost:3009"
            })

            assert(device1.url && device2.url && device3.url)

            console.log("Device 1 URL:", device1.url)
            console.log("Device 2 URL:", device2.url)
            console.log("Device 3 URL:", device3.url)

            const websocketToken1 = await apiClient.createWebsocketToken(device1.url)
            const websocketToken2 = await apiClient.createWebsocketToken(device2.url)

            assert(websocketToken1 && websocketToken2)

            // const deviceAuthenticationToken1 = await apiClient.createDeviceAuthenticationToken(device1.url)
            // const deviceAuthenticationToken2 = await apiClient.createDeviceAuthenticationToken(device2.url)

            // assert(deviceAuthenticationToken1 && deviceAuthenticationToken2)

            const soaClient1 = new DeviceHandler()
            const soaClient2 = new DeviceHandler()

            await soaClient1.connect({
                endpoint: config.API_URL.replace("http","ws") + "/devices/websocket",
                id: device1.url,
                token: websocketToken1
            })
            await soaClient2.connect({
                endpoint: config.API_URL.replace("http","ws") + "/devices/websocket",
                id: device2.url,
                token: websocketToken2
            })

            const electricalServiceSensors = new ElectricalConnectionService("sensors", [])
            const electricalServiceActuators = new ElectricalConnectionService("actuators", [])
            const electricalServicePins = new ElectricalConnectionService("pins", [])

            soaClient1.addService(electricalServiceSensors)
            soaClient1.addService(electricalServiceActuators)
            soaClient2.addService(electricalServicePins)

            assert(await (await apiClient.getDevice(device1.url)).connected)
            assert(await (await apiClient.getDevice(device2.url)).connected)

            const experiment = await apiClient.createExperiment(generateTestData(device1.url, device2.url, device3.url))
            assert(experiment.url)
            assert(experiment.status === "setup")
            assert(experiment.devices && experiment.devices[2])
            assert((experiment.devices[2] as any).additionalProperties)

            const { instanceUrl, deviceToken } = ((experiment.devices[2] as any).additionalProperties)

            assert(instanceUrl && deviceToken)
            console.log("Instance URL:", instanceUrl)

            const websocketToken3 = await apiClient.createWebsocketToken(instanceUrl)

            assert(websocketToken3)

            const soaClient3 = new DeviceHandler()

            await soaClient3.connect({
                endpoint: config.API_URL.replace("http","ws") + "/devices/websocket",
                id: instanceUrl,
                token: websocketToken3
            })

            const electricalServiceDisplay = new ElectricalConnectionService("display", [])
            soaClient3.addService(electricalServiceDisplay)

            await new Promise<void>(async (resolve) => {
                while (true) {
                    const instance = await apiClient.getDevice(instanceUrl)
                    console.log(instance)
                    if (instance.connected) {
                        break
                    }
                }
                resolve()
            })

            await new Promise<void>((resolve) => setTimeout(async (experimentUrl) => {
                const updatedExperiment = await apiClient.getExperiment(experimentUrl)
                assert(updatedExperiment.status === "running", `Experiment status is "${updatedExperiment.status}" instead of "running"`)
                resolve()
            }, 3000, experiment.url!))
        })
    })
}