import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { JWTVerificationError, isUserType } from './generated/types'

AppDataSource.initialize()
    .then(() => {
        app.initService({
            JWTVerify: async (jwt, scopes) => {
                if (!jwt) throw new JWTVerificationError('No JWT provided', 401)
                if (!config.SECURITY_ISSUER)
                    throw new JWTVerificationError('No security issuer specified', 500)
                const jwksUri = new URL(
                    config.BASE_URL.endsWith('/')
                        ? config.BASE_URL + '.well-known/jwks.json'
                        : config.BASE_URL + '/.well-known/jwks.json'
                )
                const JWKS = createRemoteJWKSet(jwksUri)
                const jwtVerifyResult = await jwtVerify(jwt, JWKS, {
                    issuer: config.SECURITY_ISSUER,
                    audience: config.SECURITY_AUDIENCE,
                })
                if (!isUserType(jwtVerifyResult.payload))
                    throw new JWTVerificationError('Payload is malformed', 401)
                const user = jwtVerifyResult.payload
                for (const scope of scopes) {
                    if (user.scopes.includes(scope)) return user
                }
                throw new JWTVerificationError('Missing Scope: one of ' + scopes, 403)
            },
        })
        app.listen(config.PORT)
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })
