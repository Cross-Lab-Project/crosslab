import { APIClient } from '@cross-lab-project/api-client'
import { Peerconnection } from '@cross-lab-project/api-client/dist/generated/device/types'
import { config } from '../config'
import { AppDataSource } from '../data_source'
import { ExperimentModel, PeerconnectionModel } from '../model'
import { InvalidStateError, MissingPropertyError, ServiceConfigurationError } from '../types/errors'

const apiClient = new APIClient(config.BASE_URL)

export async function bookExperiment(experiment: ExperimentModel) {
    console.log('booking experiment', experiment.uuid)
    // if (experiment.status === "booked" && experiment.bookingID) {
    //     const response = await apiClient.getBookingManageByID({ ID: experiment.bookingID })
    //     if (response.status !== 200) {
    //         throw new Error("API call was not successful")
    //     }
    //     if (response.body.Time.Start === experiment.bookingStart && response.body.Time.End === experiment.bookingStart) {
    //         // nothing to do since experiment is already booked for this timeframe
    //         return
    //     }
    // }

    // // book devices for requested timeframe or default timeframe of one hour
    // const bookingStart = experiment.bookingStart ?? new Date(Date.now()).toISOString()
    // const bookingEnd = experiment.bookingEnd ?? new Date(Date.now() + HOUR).toISOString()
    // const bookingStartDate = new Date(bookingStart)
    // const bookingEndDate = new Date(bookingEnd)
    // const oldBookingID = experiment.bookingID

    // // should this check really be done here or should this also be handled by the booking service?
    // if (bookingStartDate.getTime() > bookingEndDate.getTime()) {
    //     // fail because start time is after end time
    //     throw new Error("Impossible timeframe")
    // }

    // if (!experiment.devices || experiment.devices.length === 0) {
    //     // fail because experiment has no devices?
    //     throw new Error("No devices to be booked")
    // }

    // // try to book experiment
    // const response = await apiClient.putBookingManage({
    //     Experiment: {
    //         Devices: experiment.devices ? experiment.devices.map(d => {
    //             return { ID: d.url }
    //         }) : []
    //     },
    //     Time: {
    //         Start: bookingStart,
    //         End: bookingEnd
    //     }
    // })

    // if (response.status !== 200) throw new Error("API call was not successful")

    // save booking id somewhere such that it can be checked later
    // experiment.bookingID = response.body.BookingID
    experiment.status = 'booked'

    // // delete old booking
    // if (oldBookingID) {
    //     const response = await apiClient.deleteBookingManageByID({ ID: oldBookingID })
    //     if (response.status !== 200) throw new Error("API call was not successful")
    // }

    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    await experimentRepository.save(experiment)
}

function buildConnectionPlan(experiment: ExperimentModel): Peerconnection[] {
    console.log('building connection plan for experiment', experiment.uuid)
    if (
        !experiment.serviceConfigurations ||
        experiment.serviceConfigurations.length === 0
    )
        throw new MissingPropertyError('Experiment must have a configuration to be run', 400)
    if (!experiment.devices || experiment.devices.length === 0)
        throw new MissingPropertyError('Experiment must have a device to be run', 400)
    const peerconnections: (Peerconnection & {
        devices?: [{ role?: string }, { role?: string }]
    })[] = []
    for (let i = 0; i < experiment.devices.length; i++) {
        for (let j = i + 1; j < experiment.devices.length; j++) {
            peerconnections.push({
                devices: [
                    {
                        ...experiment.devices[i],
                    },
                    {
                        ...experiment.devices[j],
                    },
                ],
            })
        }
    }
    for (const serviceConfiguration of experiment.serviceConfigurations) {
        if (!serviceConfiguration.participants)
            throw new MissingPropertyError('Service configuration must have participants', 400)
        if (!serviceConfiguration.configuration) serviceConfiguration.configuration = '{}'
        for (const participant of serviceConfiguration.participants) {
            if (!participant.config) participant.config = '{}'
            for (const peerconnection of peerconnections) {
                if (!peerconnection.devices)
                    throw new MissingPropertyError('Peerconnection has no devices', 400)
                for (let i = 0; i < 2; i++) {
                    if (!peerconnection.devices[i].role)
                        throw new MissingPropertyError('Device has no role', 400)
                    if (!peerconnection.devices[i].config)
                        peerconnection.devices[i].config = { services: [] }
                    if (peerconnection.devices[i].role === participant.role) {
                        const peerdevice =
                            i === 0
                                ? peerconnection.devices[1]
                                : peerconnection.devices[0]
                        const peerparticipant = serviceConfiguration.participants.find(
                            (p) => p.role === peerdevice.role
                        )
                        if (!peerparticipant)
                            throw new ServiceConfigurationError('Peer device is not participating in service', 400)
                        if (!peerparticipant)
                            throw new MissingPropertyError('ServiceId is missing in participant', 400)
                        peerconnection.devices[i].config?.services?.push({
                            ...JSON.parse(serviceConfiguration.configuration),
                            ...JSON.parse(participant.config),
                            serviceId: participant.serviceId,
                            serviceType: serviceConfiguration.serviceType,
                            remoteServiceId: peerparticipant.serviceId,
                        })
                    }
                }
            }
        }
    }
    // for (const peerconnection of peerconnections) {
    //     const servicesA = peerconnection.devices?.[0].config?.services
    //     const servicesB = peerconnection.devices?.[1].config?.services

    //     if (!servicesA || servicesA.length === 0) throw new Error("Device has no service") // TODO: find better error
    //     if (!servicesB || servicesB.length === 0) throw new Error("Device has no service") // TODO: find better error

    //     for (const serviceA of servicesA) {
    //         const serviceB = servicesB.find(s => s.serviceType === serviceA.serviceType)
    //         if (!serviceB) throw new Error("Service has no corresponding remote service") // TODO: find better error
    //         serviceA.remoteServiceId = serviceB.serviceId
    //         serviceB.remoteServiceId = serviceA.serviceId
    //     }

    //     for (const serviceB of servicesB) {
    //         if (serviceB.remoteServiceId) continue
    //         const serviceA = servicesA.find(s => s.serviceType === serviceB.serviceType)
    //         if (!serviceA) {
    //             console.log("connection plan", JSON.stringify(peerconnections, null, 4))
    //             throw new Error("Service has no corresponding remote service") // TODO: find better error
    //         }
    //         if (serviceA.remoteServiceId) {
    //             console.log("connection plan", JSON.stringify(peerconnections, null, 4))
    //             throw new Error("Found service already has corresponding remote service") // TODO: find better error
    //         }
    //         serviceA.remoteServiceId = serviceB.serviceId
    //         serviceB.remoteServiceId = serviceA.serviceId
    //     }
    // }

    console.log('connection plan', JSON.stringify(peerconnections, null, 4))
    return peerconnections
}

