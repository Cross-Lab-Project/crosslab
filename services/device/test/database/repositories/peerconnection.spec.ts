import { AppDataSource } from '../../../src/database/dataSource'
import { PeerconnectionModel } from '../../../src/database/model'
import {
    peerconnectionRepository,
    PeerconnectionRepository,
} from '../../../src/database/repositories/peerconnection'
import { Peerconnection } from '../../../src/generated/types'
import { PeerconnectionName } from '../../data/peerconnections/index.spec'
import { initTestDatabase } from './index.spec'
import { AbstractRepositoryTestSuite } from '@crosslab/service-common'
import { FindOptionsWhere } from 'typeorm'

class PeerconnectionRepositoryTestSuite extends AbstractRepositoryTestSuite<
    PeerconnectionName,
    PeerconnectionRepository
> {
    protected name = 'peerconnections' as const
    protected repository = peerconnectionRepository
    protected getEntityData = async () => (await initTestDatabase()).peerconnections
    protected RepositoryClass = PeerconnectionRepository

    constructor() {
        super(AppDataSource)
    }

    validateCreate(
        model: PeerconnectionModel,
        data?: Peerconnection<'request'>
    ): boolean {
        throw new Error('Method not implemented.')
    }

    validateWrite(model: PeerconnectionModel, data: Peerconnection<'request'>): boolean {
        throw new Error('Method not implemented.')
    }

    validateFormat(
        model: PeerconnectionModel,
        data: Peerconnection<'response'>
    ): boolean {
        throw new Error('Method not implemented.')
    }

    compareModels(
        firstModel: PeerconnectionModel,
        secondModel: PeerconnectionModel,
        complete?: boolean
    ): boolean {
        throw new Error('Method not implemented.')
    }

    compareFormatted(
        first: Peerconnection<'response'>,
        second: Peerconnection<'response'>
    ): boolean {
        throw new Error('Method not implemented.')
    }

    getFindOptionsWhere(
        model?: PeerconnectionModel
    ): FindOptionsWhere<PeerconnectionModel> {
        throw new Error('Method not implemented.')
    }
}

export const peerconnectionRepositoryTestSuite = new PeerconnectionRepositoryTestSuite()
