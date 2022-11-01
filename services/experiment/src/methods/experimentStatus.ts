import { ConfiguredDeviceReference, Peerconnection } from '@cross-lab-project/api-client/dist/generated/device/types'
import { AppDataSource } from '../data_source'
// import { MalformedBodyError } from '../generated/types'
import { callbackUrl } from '../globals'
import {
    DeviceModel,
    ExperimentModel,
    ParticipantModel,
    PeerconnectionModel,
    ServiceConfigurationModel,
} from '../model'
import { DeviceNotConnectedError, InvalidBookingError, InvalidStateError, MissingPropertyError } from '../types/errors'
import { createPeerconnection, deletePeerconnection, getDevice, instantiateDevice, lockBooking, startCloudDeviceInstance } from './api'
import { experimentUrlFromId } from './utils'
import { bookExperiment as _bookExperiment } from './api'
// import { putBookingBodyType } from '@cross-lab-project/api-client/dist/generated/booking/signatures/booking'

/**
 * This function attempts to book an experiment.
 * @param experiment The experiment to be booked.
 */
async function bookExperiment(experiment: ExperimentModel) {
    console.log('booking experiment', experiment.uuid)
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)

    if (!experiment.devices || experiment.devices.length === 0)
        throw new MissingPropertyError(
            `Experiment ${experimentUrlFromId(experiment.uuid)} has no devices`
        )

    // TODO: book experiment
    // const currentTime = new Date()
    // const startTime = new Date(experiment.bookingStart ?? currentTime)
    // const endTime = new Date(experiment.bookingEnd ?? startTime.getTime() + 60*60*1000)

    // const bookingTemplate: putBookingBodyType = {
    //     Experiment: {
    //         Devices: experiment.devices.map(d => { 
    //             return { ID: d.url }
    //         })
    //     },
    //     Time: {
    //         Start: startTime.toISOString(),
    //         End: endTime.toISOString()
    //     },
    //     Type: 'normal'
    // }

    // const { BookingID: bookingId } = await _bookExperiment(bookingTemplate)
    // experiment.bookingStart = startTime.toISOString()
    // experiment.bookingEnd = startTime.toISOString()
    // experiment.bookingID = bookingId 

    experiment.status = 'booked'
    await experimentRepository.save(experiment)
}

function sortServiceParticipantsByDeviceId(
    serviceConfig: ServiceConfigurationModel & { devices: DeviceModel[] }
) {
    const swap = serviceConfig.devices[0] > serviceConfig.devices[1]
    return {
        ...serviceConfig,
        participants: swap
            ? [serviceConfig.participants![1], serviceConfig.participants![0]]
            : [serviceConfig.participants![0], serviceConfig.participants![1]],
        devices: swap
            ? [serviceConfig.devices[1], serviceConfig.devices[0]]
            : [serviceConfig.devices[0], serviceConfig.devices[1]],
    }
}

/**
 * This function returns the instance url of a device if defined,
 * otherwise it returns the url of the device.
 * @param device 
 * @returns The instance url or the url of the device.
 */
function getUrlOrInstanceUrl(device: DeviceModel): string {
    if (device.additionalProperties && device.additionalProperties.instanceUrl) {
        return device.additionalProperties.instanceUrl
    } else {
        return device.url
    }
}

function buildConnectionPlan(experiment: ExperimentModel): Peerconnection[] {
    console.log('building connection plan for experiment', experiment.uuid)
    if (
        !experiment.serviceConfigurations ||
        experiment.serviceConfigurations.length === 0
    )
        throw new MissingPropertyError(
            'Experiment must have a configuration to be run',
            400
        )

    if (!experiment.devices || experiment.devices.length === 0)
        throw new MissingPropertyError('Experiment must have a device to be run', 400)

    const pairwiseServiceConfigurations: typeof experiment['serviceConfigurations'] =
        toPairwiseServiceConfig(experiment)

    const deviceMappedServiceConfigs = mapRoleConfigToDevices(
        pairwiseServiceConfigurations,
        experiment
    )

    const sortedDeviceMappedServiceConfigs = deviceMappedServiceConfigs.map(
        sortServiceParticipantsByDeviceId
    )

    const peerconnections: Record<string, Pick<Required<Peerconnection>, 'devices'>> = {}
    for (const serviceConfig of sortedDeviceMappedServiceConfigs) {
        const lookupKey = `${serviceConfig.devices[0].url}::${serviceConfig.devices[1].url}`
        if (!(lookupKey in peerconnections)) {
            peerconnections[lookupKey] = {
                devices: [
                    { url: getUrlOrInstanceUrl(serviceConfig.devices[0]) },
                    { url: getUrlOrInstanceUrl(serviceConfig.devices[1]) },
                ],
            }
        }
        const peerconnection = peerconnections[lookupKey]

        updateServiceConfig(
            peerconnection.devices[0],
            serviceConfig,
            serviceConfig.participants[0],
            serviceConfig.participants[1]
        )
        updateServiceConfig(
            peerconnection.devices[1],
            serviceConfig,
            serviceConfig.participants[1],
            serviceConfig.participants[0]
        )
    }

    const peerconnectionsArray = Object.values(peerconnections)

    console.log(JSON.stringify(peerconnectionsArray))

    console.log('connection plan', JSON.stringify(peerconnectionsArray, null, 4))
    return peerconnectionsArray
}

function updateServiceConfig(
    device: ConfiguredDeviceReference,
    serviceConfig: ServiceConfigurationModel,
    participant: ParticipantModel,
    remoteParticipant: ParticipantModel
) {
    device.config = device.config ?? {}
    device.config.services = device.config.services ?? []
    device.config?.services?.push({
        ...JSON.parse(serviceConfig.configuration ?? "{}"),
        ...JSON.parse(participant.config ?? "{}"),
        serviceId: participant.serviceId,
        serviceType: serviceConfig.serviceType,
        remoteServiceId: remoteParticipant.serviceId,
    })
}

function mapRoleConfigToDevices(
    pairwiseServiceConfigurations: Required<ExperimentModel>['serviceConfigurations'],
    experiment: ExperimentModel
) {
    if (!experiment.devices || experiment.devices.length === 0) {
        throw new MissingPropertyError('Experiment must have a device to be run', 400)
    }
    const deviceMappedServiceConfigs: (ServiceConfigurationModel & {
        devices: DeviceModel[]
    })[] = []
    for (const serviceConfig of pairwiseServiceConfigurations) {
        if (!serviceConfig.participants || serviceConfig.participants.length !== 2) {
            throw new MissingPropertyError(
                'pairwiseServiceConfigurations must have exactly two participants',
                400
            )
        }
        const devicesA = experiment.devices
            .filter((d) => d.role === serviceConfig.participants![0].role)
            .map((d) => d)
        const devicesB = experiment.devices
            .filter((d) => d.role === serviceConfig.participants![1].role)
            .map((d) => d)
        for (const deviceA of devicesA) {
            for (const deviceB of devicesB) {
                if (deviceA !== deviceB) {
                    deviceMappedServiceConfigs.push({
                        ...serviceConfig,
                        devices: [deviceA, deviceB],
                    })
                } else {
                    // TODO: Handle same device
                }
            }
        }
    }
    return deviceMappedServiceConfigs
}

function toPairwiseServiceConfig(experiment: ExperimentModel) {
    if (!experiment.serviceConfigurations) {
        throw new MissingPropertyError(
            'Experiment must have a configuration to be run',
            400
        )
    }
    const pairwiseServiceConfigurations: Required<ExperimentModel>['serviceConfigurations'] =
        []

    for (const serviceConfig of experiment.serviceConfigurations) {
        const participants = serviceConfig.participants
        if (participants) {
            for (let i = 0; i < participants.length; i++) {
                for (let j = i + 1; j < participants.length; j++) {
                    const participantA = participants[i]
                    const participantB = participants[j]
                    // TODO: Check for Service Direction
                    pairwiseServiceConfigurations.push({
                        ...serviceConfig,
                        participants: [participantA, participantB],
                    })
                }
            }
        }
    }
    console.log('connection plan', JSON.stringify(pairwiseServiceConfigurations, null, 4))
    return pairwiseServiceConfigurations
}

async function createPeerconnections(experiment: ExperimentModel) {
    // establish peerconnections between the devices
    const peerconnectionPlans = buildConnectionPlan(experiment)
    for (const peerconnectionPlan of peerconnectionPlans) {
        // TODO: error handling
        const peerconnection = await createPeerconnection(peerconnectionPlan, { closedUrl: callbackUrl })
        if (!experiment.connections) experiment.connections = []
        if (!peerconnection.url)
            throw new MissingPropertyError(
                'Created peerconnection does not have a url',
                502
            )
        if (!peerconnection.devices)
            throw new MissingPropertyError(
                'Created peerconnection does not have devices',
                502
            )
        if (!peerconnection.devices[0].url || !peerconnection.devices[1].url)
            throw new MissingPropertyError(
                'Created peerconnection has a device without an url',
                502
            )

        // create, save and push new peerconnection
        const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
        const peerconnectionModel = peerconnectionRepository.create()
        peerconnectionModel.experiment = experiment
        peerconnectionModel.url = peerconnection.url
        peerconnectionModel.deviceA = peerconnection.devices[0].url
        peerconnectionModel.deviceB = peerconnection.devices[1].url
        experiment.connections.push(peerconnectionModel)
    }
}

