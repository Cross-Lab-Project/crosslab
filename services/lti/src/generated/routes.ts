/**
 * This file was automatically generated by openapi-codegeneration.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source OpenAPI file,
 * and run openapi-codegeneration to regenerate this file.
 */
import express from "express"

import operations from "../operations/index.js"

import {
    TypedRequest,
	ValidationError
} from "./types.js"

import {
    getLtiPlatformByPlatformIdParametersType,
	patchLtiPlatformByPlatformIdParametersType,
	deleteLtiPlatformByPlatformIdParametersType,
	postLtiPlatformByPlatformIdLoginParametersType,
	postLtiPlatformByPlatformIdLoginRequestBodyType,
	postLtiPlatformByPlatformIdLaunchParametersType,
	postLtiPlatformByPlatformIdLaunchRequestBodyType,
	getLtiPlatformByPlatformIdJwksParametersType,
	getLtiResourceByResourceIdParametersType,
	patchLtiResourceByResourceIdParametersType,
	patchLtiResourceByResourceIdRequestBodyType,
	deleteLtiResourceByResourceIdParametersType,
	getLtiResourceByResourceIdStudentsParametersType,
	patchLtiResourceByResourceIdStudentsParametersType,
	patchLtiResourceByResourceIdStudentsRequestBodyType,
	getLtiResourceByResourceIdStudentsByStudentIdParametersType,
	patchLtiResourceByResourceIdStudentsByStudentIdParametersType,
	patchLtiResourceByResourceIdStudentsByStudentIdRequestBodyType,
	patchLtiSessionBySessionIdExperimentParametersType,
	patchLtiSessionBySessionIdExperimentRequestBodyType
} from "./signatures.js"

import {
    validateGetLtiPlatformInput,
	validateGetLtiPlatformOutput,
	validatePostLtiPlatformInput,
	validatePostLtiPlatformOutput,
	validateGetLtiPlatformByPlatformIdInput,
	validateGetLtiPlatformByPlatformIdOutput,
	validatePatchLtiPlatformByPlatformIdInput,
	validatePatchLtiPlatformByPlatformIdOutput,
	validateDeleteLtiPlatformByPlatformIdInput,
	validateDeleteLtiPlatformByPlatformIdOutput,
	validatePostLtiPlatformByPlatformIdLoginInput,
	validatePostLtiPlatformByPlatformIdLoginOutput,
	validatePostLtiPlatformByPlatformIdLaunchInput,
	validatePostLtiPlatformByPlatformIdLaunchOutput,
	validateGetLtiPlatformByPlatformIdJwksInput,
	validateGetLtiPlatformByPlatformIdJwksOutput,
	validateGetLtiResourceInput,
	validateGetLtiResourceOutput,
	validateGetLtiResourceByResourceIdInput,
	validateGetLtiResourceByResourceIdOutput,
	validatePatchLtiResourceByResourceIdInput,
	validatePatchLtiResourceByResourceIdOutput,
	validateDeleteLtiResourceByResourceIdInput,
	validateDeleteLtiResourceByResourceIdOutput,
	validateGetLtiResourceByResourceIdStudentsInput,
	validateGetLtiResourceByResourceIdStudentsOutput,
	validatePatchLtiResourceByResourceIdStudentsInput,
	validatePatchLtiResourceByResourceIdStudentsOutput,
	validateGetLtiResourceByResourceIdStudentsByStudentIdInput,
	validateGetLtiResourceByResourceIdStudentsByStudentIdOutput,
	validatePatchLtiResourceByResourceIdStudentsByStudentIdInput,
	validatePatchLtiResourceByResourceIdStudentsByStudentIdOutput,
	validatePatchLtiSessionBySessionIdExperimentInput,
	validatePatchLtiSessionBySessionIdExperimentOutput
} from "./requestValidation.js"

