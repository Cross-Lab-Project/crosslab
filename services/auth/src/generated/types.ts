//@ts-nocheck
/**
 * This file was automatically generated by openapi-codegeneration.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source OpenAPI file,
 * and run openapi-codegeneration to regenerate this file.
 */
import * as type_validation from "./type_validation"


                export type UserType<T extends "request"|"response"|"all" = "all"> = T extends "all" 
                    ? {
	url: string
	username: string
	scopes: string[]
	[k: string]: unknown
}
                    : T extends "request" 
                    ? {
	url: string
	username: string
	scopes: string[]
	[k: string]: unknown
}
                    : T extends "response"
                    ? {
	url: string
	username: string
	scopes: string[]
	[k: string]: unknown
}
                    : never
                


                export type Credentials<T extends "request"|"response"|"all" = "all"> = T extends "all" 
                    ? {
	/**
	 * Username of the user.
	 */
	username: string
	/**
	 * Password of the user.
	 */
	password: string
	[k: string]: unknown
}
                    : T extends "request" 
                    ? {
	/**
	 * Username of the user.
	 */
	username: string
	/**
	 * Password of the user.
	 */
	password: string
	[k: string]: unknown
}
                    : T extends "response"
                    ? {
	/**
	 * Username of the user.
	 */
	username: string
	/**
	 * Password of the user.
	 */
	password: string
	[k: string]: unknown
}
                    : never
                


                /**
 * Authentication method.
 */
export type AuthMethod<T extends "request"|"response"|"all" = "all"> = T extends "all" 
                    ? "tui" | "local"
                    : T extends "request" 
                    ? "tui" | "local"
                    : T extends "response"
                    ? "tui" | "local"
                    : never
                


                export type User<T extends "request"|"response"|"all" = "all"> = T extends "all" 
                    ? {
	url: string
	id: string
	username: string
	password: string
	[k: string]: unknown
}
                    : T extends "request" 
                    ? {
	username: string
	password: string
	[k: string]: unknown
}
                    : T extends "response"
                    ? {
	url: string
	id: string
	username: string
	[k: string]: unknown
}
                    : never
                


                export type UserUpdate<T extends "request"|"response"|"all" = "all"> = T extends "all" 
                    ? {
	password: string
	[k: string]: unknown
}
                    : T extends "request" 
                    ? {
	password: string
	[k: string]: unknown
}
                    : T extends "response"
                    ? {
	[k: string]: unknown
}
                    : never
                

export function isUserType<T extends "request"|"response"|"all" = "all">(obj: unknown, type: "request" | "response" | "all" | T = "all"): obj is UserType<T> {
    switch (type) {
        case "request":
            return type_validation.validateUserTypeRequest(obj)
        case "response":
            return type_validation.validateUserTypeResponse(obj)
        default:
            return type_validation.validateUserType(obj)
    }
}