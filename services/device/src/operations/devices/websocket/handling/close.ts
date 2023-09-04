import { connectedDevices } from '.';
import { repositories } from '../../../../database/dataSource';
import { ConcreteDeviceModel } from '../../../../database/model';
import { deviceUrlFromId } from '../../../../methods/urlFromId';
import { sendChangedCallback } from '../../../callbacks';
import { addDisconnectTimeout } from './disconnect';
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
