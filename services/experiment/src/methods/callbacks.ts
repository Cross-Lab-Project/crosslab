import { logger } from '@crosslab/service-common';
import fetch from 'node-fetch';

import { config } from '../config.js';
import { repositories } from '../database/dataSource.js';
import { ExperimentModel } from '../database/model.js';
import { ExperimentChangedEventCallback } from '../generated/types.js';
import { experimentUrlFromId } from './url.js';

export const callbackUrl: string = (config.BASE_URL + '/callbacks/experiment').replace(
  '//callbacks',
  '/callbacks',
);
export const changedCallbacks = new Map<string, string[] | undefined>();

/**
 * This function sends an 'experiment-changed' callback.
 * @param experiment The experiment for which to send the callback.
 */
export async function sendChangedCallback(experiment: ExperimentModel) {
  const urls = changedCallbacks.get(experiment.uuid) ?? [];
  for (const url of urls) {
    try {
      logger.log(
        'info',
        `Sending changed-callback for experiment '${experimentUrlFromId(
          experiment.uuid,
        )}' to '${url}'`,
      );

      const callback: ExperimentChangedEventCallback = {
        callbackType: 'event',
        eventType: 'experiment-changed',
        experiment: await repositories.experiment.format(experiment),
      };
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(callback),
        headers: [['Content-Type', 'application/json']],
      });

      if (res.status === 410) {
        const changedCallbackURLs = changedCallbacks.get(experiment.uuid);
        changedCallbacks.set(
          experiment.uuid,
          changedCallbackURLs?.filter(cbUrl => cbUrl != url),
        );
      }
    } catch (error) {
      logger.log('error', 'An error occurred while sending a changed-callback', {
        data: { error, experiment: experimentUrlFromId(experiment.uuid), url },
      });
    }
  }
}
