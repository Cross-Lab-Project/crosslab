import { repositories } from '../database/dataSource.js';
import { peerconnectionIdFromUrl } from './urlFromId.js';

type IDorURL = { url: string } | { uuid: string };

function toUUID(idurl: IDorURL) {
  if ('url' in idurl) {
    return peerconnectionIdFromUrl(idurl.url);
  } else {
    return idurl.uuid;
  }
}

export async function getPeerconnection(id: IDorURL) {
  const peerconnection = await repositories.peerconnection.findOneOrFail({
    where: { uuid: toUUID(id) },
  });

  return peerconnection;
}