export default function router(): express.Router {
    const router = express.Router()

    router.get("/lti/platform", async (req: TypedRequest<{},{},{}>, res, next) => {
        try {
            if (!validateGetLtiPlatformInput()) {
                throw new ValidationError("Request validation failed", (validateGetLtiPlatformInput as any).errors, 400)
            }

            const result = await operations.getLtiPlatform(
                req,)

            if (!validateGetLtiPlatformOutput(result)) {
                throw new ValidationError("Response validation failed", (validateGetLtiPlatformOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.post("/lti/platform", async (req: TypedRequest<{},{},{}>, res, next) => {
        try {
            if (!validatePostLtiPlatformInput()) {
                throw new ValidationError("Request validation failed", (validatePostLtiPlatformInput as any).errors, 400)
            }

            const result = await operations.postLtiPlatform(
                req,)

            if (!validatePostLtiPlatformOutput(result)) {
                throw new ValidationError("Response validation failed", (validatePostLtiPlatformOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.get("/lti/platform/:platform_id", async (req: TypedRequest<{ "platform_id": string },{},{}>, res, next) => {
        const parameters: getLtiPlatformByPlatformIdParametersType = {
            "platform_id": req.params["platform_id"]
        }

        try {
            if (!validateGetLtiPlatformByPlatformIdInput(parameters)) {
                throw new ValidationError("Request validation failed", (validateGetLtiPlatformByPlatformIdInput as any).errors, 400)
            }

            const result = await operations.getLtiPlatformByPlatformId(
                req,parameters)

            if (!validateGetLtiPlatformByPlatformIdOutput(result)) {
                throw new ValidationError("Response validation failed", (validateGetLtiPlatformByPlatformIdOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.patch("/lti/platform/:platform_id", async (req: TypedRequest<{ "platform_id": string },{},{}>, res, next) => {
        const parameters: patchLtiPlatformByPlatformIdParametersType = {
            "platform_id": req.params["platform_id"]
        }

        try {
            if (!validatePatchLtiPlatformByPlatformIdInput(parameters)) {
                throw new ValidationError("Request validation failed", (validatePatchLtiPlatformByPlatformIdInput as any).errors, 400)
            }

            const result = await operations.patchLtiPlatformByPlatformId(
                req,parameters)

            if (!validatePatchLtiPlatformByPlatformIdOutput(result)) {
                throw new ValidationError("Response validation failed", (validatePatchLtiPlatformByPlatformIdOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.delete("/lti/platform/:platform_id", async (req: TypedRequest<{ "platform_id": string },{},{}>, res, next) => {
        const parameters: deleteLtiPlatformByPlatformIdParametersType = {
            "platform_id": req.params["platform_id"]
        }

        try {
            if (!validateDeleteLtiPlatformByPlatformIdInput(parameters)) {
                throw new ValidationError("Request validation failed", (validateDeleteLtiPlatformByPlatformIdInput as any).errors, 400)
            }

            const result = await operations.deleteLtiPlatformByPlatformId(
                req,parameters)

            if (!validateDeleteLtiPlatformByPlatformIdOutput(result)) {
                throw new ValidationError("Response validation failed", (validateDeleteLtiPlatformByPlatformIdOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.post("/lti/platform/:platform_id/login", async (req: TypedRequest<{ "platform_id": string },postLtiPlatformByPlatformIdLoginRequestBodyType,{}>, res, next) => {
        const parameters: postLtiPlatformByPlatformIdLoginParametersType = {
            "platform_id": req.params["platform_id"]
        }

        const body: postLtiPlatformByPlatformIdLoginRequestBodyType = req.body

        try {
            if (!validatePostLtiPlatformByPlatformIdLoginInput(parameters, body)) {
                throw new ValidationError("Request validation failed", (validatePostLtiPlatformByPlatformIdLoginInput as any).errors, 400)
            }

            const result = await operations.postLtiPlatformByPlatformIdLogin(
                req,parameters, body)

            if (!validatePostLtiPlatformByPlatformIdLoginOutput(result)) {
                throw new ValidationError("Response validation failed", (validatePostLtiPlatformByPlatformIdLoginOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.post("/lti/platform/:platform_id/launch", async (req: TypedRequest<{ "platform_id": string },postLtiPlatformByPlatformIdLaunchRequestBodyType,{}>, res, next) => {
        const parameters: postLtiPlatformByPlatformIdLaunchParametersType = {
            "platform_id": req.params["platform_id"]
        }

        const body: postLtiPlatformByPlatformIdLaunchRequestBodyType = req.body

        try {
            if (!validatePostLtiPlatformByPlatformIdLaunchInput(parameters, body)) {
                throw new ValidationError("Request validation failed", (validatePostLtiPlatformByPlatformIdLaunchInput as any).errors, 400)
            }

            const result = await operations.postLtiPlatformByPlatformIdLaunch(
                req,parameters, body)

            if (!validatePostLtiPlatformByPlatformIdLaunchOutput(result)) {
                throw new ValidationError("Response validation failed", (validatePostLtiPlatformByPlatformIdLaunchOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.get("/lti/platform/:platform_id/jwks", async (req: TypedRequest<{ "platform_id": string },{},{}>, res, next) => {
        const parameters: getLtiPlatformByPlatformIdJwksParametersType = {
            "platform_id": req.params["platform_id"]
        }

        try {
            if (!validateGetLtiPlatformByPlatformIdJwksInput(parameters)) {
                throw new ValidationError("Request validation failed", (validateGetLtiPlatformByPlatformIdJwksInput as any).errors, 400)
            }

            const result = await operations.getLtiPlatformByPlatformIdJwks(
                req,parameters)

            if (!validateGetLtiPlatformByPlatformIdJwksOutput(result)) {
                throw new ValidationError("Response validation failed", (validateGetLtiPlatformByPlatformIdJwksOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.get("/lti/resource", async (req: TypedRequest<{},{},{}>, res, next) => {
        try {
            if (!validateGetLtiResourceInput()) {
                throw new ValidationError("Request validation failed", (validateGetLtiResourceInput as any).errors, 400)
            }

            const result = await operations.getLtiResource(
                req,)

            if (!validateGetLtiResourceOutput(result)) {
                throw new ValidationError("Response validation failed", (validateGetLtiResourceOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.get("/lti/resource/:resource_id", async (req: TypedRequest<{ "resource_id": string },{},{}>, res, next) => {
        const parameters: getLtiResourceByResourceIdParametersType = {
            "resource_id": req.params["resource_id"]
        }

        try {
            if (!validateGetLtiResourceByResourceIdInput(parameters)) {
                throw new ValidationError("Request validation failed", (validateGetLtiResourceByResourceIdInput as any).errors, 400)
            }

            const result = await operations.getLtiResourceByResourceId(
                req,parameters)

            if (!validateGetLtiResourceByResourceIdOutput(result)) {
                throw new ValidationError("Response validation failed", (validateGetLtiResourceByResourceIdOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.patch("/lti/resource/:resource_id", async (req: TypedRequest<{ "resource_id": string },patchLtiResourceByResourceIdRequestBodyType,{}>, res, next) => {
        const parameters: patchLtiResourceByResourceIdParametersType = {
            "resource_id": req.params["resource_id"]
        }

        const body: patchLtiResourceByResourceIdRequestBodyType = req.body

        try {
            if (!validatePatchLtiResourceByResourceIdInput(parameters, body)) {
                throw new ValidationError("Request validation failed", (validatePatchLtiResourceByResourceIdInput as any).errors, 400)
            }

            const result = await operations.patchLtiResourceByResourceId(
                req,parameters, body)

            if (!validatePatchLtiResourceByResourceIdOutput(result)) {
                throw new ValidationError("Response validation failed", (validatePatchLtiResourceByResourceIdOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.delete("/lti/resource/:resource_id", async (req: TypedRequest<{ "resource_id": string },{},{}>, res, next) => {
        const parameters: deleteLtiResourceByResourceIdParametersType = {
            "resource_id": req.params["resource_id"]
        }

        try {
            if (!validateDeleteLtiResourceByResourceIdInput(parameters)) {
                throw new ValidationError("Request validation failed", (validateDeleteLtiResourceByResourceIdInput as any).errors, 400)
            }

            const result = await operations.deleteLtiResourceByResourceId(
                req,parameters)

            if (!validateDeleteLtiResourceByResourceIdOutput(result)) {
                throw new ValidationError("Response validation failed", (validateDeleteLtiResourceByResourceIdOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.get("/lti/resource/:resource_id/students", async (req: TypedRequest<{ "resource_id": string },{},{}>, res, next) => {
        const parameters: getLtiResourceByResourceIdStudentsParametersType = {
            "resource_id": req.params["resource_id"]
        }

        try {
            if (!validateGetLtiResourceByResourceIdStudentsInput(parameters)) {
                throw new ValidationError("Request validation failed", (validateGetLtiResourceByResourceIdStudentsInput as any).errors, 400)
            }

            const result = await operations.getLtiResourceByResourceIdStudents(
                req,parameters)

            if (!validateGetLtiResourceByResourceIdStudentsOutput(result)) {
                throw new ValidationError("Response validation failed", (validateGetLtiResourceByResourceIdStudentsOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.patch("/lti/resource/:resource_id/students", async (req: TypedRequest<{ "resource_id": string },patchLtiResourceByResourceIdStudentsRequestBodyType,{}>, res, next) => {
        const parameters: patchLtiResourceByResourceIdStudentsParametersType = {
            "resource_id": req.params["resource_id"]
        }

        const body: patchLtiResourceByResourceIdStudentsRequestBodyType = req.body

        try {
            if (!validatePatchLtiResourceByResourceIdStudentsInput(parameters, body)) {
                throw new ValidationError("Request validation failed", (validatePatchLtiResourceByResourceIdStudentsInput as any).errors, 400)
            }

            const result = await operations.patchLtiResourceByResourceIdStudents(
                req,parameters, body)

            if (!validatePatchLtiResourceByResourceIdStudentsOutput(result)) {
                throw new ValidationError("Response validation failed", (validatePatchLtiResourceByResourceIdStudentsOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.get("/lti/resource/:resource_id/students/:student_id", async (req: TypedRequest<{ "resource_id": string, "student_id": string },{},{}>, res, next) => {
        const parameters: getLtiResourceByResourceIdStudentsByStudentIdParametersType = {
            "resource_id": req.params["resource_id"],
			"student_id": req.params["student_id"]
        }

        try {
            if (!validateGetLtiResourceByResourceIdStudentsByStudentIdInput(parameters)) {
                throw new ValidationError("Request validation failed", (validateGetLtiResourceByResourceIdStudentsByStudentIdInput as any).errors, 400)
            }

            const result = await operations.getLtiResourceByResourceIdStudentsByStudentId(
                req,parameters)

            if (!validateGetLtiResourceByResourceIdStudentsByStudentIdOutput(result)) {
                throw new ValidationError("Response validation failed", (validateGetLtiResourceByResourceIdStudentsByStudentIdOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.patch("/lti/resource/:resource_id/students/:student_id", async (req: TypedRequest<{ "resource_id": string, "student_id": string },patchLtiResourceByResourceIdStudentsByStudentIdRequestBodyType,{}>, res, next) => {
        const parameters: patchLtiResourceByResourceIdStudentsByStudentIdParametersType = {
            "resource_id": req.params["resource_id"],
			"student_id": req.params["student_id"]
        }

        const body: patchLtiResourceByResourceIdStudentsByStudentIdRequestBodyType = req.body

        try {
            if (!validatePatchLtiResourceByResourceIdStudentsByStudentIdInput(parameters, body)) {
                throw new ValidationError("Request validation failed", (validatePatchLtiResourceByResourceIdStudentsByStudentIdInput as any).errors, 400)
            }

            const result = await operations.patchLtiResourceByResourceIdStudentsByStudentId(
                req,parameters, body)

            if (!validatePatchLtiResourceByResourceIdStudentsByStudentIdOutput(result)) {
                throw new ValidationError("Response validation failed", (validatePatchLtiResourceByResourceIdStudentsByStudentIdOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    router.patch("/lti/session/:session_id/experiment", async (req: TypedRequest<{ "session_id": string },patchLtiSessionBySessionIdExperimentRequestBodyType,{}>, res, next) => {
        const parameters: patchLtiSessionBySessionIdExperimentParametersType = {
            "session_id": req.params["session_id"]
        }

        const body: patchLtiSessionBySessionIdExperimentRequestBodyType = req.body

        try {
            if (!validatePatchLtiSessionBySessionIdExperimentInput(parameters, body)) {
                throw new ValidationError("Request validation failed", (validatePatchLtiSessionBySessionIdExperimentInput as any).errors, 400)
            }

            const result = await operations.patchLtiSessionBySessionIdExperiment(
                req,parameters, body)

            if (!validatePatchLtiSessionBySessionIdExperimentOutput(result)) {
                throw new ValidationError("Response validation failed", (validatePatchLtiSessionBySessionIdExperimentOutput as any).errors, 500)
            }

            for (const headerName in result.headers) {
                const header = result.headers[headerName]
                if (header) {
                    res.setHeader(headerName, header)
                }
            }

            return res.status(result.status).json(result.body)
        } catch(error) {
            next(error)
            return
        }
    })

    return router
}