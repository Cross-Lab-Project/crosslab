import { TestData } from '../../../../data/index.spec';
import { addTest } from '../../../index.spec';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('WebSocket-Handling Authentication');

    addTest(suite, 'should correctly authenticate a device', async function () {
        throw new Error('not implemented!');
    });

    addTest(
        suite,
        'should close the websocket connection if the message is not an authentication message',
        async function () {
            throw new Error('not implemented!');
        },
    );

    addTest(
        suite,
        'should close the websocket connection if the message does not contain a token',
        async function () {
            throw new Error('not implemented!');
        },
    );

    addTest(
        suite,
        'should close the websocket connection if no device is found for the provided token',
        async function () {
            throw new Error('not implemented!');
        },
    );

    return suite;
}
