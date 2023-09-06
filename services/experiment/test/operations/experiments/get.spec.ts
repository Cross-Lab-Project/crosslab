import { getExperiments } from '../../../src/operations/experiments';
import { experimentNames } from '../../data/experiments/index.spec';
import { TestData } from '../../data/index.spec';
import { experimentRepositoryTestSuite } from '../../database/repositories/experiment.spec';
import { addTest, stubbedAuthorization } from '../index.spec';
import assert from 'assert';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /experiments', context);

    addTest(suite, 'should get all experiments', async function () {
        const result = await getExperiments(stubbedAuthorization);
        assert(result.status === 200);

        for (const experimentName of experimentNames) {
            const searchedExperiment = testData.experiments[experimentName];
            assert(
                result.body.find(
                    (experiment) =>
                        experimentRepositoryTestSuite.validateFormatOverview(
                            searchedExperiment.model,
                            experiment,
                        ) &&
                        experimentRepositoryTestSuite.compareFormattedOverview(
                            experiment,
                            searchedExperiment.response,
                        ),
                ),
            );
        }
    });

    return suite;
}
