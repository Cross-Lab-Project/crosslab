/**
 * This file was automatically generated by openapi-codegeneration.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source OpenAPI file,
 * and run openapi-codegeneration to regenerate this file.
 */
import {
    validateGetExperimentsInput,
    validateGetExperimentsOutput,
    validatePostExperimentsInput,
    validatePostExperimentsOutput,
    validateGetExperimentsByExperimentIdInput,
    validateGetExperimentsByExperimentIdOutput,
    validatePatchExperimentsByExperimentIdInput,
    validatePatchExperimentsByExperimentIdOutput,
    validateDeleteExperimentsByExperimentIdInput,
    validateDeleteExperimentsByExperimentIdOutput,
} from './generated/requestValidation'
import {
    postExperimentsRequestBodyType,
    getExperimentsByExperimentIdParametersType,
    patchExperimentsByExperimentIdParametersType,
    patchExperimentsByExperimentIdRequestBodyType,
    deleteExperimentsByExperimentIdParametersType,
} from './generated/signatures'
import { ValidationError } from './generated/types'
import operations from './operations'
import express from 'express'

export const router = express.Router()

router.get('/experiments', async (_req, res, next) => {
    const userData = {
        JWT: {
            url: 'deprecated',
            username: 'user:anonymous',
            scopes: [],
            jwt: 'deprecated',
        },
    }

    try {
        if (!validateGetExperimentsInput()) {
            throw new ValidationError(
                'Request validation failed',
                (validateGetExperimentsInput as unknown as { errors: object }).errors,
                400
            )
        }

        const result = await operations.getExperiments(userData)

        if (!validateGetExperimentsOutput(result)) {
            throw new ValidationError(
                'Response validation failed',
                (validateGetExperimentsOutput as unknown as { errors: object }).errors,
                500
            )
        }

        for (const headerName in result.headers) {
            const header = result.headers[headerName]
            if (header) {
                res.setHeader(headerName, header)
            }
        }

        return res.status(result.status).send(result.body)
    } catch (error) {
        next(error)
        return
    }
})

router.post('/experiments', async (req, res, next) => {
    const userData = {
        JWT: {
            url: 'deprecated',
            username: 'user:anonymous',
            scopes: [],
            jwt: 'deprecated',
        },
    }

    const body: postExperimentsRequestBodyType = req.body

    try {
        if (!validatePostExperimentsInput(body)) {
            throw new ValidationError(
                'Request validation failed',
                (validatePostExperimentsInput as unknown as { errors: object }).errors,
                400
            )
        }

        const result = await operations.postExperiments(body, userData)

        if (!validatePostExperimentsOutput(result)) {
            throw new ValidationError(
                'Response validation failed',
                (validatePostExperimentsOutput as unknown as { errors: object }).errors,
                500
            )
        }

        for (const headerName in result.headers) {
            const header = result.headers[headerName]
            if (header) {
                res.setHeader(headerName, header)
            }
        }

        return res.status(result.status).send(result.body)
    } catch (error) {
        next(error)
        return
    }
})

router.get('/experiments/:experiment_id', async (req, res, next) => {
    const userData = {
        JWT: {
            url: 'deprecated',
            username: 'user:anonymous',
            scopes: [],
            jwt: 'deprecated',
        },
    }
    const parameters: getExperimentsByExperimentIdParametersType = {
        experiment_id: req.params['experiment_id'],
    }

    try {
        if (!validateGetExperimentsByExperimentIdInput(parameters)) {
            throw new ValidationError(
                'Request validation failed',
                (
                    validateGetExperimentsByExperimentIdInput as unknown as {
                        errors: object
                    }
                ).errors,
                400
            )
        }

        const result = await operations.getExperimentsByExperimentId(parameters, userData)

        if (!validateGetExperimentsByExperimentIdOutput(result)) {
            throw new ValidationError(
                'Response validation failed',
                (
                    validateGetExperimentsByExperimentIdOutput as unknown as {
                        errors: object
                    }
                ).errors,
                500
            )
        }

        for (const headerName in result.headers) {
            const header = result.headers[headerName]
            if (header) {
                res.setHeader(headerName, header)
            }
        }

        return res.status(result.status).send(result.body)
    } catch (error) {
        next(error)
        return
    }
})

router.patch('/experiments/:experiment_id', async (req, res, next) => {
    const userData = {
        JWT: {
            url: 'deprecated',
            username: 'user:anonymous',
            scopes: [],
            jwt: 'deprecated',
        },
    }

    if (!userData) {
        next(new Error('Request could not be authenticated'))
        return
    }

    const parameters: patchExperimentsByExperimentIdParametersType = {
        experiment_id: req.params['experiment_id'],
        changedURL: req.query['changedURL'] as string,
    }

    const body: patchExperimentsByExperimentIdRequestBodyType = req.body

    try {
        if (!validatePatchExperimentsByExperimentIdInput(parameters, body)) {
            throw new ValidationError(
                'Request validation failed',
                (
                    validatePatchExperimentsByExperimentIdInput as unknown as {
                        errors: object
                    }
                ).errors,
                400
            )
        }

        const result = await operations.patchExperimentsByExperimentId(
            parameters,
            body,
            userData
        )

        if (!validatePatchExperimentsByExperimentIdOutput(result)) {
            throw new ValidationError(
                'Response validation failed',
                (
                    validatePatchExperimentsByExperimentIdOutput as unknown as {
                        errors: object
                    }
                ).errors,
                500
            )
        }

        for (const headerName in result.headers) {
            const header = result.headers[headerName]
            if (header) {
                res.setHeader(headerName, header)
            }
        }

        return res.status(result.status).send(result.body)
    } catch (error) {
        next(error)
        return
    }
})

router.delete('/experiments/:experiment_id', async (req, res, next) => {
    const userData = {
        JWT: {
            url: 'deprecated',
            username: 'user:anonymous',
            scopes: [],
            jwt: 'deprecated',
        },
    }
    if (!userData) {
        next(new Error('Request could not be authenticated'))
        return
    }

    const parameters: deleteExperimentsByExperimentIdParametersType = {
        experiment_id: req.params['experiment_id'],
    }

    try {
        if (!validateDeleteExperimentsByExperimentIdInput(parameters)) {
            throw new ValidationError(
                'Request validation failed',
                (
                    validateDeleteExperimentsByExperimentIdInput as unknown as {
                        errors: object
                    }
                ).errors,
                400
            )
        }

        const result = await operations.deleteExperimentsByExperimentId(
            parameters,
            userData
        )

        if (!validateDeleteExperimentsByExperimentIdOutput(result)) {
            throw new ValidationError(
                'Response validation failed',
                (
                    validateDeleteExperimentsByExperimentIdOutput as unknown as {
                        errors: object
                    }
                ).errors,
                500
            )
        }

        for (const headerName in result.headers) {
            const header = result.headers[headerName]
            if (header) {
                res.setHeader(headerName, header)
            }
        }

        return res.status(result.status).send(result.body)
    } catch (error) {
        next(error)
        return
    }
})