import { app } from '../../../src/generated'
import { callbackHandling } from '../../../src/operations/callbacks'
import * as eventCallbackHandling from '../../../src/operations/callbacks/event'
import { TestData } from '../../data/index.spec'
import { addTest } from '../index.spec'
import { eventCallbackTest } from './event/index.spec'
import {
    InvalidValueError,
    MalformedBodyError,
    errorHandler,
} from '@crosslab/service-common'
import assert from 'assert'
import express from 'express'
import Mocha from 'mocha'
import * as sinon from 'sinon'
import supertest from 'supertest'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('callback handling', context)

    suite.beforeAll(function () {
        app.initService({
            security: {
                JWT: () => {
                    return {
                        url: 'https://localhost/users/test',
                        username: 'test',
                        scopes: [],
                    }
                },
            },
            preHandlers: [
                (application: express.Application) => {
                    application.use((req, _res, next) => {
                        if ('content' in req.body) {
                            req.body = req.body.content
                        }
                        next()
                    })
                },
            ],
            postHandlers: [callbackHandling],
            errorHandler: errorHandler,
        })
    })

    addTest(
        suite,
        'should return a MalformedBodyError if body of callback is not an object',
        async function () {
            const res = await supertest(app)
                .post('/callbacks/device')
                .send({ content: 'test' })

            assert.strictEqual(res.status, 400)
            assert.strictEqual(res.body.error, MalformedBodyError.name)
            assert.strictEqual(res.body.message, 'Body of callback is not an object')
        }
    )

    addTest(
        suite,
        'should return a MalformedBodyError if body of callback is null',
        async function () {
            const res = await supertest(app)
                .post('/callbacks/device')
                .send({ content: null })

            assert.strictEqual(res.status, 400)
            assert.strictEqual(res.body.error, MalformedBodyError.name)
            assert.strictEqual(res.body.message, 'Body of callback is null')
        }
    )

    addTest(
        suite,
        "should return a MalformedBodyError if body of callback does not have property 'callbackType'",
        async function () {
            const res = await supertest(app).post('/callbacks/device').send({})

            assert.strictEqual(res.status, 400)
            assert.strictEqual(res.body.error, MalformedBodyError.name)
            assert.strictEqual(
                res.body.message,
                "Callbacks require property 'callbackType'"
            )
        }
    )

    addTest(
        suite,
        "should return a MalformedBodyError if property 'callbackType' in body of callback is not a string",
        async function () {
            const res = await supertest(app)
                .post('/callbacks/device')
                .send({ callbackType: 1 })

            assert.strictEqual(res.status, 400)
            assert.strictEqual(res.body.error, MalformedBodyError.name)
            assert.strictEqual(
                res.body.message,
                "Property 'callbackType' needs to be of type string"
            )
        }
    )

    addTest(
        suite,
        "should return a InvalidValueError if value of 'callbackType' in body of callback is not supported",
        async function () {
            const res = await supertest(app)
                .post('/callbacks/device')
                .send({ callbackType: 'unsupported' })

            assert.strictEqual(res.status, 400)
            assert.strictEqual(res.body.error, InvalidValueError.name)
            assert.strictEqual(
                res.body.message,
                `Callbacks of type 'unsupported' are not supported`
            )
        }
    )

    addTest(
        suite,
        "should call correct function for callback of type 'event'",
        async function () {
            const handleEventCallbackStub = sinon.stub(
                eventCallbackHandling,
                'handleEventCallback'
            )
            handleEventCallbackStub.resolves(200)

            try {
                const res = await supertest(app)
                    .post('/callbacks/device')
                    .send({ callbackType: 'event' })

                assert.strictEqual(res.status, 200)
                assert(handleEventCallbackStub.calledOnce)

                handleEventCallbackStub.restore()
            } catch (error) {
                handleEventCallbackStub.restore()
                throw error
            }
        }
    )

    suite.addSuite(eventCallbackTest(suite.ctx, testData))

    return suite
}
