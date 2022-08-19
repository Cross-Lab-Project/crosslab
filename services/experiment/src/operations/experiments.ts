import {
	Experiment,
    ServiceConfiguration,
    Role
} from "../generated/types"
import {
    getExperimentsSignature,
	postExperimentsSignature,
	getExperimentsByExperimentIdSignature,
	deleteExperimentsByExperimentIdSignature,
	patchExperimentsByExperimentIdSignature
} from "../generated/signatures/experiments"
import { AppDataSource } from "../data_source"
import { 
    DeviceModel, 
    ExperimentModel, 
    ParticipantModel, 
    PeerconnectionModel, 
    RoleModel, 
    ServiceConfigurationModel 
} from "../model"
import { config } from "../config"
import { APIClient } from "@cross-lab-project/api-client"
import { Peerconnection } from "@cross-lab-project/api-client/dist/generated/device/types"

// global constants
const HOUR = 60 * 60 * 1000
const ExperimentBaseUrl = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'experiments/'
const apiClient = new APIClient({
    booking: config.BASE_URL_BOOKING,
    device: config.BASE_URL_DEVICE,
    experiment: config.BASE_URL,
    federation: config.BASE_URL_FEDERATION
});

function formatDevice(device: DeviceModel) {
    return {
        device: device.url,
        role: device.role
    }
}

function formatRole(role: RoleModel) {
    return {
        name: role.name,
        description: role.description
    }
}

function formatParticipant(participant: ParticipantModel) {
    return {
        role: participant.role,
        serviceId: participant.serviceId,
        config: participant.config ? JSON.parse(participant.config) : undefined
    }
}

function formatServiceConfiguration(serviceConfiguration: ServiceConfigurationModel): ServiceConfiguration {
    return {
        serviceType: serviceConfiguration.serviceType,
        configuration: serviceConfiguration.configuration ? JSON.parse(serviceConfiguration.configuration) : undefined,
        participants: serviceConfiguration.participants ? serviceConfiguration.participants.map(formatParticipant) : undefined
    }
}

function formatExperiment(experiment: ExperimentModel): Experiment {
    return {
        url: ExperimentBaseUrl + experiment.uuid,
        bookingTime: {
            startTime: experiment.bookingStart,
            endTime: experiment.bookingEnd
        },
        status: experiment.status,
        devices: experiment.devices ? experiment.devices.map(formatDevice) : undefined,
        roles: experiment.roles ? experiment.roles.map(formatRole) : undefined,
        connections: experiment.connections ? experiment.connections.map(c => c.url) : undefined,
        serviceConfigurations: experiment.serviceConfigurations ? experiment.serviceConfigurations.map(formatServiceConfiguration) : undefined
    }
}

function writeDevice(device: DeviceModel, object: { device?: string, role?: string }) {
    if (object.device) device.url = object.device
    if (object.role) device.role = object.role
}

function writeRole(role: RoleModel, object: Role) {
    if (object.name) role.name = object.name
    if (object.description) role.description = object.description
}

function writePeerconnection(peerconnection: PeerconnectionModel, object: string) {
    peerconnection.url = object
}

function writeParticipant(participant: ParticipantModel, object: { role?: string, serviceId?: string, config?: { serviceId?: string } }) {
    if (object.role) participant.role = object.role
    if (object.serviceId) participant.serviceId = object.serviceId
    if (object.config) participant.config = JSON.stringify(object.config)
}

async function writeServiceConfiguration(serviceConfiguration: ServiceConfigurationModel, object: ServiceConfiguration) {
    if (object.serviceType) serviceConfiguration.serviceType = object.serviceType
    if (object.configuration) serviceConfiguration.configuration = JSON.stringify(object.configuration)
    if (object.participants) {
        serviceConfiguration.participants = []
        const participantRepository = AppDataSource.getRepository(ParticipantModel)
        for (const p of object.participants) {
            const participant = participantRepository.create()
            writeParticipant(participant, p)
            await participantRepository.save(participant)
            serviceConfiguration.participants.push(participant)
        }
    }
}

