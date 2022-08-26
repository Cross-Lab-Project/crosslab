import { createRemoteJWKSet, jwtVerify } from 'jose'
import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
import { UserType } from './generated/types'

AppDataSource.initialize()
    .then(() => {
        app.initService({
            JWTVerify: async (jwt, scopes) => {
                if (!jwt) throw new Error("No jwt found")
                if (!config.SECURITY_ISSUER) throw new Error("No security issuer specified")
                const jwksUri = new URL(config.BASE_URL.endsWith("/") ? config.BASE_URL + ".well-known/jwks.json" : config.BASE_URL + "/.well-known/jwks.json")
                const JWKS = createRemoteJWKSet(jwksUri)
                const jwtVerifyResult = await jwtVerify(jwt, JWKS, { issuer: config.SECURITY_ISSUER, audience: config.SECURITY_AUDIENCE })
                const user = jwtVerifyResult.payload as UserType
                for (const scope of scopes) {
                    if (!user.scopes.includes(scope)) throw new Error("Missing Scope: " + scope)
                }
                return user
            }
        })
        app.listen(config.PORT)
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })