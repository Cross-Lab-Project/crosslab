import { AppDataSource } from "../data_source"
import {
    getAuthSignature
} from "../generated/signatures/auth"
import { ActiveKeyModel, KeyModel, UserModel } from "../model"
import { SignJWT, JWTPayload, importJWK } from 'jose';
import { config } from "../config";
import { UserType } from "../generated/types";

async function sign<P extends JWTPayload>(payload: P, key: KeyModel, expirationTime: string) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: key.alg, kid: key.uuid })
        .setIssuer(config.SECURITY_ISSUER)
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .sign(await importJWK(JSON.parse(key.private_key), key.alg));
}

export const getAuth: getAuthSignature = async (parameters) => {
    const HOUR = 60 * 60 * 1000
    const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
    const userRepository = AppDataSource.getRepository(UserModel)
    const token = parameters.Authorization.split(" ")[1]

    if (!token) {
        return {
            status: 200
        }
    }

    const user = await userRepository.findOne({
        where: {
            token: token
        },
        relations: {
            currentRole: {
                scopes: true
            }
        }
    })

    if (!user || user.token !== token || new Date(user.tokenExpiresOn).getTime() < Date.now() ) {
        return {
            status: 200
        }
    }

    const activeKeys = await activeKeyRepository.find()

    if (activeKeys.length != 1) {
        throw new Error("Too many active keys")
    }

    const activeKey = activeKeys[0]

    const jwt = await sign<UserType>({ username: user.username, role: user.currentRole.name, scopes: user.currentRole.scopes.map(s => s.name) }, activeKey.key, "2h")

    user.tokenExpiresOn = (new Date(Date.now() + HOUR)).toISOString()
    userRepository.save(user)

    return {
        status: 200,
        headers: {
            Authorization: "Bearer " + jwt
        }
    }
}
