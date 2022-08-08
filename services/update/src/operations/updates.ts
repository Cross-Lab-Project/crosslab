import { AppDataSource } from "../data_source"
import {
    getUpdatesSignature,
    deleteUpdatesByDeviceIdSignature,
    getUpdatesByDeviceIdSignature,
    patchUpdatesByDeviceIdSignature,
    postUpdatesSignature
} from "../generated/signatures/updates"
import { UpdateInformation } from "../generated/types"
import { UpdateInformationModel } from "../model"

function formatUpdateInformation(updateInformation: UpdateInformationModel): UpdateInformation {
    return {
        device_id: updateInformation.device_id,
        newest_version: updateInformation.newest_version,
        newest_version_link: updateInformation.newest_version_link
    }
}

function writeUpdateInformation(updateInformationModel: UpdateInformationModel, updateInformation: UpdateInformation) {
    updateInformationModel.device_id = updateInformation.device_id
    updateInformationModel.newest_version = updateInformation.newest_version
    updateInformationModel.newest_version_link = updateInformation.newest_version_link
}

export const getUpdates: getUpdatesSignature = async (_user) => {
    const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel)
    const updateInformationArray = await updateInformationRepository.find()

    return {
        status: 200,
        body: updateInformationArray.map(formatUpdateInformation)
    }
}

export const postUpdates: postUpdatesSignature = async (body, _user) => {
    const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel)
    const updateInformation = updateInformationRepository.create()

    writeUpdateInformation(updateInformation, body)
    await updateInformationRepository.save(updateInformation)
    
    return {
        status: 201,
        body: formatUpdateInformation(updateInformation)
    }
}

export const getUpdatesByDeviceId: getUpdatesByDeviceIdSignature = async (parameters) => {
    const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel)
    const updateInformation = await updateInformationRepository.findOneBy({ device_id: parameters.device_id })

    if (!updateInformation) {
        return {
            status: 404
        }
    }

    if (parameters.current_version !== updateInformation.newest_version) {
        return {
            status: 303,
            headers: {
                Location: updateInformation.newest_version_link
            }
        }
    }

    return {
        status: 200
    }
}

export const deleteUpdatesByDeviceId: deleteUpdatesByDeviceIdSignature = async (parameters, _user) => {
    const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel)
    const updateInformation = await updateInformationRepository.findOneBy({ device_id: parameters.device_id })
    
    if (!updateInformation) {
        return {
            status: 404
        }
    }

    await updateInformationRepository.delete(updateInformation)

    return {
        status: 204
    }
}

export const patchUpdatesByDeviceId: patchUpdatesByDeviceIdSignature = async (parameters, body, _user) => {
    const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel)
    const updateInformation = await updateInformationRepository.findOneBy({ device_id: parameters.device_id })
    
    if (!updateInformation) {
        return {
            status: 404
        }
    }

    if (updateInformation.device_id != body.device_id) {
        return {
            status: 400
        }
    }
    
    writeUpdateInformation(updateInformation, body)
    await updateInformationRepository.save(updateInformation)
    
    return {
        status: 200,
        body: formatUpdateInformation(updateInformation)
    }
}