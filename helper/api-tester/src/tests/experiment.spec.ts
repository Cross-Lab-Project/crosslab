import { APIClient } from "@cross-lab-project/api-client"
import { ConcreteDevice, DeviceGroup, Peerconnection } from "@cross-lab-project/api-client/dist/generated/device/types"
import { Experiment } from "@cross-lab-project/api-client/dist/generated/experiment/types"
import assert from "assert"
import { WebSocket } from "ws"
import { config } from "../config"
import { exampleExperiments } from "../example_data/experiment"
import { createConcreteDevice, createPeerconnection, deleteDevices, deletePeerconnections, openWebsocketConnection } from "./util/operations/device"
import { createExperiment, deleteExperiments } from "./util/operations/experiment"

export async function test() {
    const apiClient = new APIClient(config.ENDPOINT)
    // const apiClient = new APIClient("http://localhost")

    describe("Experiment Service", async function () {
        this.beforeAll(async function() {
            await apiClient.postLogin({ username: config.USERNAME, password: config.PASSWORD, method: "tui" })
        })

        describe("Basic Experiment Management", async function () {
            const createdDevices: (ConcreteDevice|DeviceGroup)[] = []
            const createdPeerconnections: Peerconnection[] = []
            const createdExperiments: Experiment[] = []

            this.afterEach(async function() {
                await deleteDevices(apiClient, createdDevices)
                await deletePeerconnections(apiClient, createdPeerconnections)
                await deleteExperiments(apiClient, createdExperiments)
            })

            it("should get all experiments", async function () {
                const response = await apiClient.getExperiments()
                assert(response.status == 200, "Unexpected response status")
            })

            xit("should create a new experiment", async function () {
                this.timeout(0)
                const devices: ConcreteDevice[] = []
                const websockets: WebSocket[] = []
                for (let i = 0; i < 3; i++) {
                    const device = await createConcreteDevice(apiClient, createdDevices)
                    const ws = await openWebsocketConnection(apiClient, device)
                    devices.push(device)
                    websockets.push(ws)
                }
                devices[0].role = "User"
                devices[1].role = "Model"
                devices[2].role = "Guest"

                const experiment = exampleExperiments.basic
                experiment.status = "running"
                experiment.devices = devices.map(d => { return { device: d.url, role: d.role as string } })
                experiment.roles = [{
                    name: "User",
                    description: "Active participant of an experiment"
                },{
                    name: "Model",
                    description: "Controlled hardware model"
                },{
                    name: "Guest",
                    description: "Passive participant of an experiment"
                }]
                experiment.serviceConfigurations = [{
                    serviceType: "test:service",
                    configuration: {
                        test: "This is a test configuration"
                    },
                    participants: [{
                        role: "User",
                        serviceId: "UserService",
                        config: {
                            test: "This is a test configuration"
                        }
                    }]
                },{
                    serviceType: "test:service",
                    configuration: {
                        test: "This is a test configuration"
                    },
                    participants: [{
                        role: "Model",
                        serviceId: "UserService",
                        config: {
                            test: "This is a test configuration"
                        }
                    }]
                },{
                    serviceType: "test:service",
                    configuration: {
                        test: "This is a test configuration"
                    },
                    participants: [{
                        role: "Guest",
                        serviceId: "UserService",
                        config: {
                            test: "This is a test configuration"
                        }
                    }]
                }]
                const response = await createExperiment(apiClient, createdExperiments, experiment)
                console.log(JSON.stringify(response, null, 4))
                // for (const device of devices) {
                //     console.log(await (await apiClient.getDevicesByDeviceId({ device_id: device.url?.split("/").pop()! })).body)
                // }
                websockets.forEach(ws => ws.close())
            })

            xit("should patch an experiment", async function () {
                const devices: ConcreteDevice[] = []
                const websockets: WebSocket[] = []
                for (let i = 0; i < 3; i++) {
                    const device = await createConcreteDevice(apiClient, createdDevices)
                    const ws = await openWebsocketConnection(apiClient, device)
                    devices.push(device)
                    websockets.push(ws)
                }
                devices[0].role = "User"
                devices[1].role = "Model"
                devices[2].role = "Guest"

                const connections: string[] = []
                for (let i = 0; i < devices.length; i++) {
                    for (let j = i+1; j < devices.length; j++) {
                        const connection = await createPeerconnection(apiClient, createdPeerconnections, { devices: [devices[i], devices[j]] })
                        assert(connection.url, "Peerconnection has no url")
                        connections.push(connection.url)
                    }
                }

                const experimentTemplate = exampleExperiments.basic
                experimentTemplate.devices = devices.map(d => { return { device: d.url, role: d.role as string } })
                experimentTemplate.connections = connections
                experimentTemplate.roles = [{
                    name: "User",
                    description: "Active participant of an experiment"
                },{
                    name: "Model",
                    description: "Controlled hardware model"
                },{
                    name: "Guest",
                    description: "Passive participant of an experiment"
                }]
                experimentTemplate.serviceConfigurations = [{
                    serviceType: "test:service",
                    configuration: {
                        test: "This is a test configuration"
                    },
                    participants: [{
                        role: "User",
                        serviceId: "UserService",
                        config: {
                            test: "This is a test configuration"
                        }
                    }]
                }]
                const experiment = await createExperiment(apiClient, createdExperiments, experimentTemplate)
                // TBD: patch experiment
                websockets.forEach(ws => ws.close())
            })
        })

        describe("Scenarios", async function () {
            const createdDevices: (ConcreteDevice|DeviceGroup)[] = []
            const createdPeerconnections: Peerconnection[] = []
            const createdExperiments: Experiment[] = []

            it("should work in test scenario 1", async function() {
                const devices: ConcreteDevice[] = []
                const websockets: WebSocket[] = []
                for (let i = 0; i < 2; i++) {
                    const device = await createConcreteDevice(apiClient, createdDevices)
                    const ws = await openWebsocketConnection(apiClient, device)
                    devices.push(device)
                    websockets.push(ws)
                }

                const experimentTemplate: Experiment = {
                    status: "running",
                    devices: [
                        {
                            device: devices[0].url,
                            role: "device1"
                        }, 
                        {
                            device: devices[1].url,
                            role: "device2"
                        }
                    ],
                    roles: [
                        {
                            name: "device1",
                            description: "description of device1"
                        }, 
                        {
                            name: "device2",
                            description: "description of device2"
                        }
                    ],
                    serviceConfigurations: [
                        {
                            serviceType: "https://api.goldi-labs.de/serviceTypes/1",
                            configuration: {},
                            participants: [
                                {
                                    role: "device1",
                                    serviceId: "sensors",
                                    config: {
                                        interfaces: [
                                            {
                                                interfaceId: "1",
                                                interfaceType: "GPIO"
                                            }
                                        ]
                                    }
                                },
                                {
                                    role: "device2",
                                    serviceId: "sensors",
                                    config: {
                                        interfaces: [
                                            {
                                                interfaceId: "1",
                                                interfaceType: "GPIO"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
                const experiment = await createExperiment(apiClient, createdExperiments, experimentTemplate)
                console.log(JSON.stringify(experiment, null, 4))

                websockets.forEach(ws => ws.close())
            })    
        })
    })
}