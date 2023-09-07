import { TestData } from '../../../../data/index.spec.js.ts";
import { addTest } from '../../../index.spec.js.ts";
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('WebSocket-Handling Heartbeat');

    addTest(suite, 'should correctly initiate a heartbeat', async function () {
        throw new Error('not implemented!');
    });

    addTest(
        suite,
        'should correctly handle an unresponsive websocket connection',
        async function () {
            throw new Error('not implemented!');
        },
    );

    return suite;
}
