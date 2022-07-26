import { APIClient } from "@cross-lab-project/api-client"
import { postDevicesByDeviceIdAvailabilityBodyType } from "@cross-lab-project/api-client/dist/generated/device/signatures/devices"
import { ConcreteDevice, DeviceGroup, Peerconnection, TimeSlot } from "@cross-lab-project/api-client/dist/generated/device/types"
import assert, { fail } from "assert"
import { WebSocket } from "ws"
import { config } from "../../../config.js"
import { exampleDevices } from "../../../example_data/devices.js"
import { getId } from "../common.js"
import { compareConcreteDevices, compareDeviceGroups, CompareOptionsPeerconnection, comparePeerconnections, compareTimeSlots } from "../compare/device.js"
import { AuthenticationMessage, isAuthenticationMessage, isMessage } from "../deviceMessages.js"

export async function createConcreteDevice(apiClient: APIClient, createdDevices: (ConcreteDevice|DeviceGroup)[], values?: Partial<ConcreteDevice>, changedUrl?: string): Promise<ConcreteDevice> {
    // prepare concrete device for posting
    const concreteDevice = exampleDevices.concrete.basic
    if (values) {
        if (values.announcedAvailability) concreteDevice.announcedAvailability = values.announcedAvailability
        if (values.connected) concreteDevice.connected = values.connected
        if (values.description) concreteDevice.description = values.description
        if (values.experiment) concreteDevice.experiment = values.experiment
        if (values.name) concreteDevice.name = values.name
        if (values.owner) concreteDevice.owner = values.owner
        if (values.type) concreteDevice.type = values.type
        if (values.url) concreteDevice.url = values.url
    }

    // post concrete device and check that it was created correctly
    const response = await apiClient.postDevices({ changedUrl: changedUrl }, concreteDevice)
    assert(response.status == 201, "Unexpected response status")
    assert(response.body.type == "device", "Returned device is not of type 'device'")
    assert(compareConcreteDevices(response.body, concreteDevice, { url: false, connected: false }))

    // add created concrete device to the list of created devices
    createdDevices.push(response.body)

    return response.body
}

export async function createDeviceGroup(apiClient: APIClient, createdDevices: (ConcreteDevice|DeviceGroup)[], values?: Partial<DeviceGroup>, changedUrl?: string): Promise<DeviceGroup> {
    // prepare device group for posting
    const deviceGroup = exampleDevices.group.basic
    if (values) {
        if (values.description) deviceGroup.description = values.description
        if (values.devices) deviceGroup.devices = values.devices
        if (values.name) deviceGroup.name = values.name
        if (values.owner) deviceGroup.owner = values.owner
        if (values.type) deviceGroup.type = values.type
        if (values.url) deviceGroup.url = values.url
    }

    // post device group and check that it was created correctly
    const response = await apiClient.postDevices({ changedUrl: changedUrl }, deviceGroup)
    assert(response.status == 201, "Unexpected response status")
    assert(response.body.type == "group", "Returned device is not of type 'group'")
    assert(compareDeviceGroups(response.body, deviceGroup, { url: false }))

    // add created device group to the list of created devices
    createdDevices.push(response.body)

    return response.body
}

export async function createPeerconnection(apiClient: APIClient, createdPeerconnections: Peerconnection[], peerconnection: Peerconnection, closedUrl?: string, options?: Partial<CompareOptionsPeerconnection>): Promise<Peerconnection> {
    const compareOptions: Partial<CompareOptionsPeerconnection> = options ?? {}
    compareOptions.url = false
    const response = await apiClient.postPeerconnections({ closedUrl: closedUrl }, peerconnection)
    assert(response.status == 201, "Unexpected response status")
    assert(comparePeerconnections(response.body, peerconnection, compareOptions))

    createdPeerconnections.push(response.body)

    return response.body
}

export async function deleteDevices(apiClient: APIClient, devices: (ConcreteDevice|DeviceGroup)[]) {
    while (devices.length > 0) {
        const device = devices.pop()
        assert(device, "Device is undefined")
        const response = await apiClient.deleteDevicesByDeviceId({ device_id: getId(device) })
        assert(response.status == 204, "Unexpected response status")
    }
}

export async function deletePeerconnections(apiClient: APIClient, peerconnections: Peerconnection[]) {
    while (peerconnections.length > 0) {
        const peerconnection = peerconnections.pop()
        assert(peerconnection, "Peerconnection is undefined")
        const response = await apiClient.deletePeerconnectionsByPeerconnectionId({ peerconnection_id: getId(peerconnection) })
        assert(response.status == 204, "Unexpected response status")
    }
}

