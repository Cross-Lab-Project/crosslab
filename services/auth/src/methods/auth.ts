import { KeyModel } from "../model"
import { SignJWT, JWTPayload, importJWK } from 'jose';
import { config } from "../config";

export async function sign<P extends JWTPayload>(payload: P, key: KeyModel, expirationTime: string) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: key.alg, kid: key.uuid })
        .setIssuer(config.SECURITY_ISSUER)
        .setIssuedAt()
        .setAudience(config.SECURITY_AUDIENCE)
        .setExpirationTime(expirationTime)
        .sign(await importJWK(JSON.parse(key.private_key), key.alg));
}