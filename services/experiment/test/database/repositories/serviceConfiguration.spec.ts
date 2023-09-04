import { AppDataSource, repositories } from '../../../src/database/dataSource';
import { ServiceConfigurationModel } from '../../../src/database/model';
import { ServiceConfigurationRepository } from '../../../src/database/repositories/serviceConfiguration';
import { ServiceConfiguration } from '../../../src/generated/types';
import { ServiceConfigurationName } from '../../data/serviceConfigurations/index.spec';
import { experimentRepositoryTestSuite } from './experiment.spec';
import { initTestDatabase } from './index.spec';
import { participantRepositoryTestSuite } from './participant.spec';
import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

class ServiceConfigurationRepositoryTestSuite extends AbstractRepositoryTestSuite<
    ServiceConfigurationName,
    ServiceConfigurationRepository
> {
    protected name = 'serviceConfigurations' as const;
    protected repository = repositories.serviceConfiguration;
    protected getEntityData = async () =>
        (await initTestDatabase())['serviceConfigurations'];
    protected RepositoryClass = ServiceConfigurationRepository;

    constructor() {
        super(AppDataSource);
    }

    validateCreate(
        model: ServiceConfigurationModel,
        data?: ServiceConfiguration<'request'>,
    ): boolean {
        if (!data) return true;

        assert(this.validateWrite(model, data));

        return true;
    }

    validateWrite(
        model: ServiceConfigurationModel,
        data: Partial<ServiceConfiguration<'request'>>,
    ): boolean {
        if (data.configuration)
            assert.strictEqual(
                JSON.stringify(model.configuration),
                JSON.stringify(data.configuration),
            );

        if (data.participants) {
            assert.strictEqual(model.participants?.length, data.participants.length);
            for (let i = 0; i < data.participants.length; i++) {
                assert(
                    participantRepositoryTestSuite.validateWrite(
                        model.participants[i],
                        data.participants[i],
                    ),
                );
            }
        }

        if (data.serviceType) assert(model.serviceType === data.serviceType);

        return true;
    }

    validateFormat(
        model: ServiceConfigurationModel,
        data: ServiceConfiguration<'response'>,
    ): boolean {
        assert.strictEqual(
            JSON.stringify(data.configuration),
            JSON.stringify(model.configuration ?? undefined),
        );

        if (data.participants || model.participants) {
            assert(data.participants && model.participants);
            assert.strictEqual(data.participants.length, model.participants.length);
            for (let i = 0; i < data.participants.length; i++) {
                participantRepositoryTestSuite.validateFormat(
                    model.participants[i],
                    data.participants[i],
                );
            }
        } else {
            assert.strictEqual(data.participants, model.participants);
        }

        assert.strictEqual(data.serviceType, model.serviceType);

        return true;
    }

    compareModels(
        firstModel: ServiceConfigurationModel,
        secondModel: ServiceConfigurationModel,
        complete?: boolean,
    ): boolean {
        if (!complete) return firstModel.uuid === secondModel.uuid;

        assert.strictEqual(
            JSON.stringify(firstModel.configuration),
            JSON.stringify(secondModel.configuration),
        );

        assert(
            experimentRepositoryTestSuite.compareModels(
                firstModel.experiment,
                secondModel.experiment,
            ),
        );

        if (firstModel.participants || secondModel.participants) {
            assert(firstModel.participants && secondModel.participants);
            assert.strictEqual(
                firstModel.participants.length,
                secondModel.participants.length,
            );
            for (let i = 0; i < firstModel.participants.length; i++) {
                participantRepositoryTestSuite.compareModels(
                    firstModel.participants[i],
                    secondModel.participants[i],
                );
            }
        } else {
            assert.strictEqual(firstModel.participants, secondModel.participants);
        }

        assert.strictEqual(firstModel.serviceType, secondModel.serviceType);

        assert.strictEqual(firstModel.uuid, secondModel.uuid);

        return true;
    }

    compareFormatted(
        first: ServiceConfiguration<'response'>,
        second: ServiceConfiguration<'response'>,
    ): boolean {
        assert.strictEqual(
            JSON.stringify(first.configuration),
            JSON.stringify(second.configuration),
        );

        if (first.participants || second.participants) {
            assert(first.participants && second.participants);
            assert.strictEqual(first.participants.length, second.participants.length);
            for (let i = 0; i < first.participants.length; i++) {
                assert(
                    participantRepositoryTestSuite.compareFormatted(
                        first.participants[i],
                        second.participants[i],
                    ),
                );
            }
        } else {
            assert.strictEqual(first.participants, second.participants);
        }

        assert.strictEqual(first.serviceType, second.serviceType);

        return true;
    }

    getFindOptionsWhere(
        model?: ServiceConfigurationModel,
    ): FindOptionsWhere<ServiceConfigurationModel> {
        return {
            uuid: model ? model.uuid : 'non-existent',
        };
    }
}

export const serviceConfigurationRepositoryTestSuite =
    new ServiceConfigurationRepositoryTestSuite();
