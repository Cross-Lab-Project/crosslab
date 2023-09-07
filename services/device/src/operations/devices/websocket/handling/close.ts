import { connectedDevices } from './index.js';
import { repositories } from '../../../../database/dataSource.js';
import { ConcreteDeviceModel } from '../../../../database/model.js';
import { deviceUrlFromId } from '../../../../methods/urlFromId.js';
import { sendChangedCallback } from '../../../callbacks/index.js';
import { addDisconnectTimeout } from './disconnect.js';
import { logger } from '@crosslab/service-common';

export async function closeHandling(
    deviceModel: ConcreteDeviceModel,
    interval: NodeJS.Timeout,
    code: number,
    reason: Buffer,
) {
    // close handler: stop heartbeat and disconnect device
    deviceModel.connected = false;
    await repositories.concreteDevice.save(deviceModel);
    sendChangedCallback(deviceModel);
    connectedDevices.delete(deviceModel.uuid);
    clearInterval(interval);
    addDisconnectTimeout(deviceModel.uuid);

    logger.log(
        'info',
        `websocket connection for device '${deviceUrlFromId(deviceModel.uuid)}' closed`,
        {
            data: {
                code,
                reason,
            },
        },
    );
}
