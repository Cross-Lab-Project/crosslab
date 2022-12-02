import { config } from './config'
import { AppDataSource } from './database/data_source'
import { app } from './generated/index'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { isUserType } from './generated/types'
import { callbackHandling } from './util/callbacks'
import expressWinston from 'express-winston'
import { logger } from './util/requestHandler'
import { JWTVerificationError } from './types/errors'

AppDataSource.initialize()
    .then(() => {
        app.use(expressWinston.logger({
            winstonInstance: logger,
            meta: true, // optional: control whether you want to log the meta data about the request (default to true)
            msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute: function (_req, _res) { return false; }, // optional: allows to skip some log messages based on request and/or response
            requestFilter: (req, propName) => {
                if (propName === "headers" && req.headers.authorization)
                    return {
                        ...req.headers,
                        authorization: "HIDDEN"
                    }
                return req[propName]
            }
        }));

        callbackHandling(app)
        app.initService({
            security: { 
                "JWT": async (req, scopes) => {
                    const authorization_header = req.header("Authorization")
                    if (authorization_header === undefined) {
                        throw new JWTVerificationError("Authorization header is not set", 401)
                    }
                    const bearerTokenResult = /^Bearer (.*)$/.exec(authorization_header);
                    if (bearerTokenResult === null || bearerTokenResult.length != 2) {
                        throw new JWTVerificationError("Authorization header is malformed", 401)
                    }
                    const jwt = bearerTokenResult[1]
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
                        if (user.scopes.includes(scope)) {
                            return user
                        }
                    }
                    throw new JWTVerificationError('Missing Scope: one of ' + scopes, 403)
                }
            },
        })
        app.listen(config.PORT)
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })
