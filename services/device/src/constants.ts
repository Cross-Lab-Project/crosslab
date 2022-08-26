import { APIClient } from "@cross-lab-project/api-client";
import { config } from "./config";

export const YEAR = 365*24*60*60*1000
export const connectedDevices = new Map<string, WebSocket>();
export const DeviceBaseURL = config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'devices/'
export const changedCallbacks = new Map<string,Array<string>>()
export const apiClient = new APIClient({
    auth: config.BASE_URL_AUTH,
    booking: config.BASE_URL_BOOKING,
    device: config.BASE_URL,
    experiment: config.BASE_URL,
    federation: config.BASE_URL_FEDERATION,
    update: config.BASE_URL_UPDATE
})
