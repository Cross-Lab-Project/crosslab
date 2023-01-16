import { Token } from "../../src/types/types";
import { scopeData } from "./scopeData.spec";
import { userData } from "./userData.spec";

type ExpiredTokenNames = "expired token 1" | string

export const tokenDataExpired: Record<ExpiredTokenNames, Token<"request">> = {
    "expired token 1": {
        user: userData.superadmin.username!,
        scopes: [
            scopeData["scope 1"]
        ],
        expiresOn: new Date(Date.now() - 360000).toISOString()
    }
}

type ValidTokenNames = "valid token 1" | "valid token 2" | string

export const tokenDataValid: Record<ValidTokenNames, Token<"request">> = {
    "valid token 1": {
        user: userData.superadmin.username!,
        scopes: [
            scopeData["scope 1"]
        ],
        expiresOn: new Date(Date.now() + 360000).toISOString()
    },
    "valid token 2": {
        user: userData.superadmin.username!,
        scopes: [
            scopeData["scope 1"]
        ]
    }
}