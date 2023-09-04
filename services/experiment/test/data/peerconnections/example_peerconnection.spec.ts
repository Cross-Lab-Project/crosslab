import { PeerconnectionEntityDataWithLinks } from './index.spec';

const url = 'https://api.localhost/peerconnections/bb1a7d76-2e5a-4fd7-8cbd-6d6af35bb3de';

export const example_peerconnection: PeerconnectionEntityDataWithLinks = {
    request: url,
    model: {
        url,
        experiment: 'example experiment',
    },
    response: url,
};
