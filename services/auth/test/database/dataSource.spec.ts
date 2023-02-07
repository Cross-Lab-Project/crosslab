import assert, { fail } from 'assert'
import {
    AppDataSource,
    ApplicationDataSource,
    initializeDataSource,
} from '../../src/database/dataSource'
import {
    ActiveKeyModel,
    KeyModel,
    RoleModel,
    ScopeModel,
    TokenModel,
    UserModel,
} from '../../src/database/model'

export default () =>
    describe('Data Source Tests', async function () {
        describe('initializeDataSource', async function () {
            this.beforeEach(async function () {
                if (AppDataSource.connected) await AppDataSource.teardown()

                await AppDataSource.initialize({
                    type: 'sqlite',
                    database: ':memory:',
                    synchronize: true,
                    dropSchema: true,
                    entities: [
                        ScopeModel,
                        RoleModel,
                        UserModel,
                        KeyModel,
                        ActiveKeyModel,
                        TokenModel,
                    ],
                })
            })

            it('should initialize the data source successfully', async function () {
                await initializeDataSource()

                fail('currently the scopes are not set role specific')
            })

            it('should teardown the data source correctly', async function () {
                await AppDataSource.teardown()

                fail('needs to be tested further')
            })

            it('should throw an error on getRepository() if the data source has not been initialized', async function () {
                const testAppDataSource = new ApplicationDataSource()
                assert.throws(
                    () => testAppDataSource.getRepository(ActiveKeyModel),
                    (error) => {
                        assert(error instanceof Error)
                        return true
                    }
                )
            })

            it('should throw an error on teardown() if the data source has not been initialized', async function () {
                const testAppDataSource = new ApplicationDataSource()
                await assert.rejects(
                    async () => await testAppDataSource.teardown(),
                    (error) => {
                        assert(error instanceof Error)
                        return true
                    }
                )
            })

            it('should update the data source correctly', async function () {
                await initializeDataSource()
                await initializeDataSource()

                fail('needs to be tested further')
            })
        })
    })
