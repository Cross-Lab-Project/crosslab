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
    const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
    const userRepository = AppDataSource.getRepository(UserModel)
    const authorizationString = Buffer.from(parameters.Authorization.split(" ")[1], "base64").toString()

    if (authorizationString.length !== 2) {
        return {
            status: 200
        }
    }

    const authorizationData = authorizationString[1].split(":")

    if (authorizationData.length !== 2) {
        return {
            status: 200
        }
    }

    const username = authorizationData[0]
    const token = authorizationData[1]

    const user = await  userRepository.findOneBy({ username: "tui:" + username })

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

    return {
        status: 200,
        headers: {
            Authorization: "Bearer " + jwt
        }
    }
}
