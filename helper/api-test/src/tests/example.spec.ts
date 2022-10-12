import { APIClient, UnsuccessfulRequestError } from "@cross-lab-project/api-client"
import { ConcreteDevice, DeviceGroup, DeviceOverview, VirtualDevice } from "@cross-lab-project/api-client/dist/generated/device/types"
import { config } from "../config"

export async function test() {
    describe("Example Test", async function () {
        const apiClient = new APIClient(config.API_URL)
        const createdDevices: DeviceOverview[] = []

        this.beforeAll(async function () {
            await apiClient.login(config.USERNAME, config.PASSWORD, "local")
        })

        it("should get the identity of the user", async function () {
            const identity = await apiClient.getIdentity()
            console.log(identity)
        })

        it("should create a new concrete device", async function () {
            const deviceInit: ConcreteDevice = {
                type: "device",
                name: "Example Concrete Device",
                description: "An example for a concrete device"
            }
            const device = await apiClient.createDevice({
                ...deviceInit, 
                announcedAvailability: [
                    {
                        available: true
                    }
                ]
            })
            console.log(JSON.stringify(device, null, 4))
            createdDevices.push(device)
        })

        it("should create a new virtual device", async function () {
            const deviceInit: VirtualDevice = {
                type: "virtual",
                name: "Example Virtual Device",
                description: "An example for a virtual device"
            }
            const device = await apiClient.createDevice(deviceInit)
            console.log(JSON.stringify(device, null, 4))
            createdDevices.push(device)
        })

        it("should create a new device group", async function () {
            const deviceInit: DeviceGroup = {
                type: "group",
                name: "Example Device Group",
                description: "An example for a device group",
                devices: createdDevices
            }
            const device = await apiClient.createDevice(deviceInit)
            console.log(JSON.stringify(device, null, 4))
            createdDevices.push(device)
        })

        it("should delete the created devices", async function () {
            for (const device of createdDevices) {
                const resolvedDevice = await apiClient.getDevice(device.url!)
                console.log(JSON.stringify(resolvedDevice, null, 4))
                await apiClient.deleteDevice(device.url!)
                try {
                    await apiClient.getDevice(device.url!)
                } catch (error) {
                    if (!(error instanceof UnsuccessfulRequestError)) {
                        throw error
                    } else {
                        if (error.response.status != 404) {
                            throw error.response
                        }
                    }
                }
            }
        })
    })
}