async function writeExperiment(experiment: ExperimentModel, object: Experiment) {
    experiment.status = object.status ?? (experiment.status ?? "created")
    if (object.bookingTime) {
        if (object.bookingTime.startTime) experiment.bookingStart = object.bookingTime.startTime
        if (object.bookingTime.endTime) experiment.bookingEnd = object.bookingTime.endTime
    } else {
        const start = Date.now()
        const end = start + HOUR
        experiment.bookingStart = experiment.bookingStart ?? new Date(start).toISOString()
        experiment.bookingEnd = experiment.bookingEnd ?? new Date(end).toISOString()
    }
    if (object.devices) {
        experiment.devices = []
        const deviceRepository = AppDataSource.getRepository(DeviceModel)
        for (const d of object.devices) {
            const device = deviceRepository.create()
            writeDevice(device, d)
            await deviceRepository.save(device)
            experiment.devices.push(device)
        }
    }
    if (object.roles) {
        experiment.roles = []
        const roleRepository = AppDataSource.getRepository(RoleModel)
        for (const r of object.roles) {
            const role = roleRepository.create()
            writeRole(role, r)
            await roleRepository.save(role)
            experiment.roles.push(role)
        }
    }
    if (object.connections) {
        experiment.connections = []
        const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
        for (const pc of object.connections) {
            const peerconnection = peerconnectionRepository.create()
            writePeerconnection(peerconnection, pc)
            await peerconnectionRepository.save(peerconnection)
            experiment.connections.push(peerconnection)
        }
    }
    if (object.serviceConfigurations) {
        experiment.serviceConfigurations = []
        const serviceConfigurationRepository = AppDataSource.getRepository(ServiceConfigurationModel)
        for (const sc of object.serviceConfigurations) {
            const serviceConfiguration = serviceConfigurationRepository.create()
            await writeServiceConfiguration(serviceConfiguration, sc)
            await serviceConfigurationRepository.save(serviceConfiguration)
            experiment.serviceConfigurations.push(serviceConfiguration)
        }
    }
}

export const getExperiments: getExperimentsSignature = async (_user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiments = await experimentRepository.find()

    return {
        status: 200,
        body: experiments.map(formatExperiment)
    }
}

async function bookExperiment(experiment: ExperimentModel) {
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
    experiment.status = "booked"

    // // delete old booking
    // if (oldBookingID) {
    //     const response = await apiClient.deleteBookingManageByID({ ID: oldBookingID })
    //     if (response.status !== 200) throw new Error("API call was not successful")
    // }
    
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    experimentRepository.save(experiment)
}

function buildConnectionPlan(experiment: ExperimentModel): Peerconnection[] {
    if (!experiment.serviceConfigurations || experiment.serviceConfigurations.length === 0) throw new Error("Experiment must have a configuration to be run")
    if (!experiment.devices || experiment.devices.length === 0) throw new Error("Experiment must have a device to be run") 
    const peerconnections: (Peerconnection & { devices?: [{role?: string},{role?: string}]})[] = []
    for (let i = 0; i < experiment.devices.length; i++) {
        for (let j = i+1; j < experiment.devices.length; j++) {
            peerconnections.push({
                devices: [{
                    ...experiment.devices[i]
                },{
                    ...experiment.devices[j]
                }]
            })
        }
    }
    for (const serviceConfiguration of experiment.serviceConfigurations) {
        if (!serviceConfiguration.participants) throw new Error("Service configuration must have participants")
        if (!serviceConfiguration.configuration) serviceConfiguration.configuration = "{}"
        for (const participant of serviceConfiguration.participants) {
            if (!participant.config) participant.config = "{}"
            for (const peerconnection of peerconnections) {
                if (!peerconnection.devices) throw new Error("Peerconnection has no devices")
                for (let i = 0; i < 2; i++) {
                    if (!peerconnection.devices[i].role) throw new Error("Device has no role")
                    if (!peerconnection.devices[i].config) peerconnection.devices[i].config = { services: [] }
                    if (peerconnection.devices[i].role === participant.role) {
                        peerconnection.devices[i].config?.services?.push({
                            ...JSON.parse(serviceConfiguration.configuration),
                            ...JSON.parse(participant.config),
                            serviceId: participant.serviceId,
                            serviceType: serviceConfiguration.serviceType
                        })
                    }
                }
            }
        }
    }
    for (const peerconnection of peerconnections) {
        const servicesA = peerconnection.devices?.[0].config?.services
        const servicesB = peerconnection.devices?.[1].config?.services

        if (!servicesA) throw new Error("Device has no service")
        if (!servicesB) throw new Error("Device has no service")

        for (const serviceA of servicesA) {
            const serviceB = servicesB.find(s => s.serviceType === serviceA.serviceType)
            if (!serviceB) throw new Error("Service has no corresponding remote service")
            serviceA.remoteServiceId = serviceB.serviceId
            serviceB.remoteServiceId = serviceA.serviceId
        }

        for (const serviceB of servicesB) {
            if (serviceB.remoteServiceId) continue
            const serviceA = servicesA.find(s => s.serviceType === serviceB.serviceType)
            if (!serviceA) throw new Error("Service has no corresponding remote service")
            if (serviceA.remoteServiceId) throw new Error("Found service already has corresponding remote service")
            serviceA.remoteServiceId = serviceB.serviceId
            serviceB.remoteServiceId = serviceA.serviceId
        }
    }
    return peerconnections
}

