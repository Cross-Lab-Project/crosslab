import { MissingPropertyError } from '@crosslab/service-common';
import { logger } from '@crosslab/service-common';

import { ExperimentModel } from '../../database/model.js';
import { saveExperiment } from '../experimentChangedEvent.js';
// import { apiClient } from '../api.js'
import { experimentUrlFromId } from '../url.js';

/**
 * This function attempts to book an experiment.
 * @param experimentModel The experiment to be booked.
 */
export async function bookExperiment(experimentModel: ExperimentModel) {
  const experimentUrl = experimentUrlFromId(experimentModel.uuid);
  logger.log('info', 'Attempting to book experiment', { data: { experimentUrl } });

  if (!experimentModel.devices || experimentModel.devices.length === 0)
    throw new MissingPropertyError(`Experiment ${experimentUrl} has no devices`, 400);

  // const currentTime = new Date()
  // const startTime = new Date(experimentModel.bookingStart ?? currentTime)
  // const endTime = new Date(
  //     experimentModel.bookingEnd ?? startTime.getTime() + 60 * 60 * 1000
  // )

  // // TODO: error handling
  // const { BookingID } = await apiClient.bookExperiment({
  //     Experiment: {
  //         Devices: experimentModel.devices.map((device) => {
  //             return { ID: device.url }
  //         }),
  //     },
  //     Time: {
  //         Start: startTime.toISOString(),
  //         End: endTime.toISOString(),
  //     },
  //     Type: 'normal',
  // })

  // experimentModel.bookingStart = startTime.toISOString()
  // experimentModel.bookingEnd = endTime.toISOString()
  // experimentModel.bookingID = BookingID

  experimentModel.status = 'booked';
  await saveExperiment(experimentModel);
  logger.log('info', 'Successfully booked experiment', { data: { experimentUrl } });
}
