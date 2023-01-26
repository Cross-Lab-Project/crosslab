import { TokenModel, UserModel } from "../../src/database/model";
import { Token } from "../../src/types/types";
import { EntityData, ReplaceWith, Subset } from "./index.spec";
import { resolveScope, ScopeName } from "./scopeData.spec";
import { UserData, UserName } from "./userData.spec";

export const tokenNames = ["expired token 1", "valid token 1", "valid token 2"] as const
export type TokenName = typeof tokenNames[number]
export type TokenData = Record<TokenName, EntityData<TokenModel>>

type TokenWithLinks<T extends "all" | "request" | "response" = "all"> = T extends "all" | "request"
    ? ReplaceWith<ReplaceWith<Token<T>, "scopes", ScopeName[]>, "user", UserName>
    : undefined
type TokenModelWithLinks = ReplaceWith<ReplaceWith<TokenModel, "scopes", ScopeName[]>, "user", UserName>
type TokenDataWithLinks = Record<
    TokenName, 
    {
        request: TokenWithLinks<"request">
        model: TokenModelWithLinks
        response: TokenWithLinks<"response">
    }
>

const tokenDataWithLinks: TokenDataWithLinks = {
    "expired token 1": {
        request: {
            scopes: ["scope 1"],
            user: "superadmin",
            expiresOn: new Date(Date.now() - 360000).toISOString()
        },
        model: {
            scopes: ["scope 1"],
            token: "fe56a6bd-d09b-4d68-8874-ee214f400980",
            user: "superadmin",
            expiresOn: new Date(Date.now() - 360000).toISOString()
        },
        response: undefined
    },
    "valid token 1": {
        request: {
            scopes: ["scope 2", "scope 3"],
            user: "superadmin",
        },
        model: {
            scopes: ["scope 2", "scope 3"],
            token: "9df0cfd1-ea6a-4d1e-8647-636419f36c5a",
            user: "superadmin"
        },
        response: undefined
    },
    "valid token 2": {
        request: {
            scopes: ["scope 1", "scope 4", "scope 5"],
            user: "superadmin",
            // This url is just a mock and does not point to a valid device
            device: "http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519" 
        },
        model: {
            scopes: ["scope 1", "scope 4", "scope 5"],
            token: "f75df3d6-e4da-4644-b366-178e9e44b2bc",
            user: "superadmin",
            // This url is just a mock and does not point to a valid device
            device: "http://localhost:3000/devices/381e8aef-6a1e-4ac0-9bcf-bb4c220d0519" 
        },
        response: undefined
    }
}

export function resolveToken(tokenName: TokenName, userData: Subset<UserData>): EntityData<TokenModel> {
    return {
        request: {
            ...tokenDataWithLinks[tokenName].request,
            scopes: tokenDataWithLinks[tokenName].request.scopes.map((scopeName) => resolveScope(scopeName).request),
            user: userData[tokenDataWithLinks[tokenName].request.user]!.request!.username!
        }, 
        model: {
            ...tokenDataWithLinks[tokenName].model,
            scopes: tokenDataWithLinks[tokenName].model.scopes.map((scopeName) => resolveScope(scopeName).model),
            user: userData[tokenDataWithLinks[tokenName].model.user]!.model! as UserModel
        },
        response: undefined
    }
}

export function prepareTokenData(userData: UserData): TokenData {
    const tokenData: Partial<TokenData> = {}
    
    for (const tokenName of tokenNames) {
        tokenData[tokenName] = resolveToken(tokenName, userData)
    }

    return tokenData as TokenData
}