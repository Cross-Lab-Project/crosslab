import { logger } from '@crosslab/service-common';
import assert from 'assert';

import { Clients } from '../../clients/index.js';
import { repositories } from '../../database/dataSource.js';
import { ExperimentModel } from '../../database/model.js';
import { validateExperimentStatus } from '../../types/typeguards.js';
import { experimentUrlFromId } from '../url.js';

/**
 * This function attempts to finish an experiment.
 * @param experimentModel The experiment to be finished.
 */
export async function finishExperiment(
  experimentModel: ExperimentModel,
  clients: Clients,
) {
  const experimentUrl = experimentUrlFromId(experimentModel.uuid);
  logger.log('info', 'Attempting to finish experiment', { data: { experimentUrl } });

  switch (experimentModel.status) {
    case 'created': {
      break;
    }
    case 'booked': {
      assert(validateExperimentStatus(experimentModel, 'booked'));

      // await apiClient.deleteBooking(experimentModel.bookingID)

      break;
    }
    case 'booking-locked': {
      assert(validateExperimentStatus(experimentModel, 'booking-locked'));

      // await apiClient.unlockBooking(experimentModel.bookingID)
      // await apiClient.deleteBooking(experimentModel.bookingID)

      break;
    }
    case 'devices-instantiated': {
      assert(validateExperimentStatus(experimentModel, 'devices-instantiated'));

      // await apiClient.unlockBooking(experimentModel.bookingID)
      // await apiClient.deleteBooking(experimentModel.bookingID)
      await deleteInstances(experimentModel, clients);

      break;
    }
    case 'booking-updated': {
      assert(validateExperimentStatus(experimentModel, 'booking-updated'));

      // await apiClient.unlockBooking(experimentModel.bookingID)
      // await apiClient.deleteBooking(experimentModel.bookingID)
      await deleteInstances(experimentModel, clients);

      break;
    }
    case 'peerconnections-created': {
      assert(validateExperimentStatus(experimentModel, 'peerconnections-created'));

      // await apiClient.unlockBooking(experimentModel.bookingID)
      // await apiClient.deleteBooking(experimentModel.bookingID)
      await deletePeerconnections(experimentModel, clients);
      await deleteInstances(experimentModel, clients);

      break;
    }
    case 'running': {
      assert(validateExperimentStatus(experimentModel, 'running'));

      // await apiClient.unlockBooking(experimentModel.bookingID)
      // await apiClient.deleteBooking(experimentModel.bookingID)
      await deletePeerconnections(experimentModel, clients);
      await deleteInstances(experimentModel, clients);

      break;
    }
    case 'finished': {
      break;
    }
  }

  experimentModel.status = 'finished';
  await repositories.experiment.save(experimentModel);
  logger.log('info', 'Successfully finished experiment', { data: { experimentUrl } });
}

async function deleteInstances(experiment: ExperimentModel, clients: Clients) {
  if (experiment.devices) {
    for (const device of experiment.devices) {
      if (device.instance?.url) {
        await clients.device.deleteDevice(device.instance.url);
      }
    }
  }
}

async function deletePeerconnections(experiment: ExperimentModel, clients: Clients) {
  if (experiment.connections) {
    for (const peerconnection of experiment.connections) {
      try {
        await clients.device.deletePeerconnection(peerconnection.url);
      } catch (error) {
        if (error instanceof Error && error.message.endsWith('404')) break;
        throw error;
      }
    }
  }
}
