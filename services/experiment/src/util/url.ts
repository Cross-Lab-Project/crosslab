import { config } from '../config'
import { DeviceModel } from '../database/model'
import { RequestHandler } from './requestHandler'

/**
 * This function builds the url of an experiment using its id.
 * @param experimentId The id of the experiment.
 * @returns The url of the experiment.
 */
export function experimentUrlFromId(
    _requestHandler: RequestHandler,
    experimentId: string
): string {
    return (
        config.BASE_URL +
        (config.BASE_URL.endsWith('/') ? '' : '/') +
        'experiments/' +
        experimentId
    )
}

/**
 * This function returns the instance url of a device if defined,
 * otherwise it returns the url of the device.
 * @param deviceModel The device of which to get the url.
 * @returns The instance url or the url of the device.
 */
export function getUrlOrInstanceUrl(
    _requestHandler: RequestHandler,
    deviceModel: DeviceModel
): string {
    if (
        deviceModel.additionalProperties &&
        deviceModel.additionalProperties.instanceUrl
    ) {
        return deviceModel.additionalProperties.instanceUrl
    } else {
        return deviceModel.url
    }
}
