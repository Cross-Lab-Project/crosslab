import { config } from '../config.js';
import { DeviceModel } from '../database/model.js';

/**
 * This function builds the url of an experiment using its id.
 * @param experimentId The id of the experiment.
 * @returns The url of the experiment.
 */
export function experimentUrlFromId(experimentId: string): string {
  return (
    config.BASE_URL +
    (config.BASE_URL.endsWith('/') ? '' : '/') +
    'experiments/' +
    experimentId
  );
}

/**
 * This function builds the url of a template using its id.
 * @param templateId The id of the template.
 * @returns The url of the template.
 */
export function templateUrlFromId(templateId: string): string {
  return (
    config.BASE_URL +
    (config.BASE_URL.endsWith('/') ? '' : '/') +
    'templates/' +
    templateId
  );
}

/**
 * This function returns the instance url of a device if defined,
 * otherwise it returns the url of the device.
 * @param deviceModel The device of which to get the url.
 * @returns The instance url or the url of the device.
 */
export function getUrlOrInstanceUrl(deviceModel: DeviceModel): string {
  if (deviceModel.instance && deviceModel.instance.url) {
    return deviceModel.instance.url;
  } else {
    return deviceModel.url;
  }
}