// TODO: maybe add option when a failure is expected
export async function patchDevice<T extends ConcreteDevice|DeviceGroup>(apiClient: APIClient, device: T, values?: Partial<T>, changedUrl?: string): Promise<T> {
    // prepare device for patching
    if (values) {
        if (values.announcedAvailability) device.announcedAvailability = values.announcedAvailability
        if (values.connected) device.connected = values.connected
        if (values.description) device.description = values.description
        if (values.experiment) device.experiment = values.experiment
        if (values.name) device.name = values.name
        if (values.owner) device.owner = values.owner
        if (values.type) device.type = values.type
        if (values.url) device.url = values.url
        if (values.devices) device.devices = values.devices
    }

    // patch device and check that it was updated correctly
    const response = await apiClient.patchDevicesByDeviceId({ device_id: getId(device), changedUrl: changedUrl }, device)
    assert(response.status == 200, "Unexpected response status")
    assert(response.body.type == device.type, "Type of returned device differs from type of device")
    if (response.body.type == "device" && device.type == "device") assert(compareConcreteDevices(response.body, device))
    if (response.body.type == "group" && device.type == "group") assert(compareDeviceGroups(response.body, device))

    return response.body as T
}

export async function getToken(apiClient: APIClient, device: ConcreteDevice): Promise<string> {
    const response = await apiClient.getDevicesByDeviceIdToken({ device_id: getId(device) })
    assert(response.status == 200, "Unexpected response status")
    assert(response.body, "Did not receive a token for the device")

    return response.body
}

// TODO: change post availability to accept TimeSlot[]
export async function postAvailability(apiClient: APIClient, device: ConcreteDevice, availability: postDevicesByDeviceIdAvailabilityBodyType): Promise<TimeSlot[]> {
    const response = await apiClient.postDevicesByDeviceIdAvailability({ device_id: getId(device) }, availability)
    assert(response.status == 200, "Unexpected response status")
    if (!availability) availability = []
    assert(response.body.length == availability.length, "Amount of received timeslots differs from amount of sent timeslots")
    for (let i = 0; i < availability.length; i++) {
        assert(compareTimeSlots(response.body[i], availability[i]))
    }

    return response.body
}

export async function getDevice<T extends ConcreteDevice|DeviceGroup>(apiClient: APIClient, device: T, flat_group?: boolean): Promise<T> {
    const response = await apiClient.getDevicesByDeviceId({ device_id: getId(device), flat_group: flat_group })
    assert(response.status == 200, "Unexpected response status")
    assert(response.body.type == device.type, "Type of returned device differs from type of device")
    if (response.body.type == "device" && device.type == "device") assert(compareConcreteDevices(response.body, device))
    if (response.body.type == "group" && device.type == "group") assert(compareDeviceGroups(response.body, device, undefined, flat_group))

    return response.body as T
}

export async function getPeerconnection(apiClient: APIClient, peerconnection: Peerconnection, options?: Partial<CompareOptionsPeerconnection> | boolean): Promise<Peerconnection> {
    const response = await apiClient.getPeerconnectionsByPeerconnectionId({ peerconnection_id: getId(peerconnection) })
    assert(response.status == 200, "Unexpected response status")
    assert(comparePeerconnections(response.body, peerconnection, options))

    return response.body
}

export async function openWebsocketConnection(apiClient: APIClient, device: ConcreteDevice): Promise<WebSocket> {
    const ws = new WebSocket(config.ENDPOINT.replace("http", "ws") + "/devices/ws")
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Websocket connection could not be established")), 1000)
        ws.on("open", async () => {
            clearTimeout(timeout)
            console.log(`Websocket connection opened for Device ${device.url}`)
            const authMessage: AuthenticationMessage = {
                id: getId(device),
                messageType: "authenticate",
                token: await getToken(apiClient, device)
            }
            ws.send(JSON.stringify(authMessage))
            ws.on("message", (msg) => {
                console.log(`Device ${device.url} received: ${msg}`)
                const message = JSON.parse(msg.toString())
                if (isMessage(message) && isAuthenticationMessage(message)) {
                    if (message.authenticated) resolve(ws)
                    else reject("Websocket connection not authenticated")
                }
            })
            ws.on("close", () => {
                console.log(`Websocket connection closed for Device ${device.url}`)
            })
        })
    })
}