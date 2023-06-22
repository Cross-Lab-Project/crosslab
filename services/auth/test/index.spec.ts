import { config, dataSourceConfig } from '../src/config'
import { AppDataSource, repositories } from '../src/database/dataSource'
import {
    ScopeModel,
    RoleModel,
    UserModel,
    KeyModel,
    ActiveKeyModel,
    TokenModel,
} from '../src/database/model'
import { app } from '../src/generated'
import { logger } from '@crosslab/service-common'
import assert from 'assert'
import rewire from 'rewire'
import * as sinon from 'sinon'
import request from 'supertest'

describe('Index', function () {
    let appListenStub: sinon.SinonStub
    let clock: sinon.SinonFakeTimers
    let startAuthenticationService: any

    this.beforeAll(async function () {
        this.timeout(60000)
        logger.transports.forEach((transport) => (transport.silent = true))
        appListenStub = sinon.stub(app, 'listen')
        clock = sinon.useFakeTimers()
        const indexModule = rewire('../src/index.ts')
        startAuthenticationService = indexModule.__get__('startAuthenticationService')
        await startAuthenticationService(config, {
            ...dataSourceConfig,
            database: './test/db/index_test.db',
            dropSchema: true,
        })
        assert(appListenStub.called)
    })

    this.afterAll(async function () {
        await AppDataSource.teardown()
        appListenStub.restore()
        clock.restore()
    })

    it('should have at least one active key', async function () {
        const activeKeyModels = await repositories.activeKey.find()
        assert(activeKeyModels.length > 0)

        await AppDataSource.teardown()

        await startAuthenticationService(config, {
            type: 'sqlite',
            database: './test/db/index_test.db',
            synchronize: true,
            entities: [
                ScopeModel,
                RoleModel,
                UserModel,
                KeyModel,
                ActiveKeyModel,
                TokenModel,
            ],
        })
        assert(activeKeyModels.length > 0)
    })

    it('should create the route "/.well-known/jwks.json" correctly', function (done) {
        request(app)
            .get('/.well-known/jwks.json')
            .end((_error, res) => {
                assert.strictEqual(res.status, 200)
                assert(res.body)
                done()
            })
    })

    it('should create the route "/.well-known/openid-configuration" correctly', function (done) {
        request(app)
            .get('/.well-known/openid-configuration')
            .end((_error, res) => {
                assert.strictEqual(res.status, 200)
                assert.strictEqual(res.body.jwks_uri, '/.well-known/jwks.json')
                done()
            })
    })
})
