import { config } from '../../src/config'
import { deviceUrlFromId, peerconnectionUrlFromId } from '../../src/methods/urlFromId'
import assert from 'assert'

export default () =>
    describe('urlFromId methods', function () {
        describe('deviceUrlFromId', function () {
            it('should correctly form the url of a device with a given id', function () {
                const id = 'c85c2654-5961-4377-9b07-cbf7cdcfaf79'
                const result = deviceUrlFromId(id)

                assert(result.startsWith(config.BASE_URL))
                assert(result.endsWith(`/devices/${id}`))
                assert(!result.endsWith(`//devices/${id}`))
            })
        })

        describe('peerconnectionUrlFromId', function () {
            it('should correctly form the url of a peerconnection with a given id', function () {
                const id = '122cbea2-9f92-4179-a962-bdcf17c17149'
                const result = peerconnectionUrlFromId(id)

                assert(result.startsWith(config.BASE_URL))
                assert(result.endsWith(`/peerconnections/${id}`))
                assert(!result.endsWith(`//peerconnections/${id}`))
            })
        })
    })
