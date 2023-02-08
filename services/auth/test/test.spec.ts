import methodsSuite from './methods/index.spec'
import databaseSuite from './database/index.spec'
import configSpec from './config.spec'
import operationsSuite from './operations/index.spec'
import generatedSuite from './generated/index.spec'

describe('Authentication Service Tests', function () {
    this.beforeAll(function () {
        console.log = () => undefined
        console.warn = () => undefined
        console.error = () => undefined
    })

    generatedSuite()
    databaseSuite()
    methodsSuite()
    operationsSuite()
    configSpec()
})