async function runExperiment(experiment: ExperimentModel) {
    console.log('running experiment', experiment.uuid)
    // make sure experiment is already booked
    if (experiment.status !== 'booked') {
        // experiment is not booked
        throw new InvalidStateError(`Experiment status is "${experiment.status}", expected "booked"`, 400)
    }

    // // check if booking id exists
    // if (!experiment.bookingID) {
    //     // fail because booked experiment has no booking id
    //     throw new Error("Booked experiment has no booking id")
    // }

    // const response = await apiClient.putBookingLockByID({ ID: experiment.bookingID })
    // if (response.status !== 200) throw new Error("API call was not successful")

    // establish peerconnections between the devices
    const peerconnectionPlans = buildConnectionPlan(experiment)
    for (const peerconnectionPlan of peerconnectionPlans) {
        // TODO: set closedURL
        const peerconnection = await apiClient.createPeerconnection(
            apiClient.url,
            peerconnectionPlan,
            undefined
        )
        if (!experiment.connections) experiment.connections = []
        if (!peerconnection.url)
            throw new MissingPropertyError('Created peerconnection does not have a url', 502)
        // create, save and push new peerconnection
        const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
        const peerconnectionModel = peerconnectionRepository.create()
        peerconnectionModel.experiment = experiment
        peerconnectionModel.url = peerconnection.url
        experiment.connections.push(peerconnectionModel)
    }

    // set experiment status to running and save experiment
    experiment.status = 'running'
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    await experimentRepository.save(experiment)
}

export async function startExperiment(experiment: ExperimentModel) {
    // check if experiment is already booked
    // if it is booked for the current time then proceed to start experiment
    // if booking is for different time then try to book experiment for current time
    // if successful then proceed to start experiment
    // else fail
    console.log(
        'starting experiment',
        experiment.uuid,
        'with current status:',
        experiment.status
    )
    switch (experiment.status) {
        case 'created': {
            await bookExperiment(experiment)
            await runExperiment(experiment)
            break
        }
        case 'booked': {
            await runExperiment(experiment)
            break
        }
        case 'running': {
            // nothing to do since experiment is already running
            break
        }
        case 'finished': {
            // fail because experiment is already finished
            throw new InvalidStateError('Cannot start finished experiment') 
        }
    }
}

export async function finishExperiment(experiment: ExperimentModel) {
    console.log('finishing experiment', experiment.uuid)
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)

    switch (experiment.status) {
        case 'created': {
            // nothing to do here as status is set to finished below
            break
        }
        case 'booked': {
            // // delete booking
            // if (!experiment.bookingID) {
            //     throw new Error("Booked experiment does not have a booking id")
            // }
            // const response = await apiClient.deleteBookingManageByID({ ID: experiment.bookingID })
            // if (response.status !== 200) throw new Error("API call was not successful")
            break
        }
        case 'running': {
            // delete all peerconnections
            if (experiment.connections) {
                for (const peerconnection of experiment.connections) {
                    await apiClient.deletePeerconnection(peerconnection.url)
                }
            }
            // // unlock all devices
            // if (!experiment.bookingID) {
            //     throw new Error("Running experiment does not have a booking id")
            // }
            // const responseLock = await apiClient.deleteBookingLockByID({ ID: experiment.bookingID })
            // if (responseLock.status !== 200) throw new Error("API call was not successful")

            // // delete booking
            // const responseBooking = await apiClient.deleteBookingManageByID({ ID: experiment.bookingID })
            // if (responseBooking.status !== 200) throw new Error("API call was not successful")
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
