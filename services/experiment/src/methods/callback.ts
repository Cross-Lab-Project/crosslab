import { isConcreteDevice, isDeviceGroup, isInstantiableBrowserDevice, isInstantiableCloudDevice, isPeerconnection } from "@cross-lab-project/api-client/dist/generated/device/types"
import { MalformedBodyError } from "../generated/types"
import { deviceChangedCallbacks, peerconnectionClosedCallbacks } from "../globals"
import { InvalidValueError } from "../types/errors"
import express from "express"

export function callbackHandling(app: express.Application) { // TODO: adapt callback handling after codegen update
    app.post('/experiments/callbacks', (req, res) => {
        const callback = req.body
        if (typeof callback !== "object") throw new MalformedBodyError("Body of callback is not an object", 400)
        const callbackType = getCallbackType(callback)
        
        switch (callbackType) {
            case 'event':
                return handleEventCallback(callback, res)
            default:
                throw new InvalidValueError(
                    `Callbacks of type "${req.body.callbackType}" are not supported`,
                    400
                )
        }
    })
}

function getCallbackType(callback: any) {
    if (typeof callback.callbackType !== "string") {
        throw new MalformedBodyError(
            'Property "callbackType" needs to be of type string', 
            400
        )
    }
    if (!callback.callbackType) {
        throw new MalformedBodyError(
            'Callbacks require property "callbackType"',
            400
        )
    }
    return callback.callbackType as string
}

function handleEventCallback(callback: any, res: express.Response) {
    if (!callback.eventType) {
        throw new MalformedBodyError(
            'Callbacks of type "event" require property "eventType"',
            400
        )
    }
    if (typeof callback.eventType !== "string") {
        throw new MalformedBodyError(
            'Property "callbackType" needs to be of type "string"', 
            400
        )
    }
    switch (callback.eventType) {
        case 'peerconnection-closed':
            return handlePeerconnectionClosedEventCallback(callback, res)
        case 'device-changes':
            return handleDeviceChangedEventCallback(callback, res)
        default:
            throw new InvalidValueError(
                `Event-callbacks of type "${callback.eventType}" are not supported`,
                400
            )
    }
}

function handlePeerconnectionClosedEventCallback(callback: any, res: express.Response) {
    if (!callback.peerconnection) {
        throw new MalformedBodyError(
            'Event-callbacks of type "peerconnection-closed" require property "peerconnection"',
            400
        )
    }
    const peerconnection = callback.peerconnection
    if (!isPeerconnection(peerconnection)) {
        throw new MalformedBodyError(
            'Property "peerconnection" is malformed',
            400
        )
    }
    if (!peerconnection.url) {
        throw new MalformedBodyError(
            'Property "peerconnection" is missing url',
            400
        )
    }
    if (!peerconnectionClosedCallbacks.includes(peerconnection.url)) {
        return res.status(410).send()
    }
    // TODO: add peerconnection closed handling
    return res.status(201).send()
}

function handleDeviceChangedEventCallback(callback: any, res: express.Response) {
    if (!callback.device) {
        throw new MalformedBodyError(
            'Event-callbacks of type "device-changed" require property "device"',
            400
        )
    }
    const device = callback.device
    if (!isConcreteDevice(callback.device) && 
        !isDeviceGroup(callback.device) &&
        !isInstantiableBrowserDevice(callback.device) &&
        !isInstantiableCloudDevice(callback.device)) 
    {
        throw new MalformedBodyError(
            'Property "device" is not a valid device',
            400
        )
    }
    if (!device.url) {
        throw new MalformedBodyError(
            'Property "device" is missing url',
            400
        )
    }
    if (!deviceChangedCallbacks.includes(device.url)) {
        return res.status(410).send()
    }
    // TODO: add device changed handling
    return res.status(201).send()
}