import { TestData } from '../../../../data/index.spec';
import { addTest } from '../../../index.spec';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('WebSocket-Handling Close');

    addTest(
        suite,
        'should correctly handle the closing of the websocket connection',
        async function () {
            throw new Error('not implemented!');
        },
    );

    return suite;
}
