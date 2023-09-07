import { AppDataSource, repositories } from '../../../src/database/dataSource.js';
import { Migrations } from '../../../src/database/migrations.js';
import { Entities } from '../../../src/database/model.js';
import { deviceNames } from '../../data/devices/index.spec.js';
import { experimentNames } from '../../data/experiments/index.spec.js';
import { TestData, prepareTestData } from '../../data/index.spec.js';
import { instanceNames } from '../../data/instances/index.spec.js';
import { participantNames } from '../../data/participants/index.spec.js';
import { peerconnectionNames } from '../../data/peerconnections/index.spec.js';
import { roleNames } from '../../data/roles/index.spec.js';
import { serviceConfigurationNames } from '../../data/serviceConfigurations/index.spec.js';
import { templateNames } from '../../data/templates/index.spec.js';
import { deviceRepositoryTestSuite } from './device.spec.js';
import { experimentRepositoryTestSuite } from './experiment.spec.js';
import { instanceRepositoryTestSuite } from './instance.spec.js';
import { participantRepositoryTestSuite } from './participant.spec.js';
import { peerconnectionRepositoryTestSuite } from './peerconnection.spec.js';
import { roleRepositoryTestSuite } from './role.spec.js';
import { serviceConfigurationRepositoryTestSuite } from './serviceConfiguration.spec.js';
import { templateRepositoryTestSuite } from './template.spec.js';
import { DataSourceOptions } from 'typeorm';

const repositoryTestSuites = [
    deviceRepositoryTestSuite,
    experimentRepositoryTestSuite,
    instanceRepositoryTestSuite,
    participantRepositoryTestSuite,
    peerconnectionRepositoryTestSuite,
    roleRepositoryTestSuite,
    serviceConfigurationRepositoryTestSuite,
    templateRepositoryTestSuite,
];

export default () =>
    describe('Repositories', function () {
        it(
            'should setup the repository tests',
            (function (suite: Mocha.Suite) {
                return async function () {
                    this.timeout(0);

                    for (const repositoryTestSuite of repositoryTestSuites) {
                        await repositoryTestSuite.initialize();
                        suite.addSuite(repositoryTestSuite.execute());
                    }
                };
            })(this),
        );
    });

export async function initTestDatabase(): Promise<TestData> {
    const dataSourceConfig: DataSourceOptions = {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: Entities,
        // synchronize: true,
        migrations: Migrations('sqlite'),
        migrationsRun: true,
    };

    const testData = prepareTestData();
    await AppDataSource.initialize(dataSourceConfig);

    for (const templateName of templateNames) {
        await repositories.template.save(testData.templates[templateName].model);
    }

    for (const instanceName of instanceNames) {
        await repositories.instance.save(testData.instances[instanceName].model);
    }

    for (const experimentName of experimentNames) {
        await repositories.experiment.save(testData.experiments[experimentName].model);
    }

    for (const roleName of roleNames) {
        await repositories.role.save(testData.roles[roleName].model);
    }

    for (const deviceName of deviceNames) {
        await repositories.device.save(testData.devices[deviceName].model);
    }

    for (const serviceConfigurationName of serviceConfigurationNames) {
        await repositories.serviceConfiguration.save(
            testData.serviceConfigurations[serviceConfigurationName].model,
        );
    }

    for (const participantName of participantNames) {
        await repositories.participant.save(testData.participants[participantName].model);
    }

    for (const peerconnectionName of peerconnectionNames) {
        await repositories.peerconnection.save(
            testData.peerconnections[peerconnectionName].model,
        );
    }

    return testData;
}
