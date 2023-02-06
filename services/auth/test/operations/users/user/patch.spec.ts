import { fail } from 'assert'
import Mocha from 'mocha'
import { TestData } from '../../../data/index.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('PATCH /users/{username}', context)

    suite.addTest(
        new Mocha.Test(
            'should successfully patch the user',
            async function () {
                fail()
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should fail when user tries to add a role with higher privileges than his own',
            async function () {
                fail()
            }
        )
    )

    return suite
}
