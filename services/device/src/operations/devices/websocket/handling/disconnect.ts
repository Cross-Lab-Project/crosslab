import { repositories } from '../../../../database/dataSource';
import { deviceUrlFromId } from '../../../../methods/urlFromId';
import { sendStatusChangedCallback } from '../../../callbacks';

export const disconnectTimeouts = new Map<string, NodeJS.Timeout>();

export function addDisconnectTimeout(deviceId: string) {
    if (disconnectTimeouts.get(deviceId)) return;

    disconnectTimeouts.set(
        deviceId,
        setTimeout(async () => {
            const peerconnections = await repositories.peerconnection.find({
                where: [
                    {
                        deviceA: {
                            url: deviceUrlFromId(deviceId),
                        },
                    },
                    {
                        deviceB: {
                            url: deviceUrlFromId(deviceId),
                        },
                    },
                ],
            });

            for (const peerconnection of peerconnections) {
                peerconnection.status = 'failed';
                await repositories.peerconnection.save(peerconnection);
                sendStatusChangedCallback(peerconnection);
            }

            removeDisconnectTimeout(deviceId);
        }, 120000),
    );
}

export function removeDisconnectTimeout(deviceId: string) {
    const timeout = disconnectTimeouts.get(deviceId);

    clearTimeout(timeout);

    disconnectTimeouts.delete(deviceId);
}
