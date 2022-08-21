import { AppDataSource } from "../data_source"
import {
    getAuthSignature
} from "../generated/signatures/auth"
import { ActiveKeyModel, KeyModel, TokenModel, UserModel } from "../model"
import { SignJWT, JWTPayload, importJWK } from 'jose';
import { config } from "../config";
import { UserType } from "../generated/types";

const BASE_URL = config.BASE_URL.endsWith("/") ? config.BASE_URL : config.BASE_URL + "/"

async function sign<P extends JWTPayload>(payload: P, key: KeyModel, expirationTime: string) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: key.alg, kid: key.uuid })
        .setIssuer(config.SECURITY_ISSUER)
        .setIssuedAt()
        .setAudience(config.SECURITY_AUDIENCE)
        .setExpirationTime(expirationTime)
        .sign(await importJWK(JSON.parse(key.private_key), key.alg));
}

export const getAuth: getAuthSignature = async (parameters) => {
    const HOUR = 60 * 60 * 1000
    const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
    const userRepository = AppDataSource.getRepository(UserModel)
    const tokenRepository = AppDataSource.getRepository(TokenModel)

    const activeKeys = await activeKeyRepository.find({ relations: { key: true } })

    if (activeKeys.length != 1) {
        throw new Error("Too many active keys")
    }

    const activeKey = activeKeys[0]


    if (parameters.XRealIP?.startsWith("172.")) {
        console.warn(`IP ${parameters.XRealIP} is from local network, authenticated by default`)

        const jwt = await sign<UserType>({
            url: BASE_URL + `users/SERVICE`,
            username: 'SERVICE USER',
            role: 'SERVICE ROLE',
            scopes: ['service']
        }, activeKey.key, "2h")

        return {
            status: 200,
            headers: {
                Authorization: "Bearer " + jwt
            }
        }
    }

    if (!parameters.Authorization) {
        return {
            status: 200
        }
    }

    const tokenString = parameters.Authorization.split(" ")[1]

    if (!tokenString) {
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
                currentRole: {
                    scopes: true
                }
            }
        }
    })

    if (!token) {
        return {
            status: 200
        }
    }

    const user = token.user

    if (!user || token.expiresOn && new Date(token.expiresOn).getTime() < Date.now()) {
        return {
            status: 200
        }
    }

    const jwt = await sign<UserType>({ url: BASE_URL + `users/${user.username}`, username: user.username, role: user.currentRole.name, scopes: user.currentRole.scopes.map(s => s.name) }, activeKey.key, "2h")

    if (token.expiresOn) token.expiresOn = (new Date(Date.now() + HOUR)).toISOString()
    tokenRepository.save(token)
    userRepository.save(user)

    return {
        status: 200,
        headers: {
            Authorization: "Bearer " + jwt
        }
    }
}
