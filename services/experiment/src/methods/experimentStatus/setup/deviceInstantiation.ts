import { repositories } from '../../../database/dataSource';
import { ExperimentModel } from '../../../database/model';
import { InvalidStateError, MalformedExperimentError } from '../../../types/errors';
import { validateExperimentStatus } from '../../../types/typeguards';
import { InstantiatedDevice } from '../../../types/types';
import { apiClient } from '../../api';
import { experimentUrlFromId } from '../../url';
import { DeviceServiceTypes } from '@cross-lab-project/api-client';
import { logger } from '@crosslab/service-common';

export async function instantiateDevicesExperiment(
    experimentModel: ExperimentModel,
    instantiables: (
        | DeviceServiceTypes.InstantiableBrowserDevice
        | DeviceServiceTypes.InstantiableCloudDevice
    )[],
): Promise<InstantiatedDevice[]> {
    const experimentUrl = experimentUrlFromId(experimentModel.uuid);
    logger.log('info', 'Attempting to instantiate devices for experiment', {
        data: { experimentUrl },
    });

    if (experimentModel.status !== 'booking-locked')
        throw new InvalidStateError(
            `Expected experiment to have status 'booking-locked', instead has status '${experimentModel.status}'`,
        );

    if (!validateExperimentStatus(experimentModel, 'booking-locked'))
        throw new MalformedExperimentError(
            `Experiment is in status 'booking-locked', but does not satisfy the requirements for this status`,
            500,
        );

    // TODO: error handling
    const instances: InstantiatedDevice[] = [];
    for (const instantiable of instantiables) {
        const instantiableDevice = experimentModel.devices.find(
            (device) => device.url === instantiable.url,
        );

        if (!instantiableDevice || instantiableDevice.instance) continue;

        const instanceData = await apiClient.instantiateDevice(instantiable.url);
        instances.push({ ...instanceData.instance, token: instanceData.deviceToken });

        const instance = await repositories.instance.create({
            url: instanceData.instance.url,
            token: instanceData.deviceToken,
            codeUrl:
                instantiable.type === 'edge instantiable'
                    ? instantiable.codeUrl
                    : undefined,
        });
        await repositories.instance.save(instance);

        instantiableDevice.instance = instance;
    }

    experimentModel.status = 'devices-instantiated';

    await repositories.experiment.save(experimentModel);

    logger.log('info', 'Successfully instantiated devices for experiment', {
        data: { experimentUrl },
    });

    return instances;
}
