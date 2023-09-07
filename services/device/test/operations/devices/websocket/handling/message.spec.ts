import { TestData } from '../../../../data/index.spec.js.ts";
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('WebSocket-Handling Message');

    return suite;
}