/**
 * This function attempts to run an experiment.
 * @param experiment The experiment to be run.
 * @throws {InvalidStateError} Thrown when the status of the experiment is already "finished".
 */
export async function runExperiment(experiment: ExperimentModel) {
    console.log('running experiment', experiment.uuid)
    // make sure experiment is not already finished
    if (experiment.status === "finished") {
        throw new InvalidStateError(
            `Experiment status is already "finished"`,
            400
        )
    }

    // make sure the experiment contains devices
    if (!experiment.devices || experiment.devices.length === 0) {
        throw new MissingPropertyError(`Experiment does not contain any devices`, 400)
    }

    // book experiment if status is "created"
    if (experiment.status === "created") {
        await bookExperiment(experiment)
    }

    // make sure the experiment has a booking
    if (!experiment.bookingID) {
        throw new MissingPropertyError(`Experiment does not have a booking`, 400)
    }

    /**
     * This variable determines if the experiment needs to go into the state "setup".
     * The state "setup" is only needed if the experiment contains instantiable devices.
     */
    let needsSetup = false

    // make sure the concrete devices of the experiment are connected
    for (const device of experiment.devices) {
        const resolvedDevice = await getDevice(device.url) // TODO: error handling
        if (resolvedDevice.type === "device" && !resolvedDevice.connected) {
            throw new DeviceNotConnectedError(`Cannot start experiment since device ${device.url} is not connected`, 502) // NOTE: maybe there is a more fitting error code
        }

        // handle instantiable devices
        if (resolvedDevice.type === "cloud instantiable" || resolvedDevice.type === "edge instantiable") {
            needsSetup = true
            if (!resolvedDevice.url) throw new MissingPropertyError("Device is missing its url", 500) // NOTE: error code?
            const { instance, deviceToken } = await instantiateDevice(resolvedDevice.url, { changedURL: callbackUrl })
            if (!instance.url) throw new MissingPropertyError("Device instance is missing its url", 500) // NOTE: error code?
            if (!device.additionalProperties) device.additionalProperties = {}
            device.additionalProperties.instanceUrl = instance.url
            device.additionalProperties.deviceToken = deviceToken

            // instantiate cloud instantiable devices
            if (resolvedDevice.type === "cloud instantiable") {
                await startCloudDeviceInstance(resolvedDevice, instance.url, deviceToken)
            }
        }
    }

    // TODO: lock devices
    try {
        const { Booking: booking, Time: _timeslot, Tokens: _deviceTokenMapping } = await lockBooking(experiment.bookingID)
        if (booking.Status !== "active") {
            throw new InvalidBookingError(`The booking ${experiment.bookingID} is invalid for the experiment ${experimentUrlFromId(experiment.uuid)}`)
        }
    } catch (error) {
        // TODO: error handling
        throw error
    }

    if (needsSetup) {
        // TODO: instantiate cloud instantiable devices - done above
        // TODO: add callback to all devices/instances for changes
        // TODO: create peerconnections
        await createPeerconnections(experiment)
        experiment.status = 'setup'
    } else {
        await createPeerconnections(experiment)
        experiment.status = 'running'
    }

    // save experiment
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    await experimentRepository.save(experiment)
}

/**
 * This function attempts to finish an experiment.
 * @param experiment The experiment to be finished.
 */
export async function finishExperiment(experiment: ExperimentModel) {
    console.log('finishing experiment', experiment.uuid)
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)

    switch (experiment.status) {
        case 'created': {
            // nothing to do here as status is set to finished below
            break
        }
        case 'booked': {
            // TODO: delete booking (what to do if "booked" but no booking?)
            // if (experiment.bookingID)
            //     await deleteBooking(experiment.bookingID)
            break
        }
        case 'running': {
            // delete all peerconnections
            if (experiment.connections) {
                for (const peerconnection of experiment.connections) {
                    await deletePeerconnection(peerconnection.url)
                }
            }
            // TODO: unlock all devices (booking client missing)
            // if (experiment.bookingID)
            //     await unlockDevices(experiment.bookingID)

            // TODO: delete booking (booking client missing)
            // if (experiment.bookingID)
            //     await deleteBooking(experiment.bookingID)
            break
        }
        case 'finished': {
            // nothing to do since experiment is already finished
            break
        }
    }

    experiment.status = 'finished'
    await experimentRepository.save(experiment)
}
