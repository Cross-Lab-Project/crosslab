import { TestData } from '../../../data/index.spec'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('DELETE /peerconnections/{peerconnection_id}', context)

    return suite
}