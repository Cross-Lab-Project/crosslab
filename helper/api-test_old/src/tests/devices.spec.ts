import { APIClient } from "@cross-lab-project/api-client"
import { ConcreteDevice, DeviceGroup, Peerconnection } from "@cross-lab-project/api-client/dist/generated/device/types"
import assert from "assert"
import { config } from "../config"
import { CompareOptionsConcreteDevice } from "./util/compare/device"
import { createConcreteDevice, createDeviceGroup, createPeerconnection, deleteDevices, deletePeerconnections, getDevice, getPeerconnection, getToken, openWebsocketConnection, patchDevice, postAvailability } from "./util/operations/device"

export async function test() {
    const apiClient = new APIClient(config.ENDPOINT)

    describe("Device Service", async function() {
        const createdDevices: (ConcreteDevice|DeviceGroup)[] = []
        const createdPeerconnections: (Peerconnection)[] = []

        this.beforeAll(async function() {
            await apiClient.postLogin({ username: config.USERNAME, password: config.PASSWORD, method: "tui" })
        })

        describe("Basic Device Management", async function () {
            this.afterEach(async function() {
                await deleteDevices(apiClient, createdDevices)
                assert(createdDevices.length == 0, "Could not delete created devices")
            })

            it("should get all devices", async function () {
                const response = await apiClient.getDevices()
                assert(response.status == 200, "Unexpected response status")
            })

            it("should create a new concrete device", async function () {
                await createConcreteDevice(apiClient, createdDevices)
            })

            it("should create a new device group containing only concrete devices", async function () {
                for (let i = 0; i < 5; i++) {
                    await createConcreteDevice(apiClient, createdDevices)
                }
                await createDeviceGroup(apiClient, createdDevices, { devices: createdDevices })
            })

            it("should create a new device group containing a device group", async function () {
                for (let i = 0; i < 5; i++) {
                    await createConcreteDevice(apiClient, createdDevices)
                }
                await createDeviceGroup(apiClient, createdDevices, { devices: createdDevices })
                await createDeviceGroup(apiClient, createdDevices, { devices: createdDevices })
            })

            xit("should not allow cyclic references in device group", async function () {
                // TBD
            })

            // NOTE: Here callbacks could be tested as well
            it("should update the information of a concrete device", async function () {
                const device = await createConcreteDevice(apiClient, createdDevices)
                const compareOptions: Partial<CompareOptionsConcreteDevice> = {
                    announcedAvailability: false
                }
                const patchedDevice = await patchDevice(apiClient, device, {
                    name: "(New) " + device.name,
                    description: "(New) " + device.description,
                    announcedAvailability: [{ available: false }] 
                }, {
                    compareOptions: compareOptions
                })
                assert(patchedDevice.announcedAvailability, "Patched device is missing announcedAvailability")
                assert(patchedDevice.announcedAvailability.length === 0, "Patched device's announcedAvailability should be empty")
            })

            it("should update the information of a device group", async function () {
                for (let i = 0; i < 5; i++) {
                    await createConcreteDevice(apiClient, createdDevices)
                }
                const device = await createDeviceGroup(apiClient, createdDevices, { devices: createdDevices })
                await patchDevice(apiClient, device, {
                    name: "(New) " + device.name,
                    description: "(New) " + device.description,
                    devices: createdDevices.slice(0,3)
                })
            })

            it("should get a token for a concrete device", async function () {
                const device = await createConcreteDevice(apiClient, createdDevices)
                await getToken(apiClient, device)
            })

            it("should update the availability of a concrete device", async function () {
                const device = await createConcreteDevice(apiClient, createdDevices)
                const newTimeSlots = await postAvailability(apiClient, device, [
                    { 
                        available: true,
                        start: new Date().toISOString()
                    },
                    {
                        available: false,
                        start: new Date().toISOString()
                    }
                ])
                assert(newTimeSlots, "Patched device is missing announcedAvailability")
                assert(newTimeSlots.length === 0, "Patched device's announcedAvailability should be empty")
            })

            it("should get all created devices by id", async function () {
                for (let i = 0; i < 5; i++) {
                    await createConcreteDevice(apiClient, createdDevices)
                }
                await createDeviceGroup(apiClient, createdDevices, { devices: createdDevices })
                await createDeviceGroup(apiClient, createdDevices, { devices: createdDevices })

                for (const device of createdDevices) {
                    await getDevice(apiClient, device)
                }
            })

            it("should get device group by id with flattened groups", async function () {
                for (let i = 0; i < 5; i++) {
                    await createConcreteDevice(apiClient, createdDevices)
                }
                const _deviceGroup = await createDeviceGroup(apiClient, createdDevices, { devices: createdDevices })
                const deviceGroup = await createDeviceGroup(apiClient, createdDevices, { devices: [_deviceGroup] })

                await getDevice(apiClient, deviceGroup, true)
            })
        })
        
        describe("Basic Peerconnection Management", async function () {
            this.afterEach(async function() {
                await deleteDevices(apiClient, createdDevices)
                await deletePeerconnections(apiClient, createdPeerconnections)
            })

            it("should get all peerconnections", async function () {
                const response = await apiClient.getPeerconnections()
                assert(response.status == 200, "Unexpected response status")
            })

            it("should create a new peerconnection", async function () {
                const deviceA = await createConcreteDevice(apiClient, createdDevices)
                const deviceB = await createConcreteDevice(apiClient, createdDevices)
                const wsDeviceA = await openWebsocketConnection(apiClient, deviceA)
                const wsDeviceB = await openWebsocketConnection(apiClient, deviceB)
                await createPeerconnection(apiClient, createdPeerconnections, {
                    devices: [deviceA, deviceB]
                })
                wsDeviceA.close()
                wsDeviceB.close()
            })

            it("should get peerconnection by id", async function () {
                const deviceA = await createConcreteDevice(apiClient, createdDevices)
                const deviceB = await createConcreteDevice(apiClient, createdDevices)
                const wsDeviceA = await openWebsocketConnection(apiClient, deviceA)
                const wsDeviceB = await openWebsocketConnection(apiClient, deviceB)
                const peerconnection = await createPeerconnection(apiClient, createdPeerconnections, {
                    devices: [deviceA, deviceB]
                })
                await getPeerconnection(apiClient, peerconnection, { devices: { config: false, url: true } })
                wsDeviceA.close()
                wsDeviceB.close()
            })
        })
    })
}