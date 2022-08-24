import { AppDataSource } from "../data_source"
import {
    getAuthSignature
} from "../generated/signatures/auth"
import { ActiveKeyModel, TokenModel, UserModel } from "../model"
import { config } from "../config";
import { UserType } from "../generated/types";
import { whitelist } from "..";
import { sign } from "../methods/auth";

export const getAuth: getAuthSignature = async (parameters) => {
    console.log(`getAuth called`)
    const HOUR = 60 * 60 * 1000
    const BASE_URL = config.BASE_URL.endsWith("/") ? config.BASE_URL : config.BASE_URL + "/"
    const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
    const userRepository = AppDataSource.getRepository(UserModel)
    const tokenRepository = AppDataSource.getRepository(TokenModel)

    const activeKeys = await activeKeyRepository.find({ relations: { key: true } })

    if (activeKeys.length != 1) {
        throw new Error("Too many active keys")
    }

    const activeKey = activeKeys[0]

    if (parameters["X-Real-IP"] && whitelist[parameters["X-Real-IP"]]) {
        console.warn(`IP ${parameters["X-Real-IP"]} is whitelisted, trying to find associated user ${whitelist[parameters["X-Real-IP"]]}`)
        const user = await userRepository.findOne({
            where: {
                username: whitelist[parameters["X-Real-IP"]]
            },
            relations: {
                roles: {
                    scopes: true
                }
            }
        }) 

        if (!user) {
            console.error(`getAuth failed: could not find user ${whitelist[parameters["X-Real-IP"]]} of whitelisted ip ${parameters["X-Real-IP"]}`)
            return {
                status: 200
            }
        }

        const jwt = await sign<UserType>({
            url: BASE_URL + `/users/${user.username}`,
            username: user.username,
            scopes: user.roles.map(r => r.scopes.map(s => s.name)).flat(1).filter((v,i,s) => s.indexOf(v) === i)
        }, activeKey.key, "2h")

        console.log(`getAuth succeeded`)

        return {
            status: 200,
            headers: {
                Authorization: "Bearer " + jwt
            }
        }
    }

    if (!parameters.Authorization) {
        console.error(`getAuth failed: missing "Authorization" parameter`)
        return {
            status: 200
        }
    }

    const tokenString = parameters.Authorization.split(" ")[1]

    if (!tokenString) {
        console.error(`getAuth failed: missing token in "Authorization" parameter`)
        return {
            status: 200
        }
    }

    const token = await tokenRepository.findOne({
        where: {
            token: tokenString
        },
        relations: {
            user: {
                roles: {
                    scopes: true
                }
            }
        }
    })

    if (!token) {
        console.error(`getAuth failed: provided token not found`)
        return {
            status: 200
        }
    }

    const user = token.user

    if (!user) {
        console.error(`getAuth failed: token has no associated user`)
        return {
            status: 200
        }
    }

    if (token.expiresOn && new Date(token.expiresOn).getTime() < Date.now()) {
        console.error(`getAuth failed: token is expired`)
        return {
            status: 200
        }
    }

    console.log(`signing jwt for user ${user.username}`)
    const jwt = await sign<UserType>({ 
        url: BASE_URL + `users/${user.username}`, 
        username: user.username, 
        scopes: user.roles.map(r => r.scopes.map(s => s.name)).flat(1).filter((v,i,s) => s.indexOf(v) === i)
    }, activeKey.key, "2h")

    if (token.expiresOn) token.expiresOn = (new Date(Date.now() + HOUR)).toISOString()
    tokenRepository.save(token)
    userRepository.save(user)

    console.log(`getAuth succeeded`)

    return {
        status: 200,
        headers: {
            Authorization: "Bearer " + jwt
        }
    }
}