async function runExperiment(experiment: ExperimentModel) {
    // make sure experiment is already booked
    if (experiment.status !== "booked") {
        // experiment is not booked
        throw new Error("Experiment is not booked")
    }

    // // check if booking id exists
    // if (!experiment.bookingID) {
    //     // fail because booked experiment has no booking id
    //     throw new Error("Booked experiment has no booking id")
    // }

    // const response = await apiClient.putBookingLockByID({ ID: experiment.bookingID })
    // if (response.status !== 200) throw new Error("API call was not successful")

    // establish peerconnections between the devices
    const peerconnections = buildConnectionPlan(experiment)
    for (const peerconnection of peerconnections) {
        // TODO: set closedURL
        const response = await apiClient.postPeerconnections({ closedUrl: undefined }, peerconnection)
        if (response.status !== 201) throw new Error("Peerconnection could not be established")
        if (!experiment.connections) experiment.connections = []
        if (!response.body.url) throw new Error("Created peerconnection does not have a url")
        // create, save and push new peerconnection
        const peerconnectionRepository = AppDataSource.getRepository(PeerconnectionModel)
        const peerconnectionModel = peerconnectionRepository.create()
        peerconnectionModel.experiment = experiment
        peerconnectionModel.url = response.body.url
        experiment.connections.push(peerconnectionModel)
    }

    // set experiment status to running and save experiment
    experiment.status = "running"
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    experimentRepository.save(experiment)
}

async function startExperiment(experiment: ExperimentModel) {
    // check if experiment is already booked 
    // if it is booked for the current time then proceed to start experiment
    // if booking is for different time then try to book experiment for current time
    // if successful then proceed to start experiment
    // else fail
    switch(experiment.status) {
        case "created": {
            await bookExperiment(experiment)
            await runExperiment(experiment)
            break
        }
        case "booked": {
            await runExperiment(experiment)
            break
        }
        case "running": {
            // nothing to do since experiment is already running
            break
        }
        case "finished": {
            // fail because experiment is already finished
            throw new Error("Cannot start finished experiment")
        }
    }
}

async function finishExperiment(experiment: ExperimentModel) {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)

    switch (experiment.status) {
        case "created": {
            // nothing to do here as status is set to finished below
            break
        }
        case "booked": {
            // // delete booking 
            // if (!experiment.bookingID) {
            //     throw new Error("Booked experiment does not have a booking id")
            // }
            // const response = await apiClient.deleteBookingManageByID({ ID: experiment.bookingID })
            // if (response.status !== 200) throw new Error("API call was not successful")
            break
        }
        case "running": {
            // delete all peerconnections
            if (!experiment.connections || experiment.connections.length === 0) {
                throw new Error("Running experiment does not have any peerconnections")
            }
            for (const peerconnection of experiment.connections) {
                const peerconnection_id = peerconnection.url.split("/").pop()
                if (!peerconnection_id) {
                    throw new Error("Peerconnection does not have an id")
                }
                const response = await apiClient.deletePeerconnectionsByPeerconnectionId({ peerconnection_id: peerconnection.url })
                console.log(response)
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
        case "finished": {
            // nothing to do since experiment is already finished
            break
        }
    }

    experiment.status = "finished"
    await experimentRepository.save(experiment)
}

export const postExperiments: postExperimentsSignature = async (body, _user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiment = experimentRepository.create()
    await writeExperiment(experiment, body)

    if (experiment.status === "booked") bookExperiment(experiment)
    if (experiment.status === "running") startExperiment(experiment)
    if (experiment.status === "finished") finishExperiment(experiment)
    await experimentRepository.save(experiment)

    return {
        status: 201,
        body: formatExperiment(experiment)
    }
}

export const getExperimentsByExperimentId: getExperimentsByExperimentIdSignature = async (parameters, _user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiment = await experimentRepository.findOne({
        where: {
            uuid: parameters.experiment_id
        },
        relations: {
            devices: true,
            connections: true,
            roles: true,
            serviceConfigurations: true
        }
    })

    if (!experiment) {
        return {
            status: 404
        }
    }

    return {
        status: 200,
        body: formatExperiment(experiment)
    }
}

export const deleteExperimentsByExperimentId: deleteExperimentsByExperimentIdSignature = async (parameters, _user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const result = await experimentRepository.softDelete({ uuid: parameters.experiment_id })

    if (!result.affected) {
        return {
            status: 404
        }
    }
    
    if (result.affected > 1) {
        // TBD
    }

    return {
        status: 204
    }
}

export const patchExperimentsByExperimentId: patchExperimentsByExperimentIdSignature = async (parameters, body, _user) => {
    const experimentRepository = AppDataSource.getRepository(ExperimentModel)
    const experiment = await experimentRepository.findOneBy({ uuid: parameters.experiment_id })

    if (!experiment) {
        return {
            status: 404
        }
    }

    if (body) await writeExperiment(experiment, body)
    
    if (experiment.status === "booked") bookExperiment(experiment)
    if (experiment.status === "running") startExperiment(experiment)
    if (experiment.status === "finished") finishExperiment(experiment)
    await experimentRepository.save(experiment)

    return {
        status: 200,
        body: formatExperiment(experiment)
    }
}
