import * as callbacks from './callbacks'
import * as operationsDevices from './devices'
import * as operationsPeerconnections from './peerconnections'

export default {
    ...operationsDevices,
    ...operationsPeerconnections,
    ...callbacks,
}
