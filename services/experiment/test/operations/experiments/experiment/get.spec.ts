import { getExperimentsByExperimentId } from '../../../../src/operations/experiments';
import { experimentNames } from '../../../data/experiments/index.spec';
import { TestData } from '../../../data/index.spec';
import { experimentRepositoryTestSuite } from '../../../database/repositories/experiment.spec';
import { addTest, stubbedAuthorization } from '../../index.spec';
import assert from 'assert';
import Mocha from 'mocha';

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /experiments/{experiment_id}', context);

    addTest(suite, 'should return the formatted experiment', async function () {
        for (const experimentName of experimentNames) {
            const experiment = testData.experiments[experimentName];
            const result = await getExperimentsByExperimentId(stubbedAuthorization, {
                experiment_id: experiment.model.uuid,
            });

            assert(result.status === 200);
            assert(
                experimentRepositoryTestSuite.validateFormat(
                    experiment.model,
                    result.body,
                ),
            );
            assert(
                experimentRepositoryTestSuite.compareFormatted(
                    experiment.response,
                    result.body,
                ),
            );
        }
    });

    return suite;
}
