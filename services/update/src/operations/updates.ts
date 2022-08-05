import { AppDataSource } from "../data_source"
import {
    getUpdatesSignature,
    deleteUpdatesByMacAddressSignature,
    getUpdatesByMacAddressSignature,
    patchUpdatesByMacAddressSignature,
    postUpdatesSignature
} from "../generated/signatures/updates"
import { UpdateInformation } from "../generated/types"
import { UpdateInformationModel } from "../model"

function formatUpdateInformation(updateInformation: UpdateInformationModel): UpdateInformation {
    return {
        mac_address: updateInformation.mac_address,
        newest_version: updateInformation.newest_version,
        newest_version_link: updateInformation.newest_version_link
    }
}

function writeUpdateInformation(updateInformationModel: UpdateInformationModel, updateInformation: UpdateInformation) {
    updateInformationModel.mac_address = updateInformation.mac_address
    updateInformationModel.newest_version = updateInformation.newest_version
    updateInformationModel.newest_version_link = updateInformationModel.newest_version_link
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

export const getUpdatesByMacAddress: getUpdatesByMacAddressSignature = async (parameters, _user) => {
    const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel)
    const updateInformation = await updateInformationRepository.findOneBy({ mac_address: parameters.mac_address })

    if (!updateInformation) {
        return {
            status: 404
        }
    }

    if (parameters.current_version !== updateInformation.newest_version) {
        return {
            status: 301,
            headers: {
                Location: updateInformation.newest_version_link
            }
        }
    }

    return {
        status: 200
    }
}

export const deleteUpdatesByMacAddress: deleteUpdatesByMacAddressSignature = async (parameters, _user) => {
    const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel)
    const updateInformation = await updateInformationRepository.findOneBy({ mac_address: parameters.mac_address })
    
    if (!updateInformation) {
        return {
            status: 404
        }
    }

    return {
        status: 204
    }
}

export const patchUpdatesByMacAddress: patchUpdatesByMacAddressSignature = async (parameters, body, _user) => {
    const updateInformationRepository = AppDataSource.getRepository(UpdateInformationModel)
    const updateInformation = await updateInformationRepository.findOneBy({ mac_address: parameters.mac_address })
    
    if (!updateInformation) {
        return {
            status: 404
        }
    }

    writeUpdateInformation(updateInformation, body)
    await updateInformationRepository.save(updateInformation)
    
    return {
        status: 200,
        body: formatUpdateInformation(updateInformation)
    }
}