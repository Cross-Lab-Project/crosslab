import { APIClient } from "@cross-lab-project/api-client"
import { ConcreteDevice, DeviceGroup, Peerconnection } from "@cross-lab-project/api-client/dist/generated/device/types"
import { Experiment } from "@cross-lab-project/api-client/dist/generated/experiment/types"
import assert, { fail } from "assert"
import { WebSocket } from "ws"
import { config } from "../config.js"
import { exampleExperiments } from "../example_data/experiment.js"
import { createConcreteDevice, createPeerconnection, deleteDevices, deletePeerconnections, openWebsocketConnection } from "./util/operations/device.js"
import { createExperiment, deleteExperiments } from "./util/operations/experiment.js"

export async function test() {
    const apiClient = new APIClient(config.ENDPOINT)

    describe("Experiment Service", async function () {
        this.beforeAll(async function() {
            const login_token = await apiClient.postLogin({ username: config.username, password: config.password, method: "tui" })
            console.log(login_token)
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

            xit("should get all experiments", async function () {
                const response = await apiClient.getExperiments()
                assert(response.status == 200, "Unexpected response status")
            })

            it("should create a new experiment", async function () {
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

                const connections: string[] = []
                for (let i = 0; i < devices.length; i++) {
                    for (let j = i+1; j < devices.length; j++) {
                        const connection = await createPeerconnection(apiClient, createdPeerconnections, { devices: [devices[i], devices[j]] })
                        assert(connection.url, "Peerconnection has no url")
                        connections.push(connection.url)
                    }
                }

                const experiment = exampleExperiments.basic
                experiment.devices = devices.map(d => { return { device: d.url, role: d.role as string } })
                experiment.connections = connections
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
                }]
                await createExperiment(apiClient, createdExperiments, experiment)
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

        xdescribe("Scenarios", async function () {
            // TBD
        })
    })
}