import { TestData } from '../../../../data/index.spec'
import Mocha from 'mocha'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite(
        'PATCH /peerconnections/{peerconnection_id}/device_status',
        context
    )

    return suite
}
