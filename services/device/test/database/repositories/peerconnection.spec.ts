import { AppDataSource, repositories } from '../../../src/database/dataSource.js.ts";
import { PeerconnectionModel } from '../../../src/database/model.js.ts";
import { PeerconnectionRepository } from '../../../src/database/repositories/peerconnection.js.ts";
import { Peerconnection } from '../../../src/generated/types.js.ts";
import { peerconnectionUrlFromId } from '../../../src/methods/urlFromId.js.ts";
import { PeerconnectionName } from '../../data/peerconnections/index.spec.js.ts";
import { initTestDatabase } from './index.spec.js';
import { AbstractRepositoryTestSuite } from '@crosslab/service-common/test-helper';
import assert from 'assert';
import { FindOptionsWhere } from 'typeorm';

class PeerconnectionRepositoryTestSuite extends AbstractRepositoryTestSuite<
    PeerconnectionName,
    PeerconnectionRepository
> {
    protected name = 'peerconnections' as const;
    protected repository = repositories.peerconnection;
    protected getEntityData = async () => (await initTestDatabase()).peerconnections;
    protected RepositoryClass = PeerconnectionRepository;

    constructor() {
        super(AppDataSource);
    }

    validateCreate(
        model: PeerconnectionModel,
        data?: Peerconnection<'request'>,
    ): boolean {
        if (!data) return true;

        assert(this.validateWrite(model, data));

        return true;
    }

    validateWrite(model: PeerconnectionModel, data: Peerconnection<'request'>): boolean {
        if (data.devices) {
            assert(
                JSON.stringify(model.deviceA) ===
                    JSON.stringify({ ...data.devices[0], status: 'new' }),
            );
            assert(
                JSON.stringify(model.deviceB) ===
                    JSON.stringify({ ...data.devices[1], status: 'new' }),
            );
        }
        if (data.type) assert(model.type === data.type);

        return true;
    }

    validateFormat(
        model: PeerconnectionModel,
        data: Peerconnection<'response'>,
    ): boolean {
        assert(
            JSON.stringify(data.devices) ===
                JSON.stringify([model.deviceA, model.deviceB]),
        );
        assert(data.status === model.status);
        assert(data.type === model.type);
        assert(data.url === peerconnectionUrlFromId(model.uuid));

        return true;
    }

    compareModels(
        firstModel: PeerconnectionModel,
        secondModel: PeerconnectionModel,
        complete?: boolean,
    ): boolean {
        const sameId = firstModel.uuid === secondModel.uuid;

        if (!complete) return sameId;

        assert(firstModel.deletedAt === secondModel.deletedAt);
        assert(
            JSON.stringify(firstModel.deviceA) === JSON.stringify(secondModel.deviceA),
        );
        assert(
            JSON.stringify(firstModel.deviceB) === JSON.stringify(secondModel.deviceB),
        );
        assert(firstModel.status === secondModel.status);
        assert(firstModel.type === secondModel.type);

        return true;
    }

    compareFormatted(
        first: Peerconnection<'response'>,
        second: Peerconnection<'response'>,
    ): boolean {
        let isEqual = true;

        isEqual &&= JSON.stringify(first.devices) === JSON.stringify(second.devices);
        isEqual &&= first.status === second.status;
        isEqual &&= first.type === second.type;
        isEqual &&= first.url === second.url;

        return isEqual;
    }

    getFindOptionsWhere(
        model?: PeerconnectionModel,
    ): FindOptionsWhere<PeerconnectionModel> {
        return {
            uuid: model ? model.uuid : 'non-existent',
        };
    }
}

export const peerconnectionRepositoryTestSuite = new PeerconnectionRepositoryTestSuite();
