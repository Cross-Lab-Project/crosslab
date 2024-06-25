import { logger } from '@crosslab/service-common';
import assert from 'assert';

import { UnsuccessfulRequestError as UnsuccessfulRequestErrorBooking } from '../../clients/booking/client.js';
import { UnsuccessfulRequestError as UnsuccessfulRequestErrorDevice } from '../../clients/device/client.js';
import { Clients } from '../../clients/index.js';
import { repositories } from '../../database/dataSource.js';
import { ExperimentModel } from '../../database/model.js';
import { validateExperimentStatus } from '../../types/typeguards.js';
import { sendStatusUpdateMessages } from '../statusUpdateMessage.js';
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

      await deleteBooking(experimentModel, clients);

      break;
    }
    case 'booking-locked': {
      assert(validateExperimentStatus(experimentModel, 'booking-locked'));

      await unlockBooking(experimentModel, clients);
      await deleteBooking(experimentModel, clients);

      break;
    }
    case 'devices-instantiated': {
      assert(validateExperimentStatus(experimentModel, 'devices-instantiated'));

      await unlockBooking(experimentModel, clients);
      await deleteBooking(experimentModel, clients);
      await deleteInstances(experimentModel, clients);

      break;
    }
    case 'booking-updated': {
      assert(validateExperimentStatus(experimentModel, 'booking-updated'));

      await unlockBooking(experimentModel, clients);
      await deleteBooking(experimentModel, clients);
      await deleteInstances(experimentModel, clients);

      break;
    }
    case 'peerconnections-created': {
      assert(validateExperimentStatus(experimentModel, 'peerconnections-created'));

      await unlockBooking(experimentModel, clients);
      await deleteBooking(experimentModel, clients);
      await deletePeerconnections(experimentModel, clients);
      await deleteInstances(experimentModel, clients);

      break;
    }
    case 'running': {
      assert(validateExperimentStatus(experimentModel, 'running'));

      await unlockBooking(experimentModel, clients);
      await deleteBooking(experimentModel, clients);
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
  sendStatusUpdateMessages(
    experimentModel,
    'The experiment has been finished successfully.',
  );
  logger.log('info', 'Successfully finished experiment', { data: { experimentUrl } });
}

async function deleteInstances(experiment: ExperimentModel, clients: Clients) {
  if (experiment.devices) {
    for (const device of experiment.devices) {
      if (device.instance?.url) {
        try {
          await clients.device.deleteDevice(device.instance.url);
        } catch (error) {
          if (
            error instanceof UnsuccessfulRequestErrorDevice &&
            error.response.status === 404
          )
            continue;
          throw error;
        }
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
        if (
          error instanceof UnsuccessfulRequestErrorDevice &&
          error.response.status === 404
        )
          continue;
        throw error;
      }
    }
  }
}

async function unlockBooking(experiment: ExperimentModel, clients: Clients) {
  if (experiment.bookingID) {
    try {
      await clients.booking.unlockBooking(experiment.bookingID);
    } catch (error) {
      if (
        error instanceof UnsuccessfulRequestErrorBooking &&
        error.response.status === 404
      )
        return;
      throw error;
    }
  }
}

async function deleteBooking(experiment: ExperimentModel, clients: Clients) {
  if (experiment.bookingID) {
    try {
      await clients.booking.deleteBooking(experiment.bookingID);
    } catch (error) {
      if (
        error instanceof UnsuccessfulRequestErrorBooking &&
        error.response.status === 404
      )
        return;
      throw error;
    }
  }
}
