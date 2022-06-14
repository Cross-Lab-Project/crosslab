import { OpenAPIV3_1 } from "openapi-types"

export type DataType = "schema" | "parameter" | "reference" | "pathItem" | "operation" | "mediaType" | "encoding" | "header" | "link" | "response" | "requestBody" | "callback"
export type OperationMethod = "get" | "post" | "put" | "patch" | "trace" | "head" | "options" | "delete"

export interface DefaultData {
    type: DataType
    location?: string
}

export interface SchemaData extends DefaultData {
    type: "schema"
    schema: OpenAPIV3_1.SchemaObject
    name?: string
    typeDeclaration?: string
    dependencies?: Array<string>
    validationFunction?: string
}

export interface ParameterData extends DefaultData {
    type: "parameter"
    name: string
    in: string // "path" | "query" | "header" | "cookie"
    parameter: OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject
    schema?: SchemaData | ReferenceData
}

export interface ReferenceData extends DefaultData {
    type: "reference"
    refType: DataType
    reference: OpenAPIV3_1.ReferenceObject
    [key: string]: any
}

export interface OperationData extends DefaultData {
    type: "operation"
    method: OperationMethod
    path: string
    operation: OpenAPIV3_1.OperationObject
    parameters?: Array<ParameterData|ReferenceData>
    requestBody?: RequestBodyData | ReferenceData
    responses?: Array<ResponseData|ReferenceData>
    callbacks?: Array<CallbackData|ReferenceData>
    security?: Array<{[key: string]: Array<string>}>
}

export interface MediaTypeData extends DefaultData {
    type: "mediaType"
    mediaType: OpenAPIV3_1.MediaTypeObject
    key: string
    schema?: SchemaData | ReferenceData
    encoding?: Array<EncodingData>
}

// TBD: https://spec.openapis.org/oas/v3.1.0#encoding-object
export interface EncodingData extends DefaultData {
    type: "encoding"
    encoding: OpenAPIV3_1.EncodingObject
}

// TBD: https://spec.openapis.org/oas/v3.1.0#header-object
export interface HeaderData extends DefaultData {
    type: "header"
    header: OpenAPIV3_1.HeaderObject
}

export interface PathItemData extends DefaultData {
    type: "pathItem",
    pathItem: OpenAPIV3_1.PathItemObject
    basePath: string
    path: string
    operations?: Array<OperationData>
    parameters?: Array<ParameterData|ReferenceData>
    reference?: string
}

// TBD: https://spec.openapis.org/oas/v3.1.0#link-object
export interface LinkData extends DefaultData {
    type: "link"
    link: OpenAPIV3_1.LinkObject
}

export interface ResponseData extends DefaultData {
    type: "response"
    response: OpenAPIV3_1.ResponseObject
    status?: string
    headers?: Array<HeaderData|ReferenceData>
    content?: Array<MediaTypeData>
    links?: Array<LinkData|ReferenceData>
}

export interface RequestBodyData extends DefaultData {
    type: "requestBody"
    requestBody: OpenAPIV3_1.RequestBodyObject
    required: boolean
    content?: Array<MediaTypeData>
}

// TBD: https://spec.openapis.org/oas/v3.1.0#callback-object
export interface CallbackData extends DefaultData {
    type: "callback"
    callback: OpenAPIV3_1.CallbackObject
}

export interface ValidationBlueprint {
    name: string
    schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject
    schemaLocation: string
}

export interface RouteFunction {
    name: string
    method: OperationMethod
    path: string
    validateInput: string
    validateOutput: string
    signature: string
    scopes: Array<string>
    parameters?: {
        cookie?: Array<ParameterData>
        query?: Array<ParameterData>
        header?: Array<ParameterData>
        path?: Array<ParameterData>
    }
    body?: RequestBodyData
    responses?: Array<ResponseData>
}

export interface OpenAPIData {
    api: OpenAPIV3_1.Document 
    components?: {
        schemas?: Array<SchemaData|ReferenceData>
        parameters?: Array<ParameterData|ReferenceData>
        callbacks?: Array<CallbackData|ReferenceData>
        requestBodies?: Array<RequestBodyData|ReferenceData>
        pathItems?: Array<PathItemData|ReferenceData>
        responses?: Array<ResponseData|ReferenceData>
        headers?: Array<HeaderData|ReferenceData>
    }
    paths?: Array<PathItemData>
    superschema?: { 
        title: "superschema"
        type: "object"
        properties: {
            [key: string]: OpenAPIV3_1.ReferenceObject
        }
        components?: OpenAPIV3_1.ComponentsObject
        paths?: OpenAPIV3_1.PathsObject
    }
    validationBlueprints?: Array<ValidationBlueprint> 
    routeFunctions?: {
        [key: string]: Array<RouteFunction>
    }
}