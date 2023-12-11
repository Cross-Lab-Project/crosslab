import { logger } from '@crosslab/service-common';
//import { base64url } from 'jose';

//import * as clients from '../../clients/index.js';
//import { config } from '../../config.js';
import { repositories } from '../../database/dataSource.js';
import { getDevicesSignature } from '../../generated/signatures.js';
import { deviceUrlFromId } from '../../methods/urlFromId.js';

/**
 * This function implements the functionality for handling GET requests on
 * /devices endpoint.
 * @param authorization The authorization helper object for the request.
 */
export const getDevices: getDevicesSignature = async req => {
  logger.log('info', 'getDevices called');

  await req.authorization.check_authorization_or_fail('view', 'device');

  const deviceModels = await repositories.device.find();

  // Federated Device Discovery did not work - should fail gracefully when federation service is not available?
  /*const institutions = await clients.federation.listInstitutions();

  const federatedDevices = (
    await Promise.all(
      institutions.flatMap(async institution => {
        try {
          return await clients.device.listDevices({ url: institution.api });
        } catch (error) {
          logger.log(
            'error',
            `Could not fetch federated devices from institution "${institution.name}"`,
            { data: { error } },
          );
        }

        return [];
      }),
    )
  )
    .flat()
    .map(device => {
      return {
        ...device,
        url:
          config.BASE_URL + config.BASE_URL.endsWith('/')
            ? ''
            : '/' + 'devices/federated-' + base64url.encode(device.url),
      };
    });*/

  logger.log('info', 'getDevices succeeded');

  const visibility = await Promise.all(
    deviceModels.map(device =>
      req.authorization.check_authorization(
        'view',
        `device:${deviceUrlFromId(device.uuid)}`,
      ),
    ),
  );

  const visibleDevices = deviceModels.filter((_value, index) => visibility[index].result);

  return {
    status: 200,
    body: [
      ...(await Promise.all(visibleDevices.map(repositories.deviceOverview.format))),
      //...federatedDevices,
    ],
  };
};
