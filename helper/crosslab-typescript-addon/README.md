# OpenAPI Code Generation Typescript

## General
### Naming Conventions:
- Signature = {operation}Signature
- ParametersType = {operation}ParametersType
- BodyType = {operation}BodyType
- ResponseType = {operation}ResponseType
- SuccessResponseType = {operation}SuccessResponseType
- ErrorResponseType = {operation}ErrorResponseType
- StatusResponse = {operation}Response{status}
- validateInput = validate{operation}Input
- validateOutput = validate{operation}Output
- validateSchema(schema) = validate{schema}

## Server
The generated server code should contain the following:
- An implementation of all defined routes
- The function signatures for all defined routes
- Validation functions for all defined schemas
- An index file exporting the express server
- Types for all defined schemas + additional types

### Types
```typescript
export type TypedRequest<P,B,Q> = Request<P,{},B,Q,{}>

export type SecurityOption = ? // (e.g. "JWT" | "TuiAuth")

export type initServiceOptions = {
    handleSecurity: (req: Request, sec: SecurityOption, scopes: string[])
}

export interface ResponseData {
    status: number,
    headers?: {
        [key: string]: string | undefined
    },
    body?: any
}

export interface SuccessResponse extends ResponseData {
    success?: true
}

export interface ErrorResponse extends ResponseData {
    success?: false
}

export function isSuccessResponse(response: ResponseData): response is SuccessResponse {
    return response.status < 400
}

export function isErrorResponse(response: ResponseData): response is ErrorResponse {
    return response.status >= 400
}

export abstract class ErrorWithStatus extends Error {
    public status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
        this.name = "ErrorWithStatus"
    }
}

export class ValidationError extends ErrorWithStatus {
    constructor(message: string, status?: number) {
        super(message, status)
        this.name = "ValidationError"
    }
}

export Type<{schema}>

export TypeGuard<{schema}>
```

### Signatures
```typescript
export type Signature = (
    // [if parameters]
    parameters: ParametersType,
    // [if body]
    body: BodyType,
    // [if security == JWT]
    user: UserType
) => Promise<ResponseType> | ResponseType

export type ParametersType = {
    {parameter}: Type<{parameter}>,
} 

export type BodyType = Type<{body}>

export type ResponseType = SuccessResponseType | ErrorResponseType

export type SuccessResponseType = [StatusResponse & SuccessResponse]

export type ErrorResponseType = [StatusResponse & ErrorResponse]

interface StatusResponse extends [SuccessReponse ({status} < 400) | ErrorResponse ({status} >= 400)] {
    status: {status}
    headers: {
        ...{headers}: string,
        [key: string]: string | undefined
    }
    body: {body}
} 
```

### Validation
```typescript
export function validateInput(
    // [if parameters]
    parameters: ParametersType,
    // [if body]
    body: BodyType,
    // [if security == JWT]
    user: UserType
) {
    // [if parameters]
    if (parameters) {
        // [for all parameter in parameters]
        if (!validateSchema(parameters[{parameter}])) {
            (validateInput as any).errors = (validateSchema as any).errors
            return false
        }
    } else { 
        // [parameters required]
        return false
    }

    // [if body]
    if (!validateSchema(body)) {
        (validateInput as any).errors = (validateSchema as any).errors
        return false
    }

    // [if security == JWT]
    if (!validateSchema(user)) {
        (validateInput as any).errors = (validateSchema as any).errors
        return false
    }

    return true
}

export function validateOutput(response: ResponseData): response is ResponseType {
    if (response.status < 100 || response.status >= 600) return false

    // [for all possible values of status]
    if (response.status === status) {
        // [if headers]
        if (response.headers) {
            // [for header in headers]
            if (!validateSchema(response.headers[{header}])) {
                (validateOutput as any).errors = (validateSchema as any).errors
                return false
            }
        } else {
            // [headers required]
            return false
        }

        // [if body]
        if (!validateSchema(response.body)) {
            (validateInput as any).errors = (validateSchema as any).errors
            return false
        }
        return true
    }

    (validateOutput as any).errors = `Response status ${response.status} is unexpected`

    return false
}
```

### Routes
```typescript
    router.{method}({route}, async(req, res, next) => {
        // if [security == JWT]
        let user: UserType
        try {
            user = secRoute(req, sec, scopes)
        } catch(error) {
            next(error)
            return
        }
        // endif [security == JWT]

        const parameters: {parametersType} = {parameters}
        const body: {bodyType} = {body}

        try {
            if (!{validateInput}(parameters, body)) {
                throw new ValidationError("Request validation failed", 400)
            }
            const result = await {operation}(
                ParametersType ? parameters: ParametersType,
                BodyType ? body: BodyType,
                security ? user: UserType
            )
            if (!{validateOutput}(result)) {
                throw new ValidationError("Response validation failed", 500)
            }
            if (result.headers) {
                for (const headerName in result.headers) {
                    const header = result.headers[headerName]
                    if (header) {
                        res.setHeader(headerName, header)
                    }
                }
            }
            return res.status(result.status || 200).send(result.body)
        } catch(error) {
            next(error)
            return
        }
    })
```

### Problems
1. How to handle types which for example just add required to another type? (properties next to refs seem to overwrite the referenced values)
   &#8658; Custom Type Generation
2. How to add generation of validation to new generator? 
   &#8658; Add further step for typescript / Add option to generate validation functions for typescript
3. 