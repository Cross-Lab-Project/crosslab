import { config } from "../../src/config";
import { UserModel } from "../../src/database/model";
import { User } from "../../src/generated/types";
import { EntityData, ReplaceWith, Subset } from "./index.spec";
import { resolveRole, RoleName } from "./roleData.spec";
import { resolveToken, TokenName } from "./tokenData.spec";

export const userNames = ["superadmin"] as const
export type UserName = typeof userNames[number]
export type UserData = Record<UserName, EntityData<UserModel>>

type UserWithLinks<T extends "all" | "request" | "response" = "all"> = ReplaceWith<User<T>, "roles", RoleName[]>
type UserModelWithLinks = ReplaceWith<ReplaceWith<UserModel, "roles", RoleName[]>, "tokens", TokenName[]>
type UserDataWithLinks = Record<
    UserName, 
    {
        request: UserWithLinks<"request">
        model: UserModelWithLinks
        response: UserWithLinks<"response">
    }
>

const userDataWithLinks: UserDataWithLinks = {
    "superadmin": {
        request: {
            username: "superadmin",
            password: "superadmin",
            roles: ["superadmin", "user"]
        },
        model: {
            username: "superadmin",
            password: "$2a$10$jA9acOfIQxpzj6X50TcDPugDOb4gXLvdsyEVl.9WUDns1jk565dJS",
            roles: ["superadmin", "user"],
            tokens: ["valid token 1", "valid token 2", "expired token 1"]
        },
        response: {
            url: `${config.BASE_URL}${config.BASE_URL.endsWith("/") ? "" : "/"}users/superadmin`,
            username: "superadmin",
            roles: ["superadmin", "user"]
        }
    }
}

export function prepareUserData(): UserData {
    const userData: Subset<UserData> = {}
    for (const userName of userNames) {
        userData[userName] = {
            request: {
                ...userDataWithLinks[userName].request,
                roles: undefined
            },
            model: {
                ...userDataWithLinks[userName].model,
                roles: undefined,
                tokens: undefined
            },
            response: {
                ...userDataWithLinks[userName].response,
                roles: undefined
            }
        }
    }
    for (const key of userNames) {
        userData[key]!.request!.roles = userDataWithLinks[key].request.roles 
            ? userDataWithLinks[key].request.roles?.map((roleName) => resolveRole(roleName, userData).request)
            : undefined

        userData[key]!.model!.roles = userDataWithLinks[key].model.roles 
            ? userDataWithLinks[key].model.roles.map((roleName) => resolveRole(roleName, userData).model)
            : []
        userData[key]!.model!.tokens = userDataWithLinks[key].model.tokens 
            ? userDataWithLinks[key].model.tokens.map((tokenName) => resolveToken(tokenName, userData).model)
            : []

        userData[key]!.response!.roles = userDataWithLinks[key].response.roles 
            ? userDataWithLinks[key].response.roles?.map((roleName) => resolveRole(roleName, userData).response)
            : []
    }

    return userData as UserData
}