import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { isUserType, JWTVerificationError, MalformedBodyError } from './generated/types'
import { InvalidValueError } from './types/errors'
import { isPeerconnection } from '@cross-lab-project/api-client/dist/generated/device/types'
import { peerconnectionClosedCallbacks } from './globals'

AppDataSource.initialize()
    .then(() => {
        app.post('/experiments/callbacks', (req, res) => {
            if (!req.body.callbackType) {
                throw new MalformedBodyError(
                    'Callbacks require property "callbackType"',
                    400
                )
            }
            if (req.body.callbackType === 'event') {
                if (!('eventType' in req.body.eventType)) {
                    throw new MalformedBodyError(
                        'Callbacks of type "event" require property "eventType"',
                        400
                    )
                }
                if (req.body.eventType === 'peerconnection-closed') {
                    if (!req.body.peerconnection) {
                        throw new MalformedBodyError(
                            'Event-callbacks of type "peerconnection-closed" require property "peerconnection"',
                            400
                        )
                    }
                    const peerconnection = req.body.peerconnection
                    if (!isPeerconnection(peerconnection)) {
                        throw new MalformedBodyError(
                            'Property "peerconnection" is malformed',
                            400
                        )
                    }
                    if (!peerconnection.url) {
                        throw new MalformedBodyError(
                            'Property "peerconnection" is missing url',
                            400
                        )
                    }
                    if (!peerconnectionClosedCallbacks.includes(peerconnection.url)) {
                        return res.status(410).send()
                    }
                    // TODO: add peerconnection closed handling
                    return res.status(201).send()
                } else {
                    throw new InvalidValueError(
                        `Event-callbacks of type "${req.body.eventType}" are not supported`,
                        400
                    )
                }
            } else {
                throw new InvalidValueError(
                    `Callbacks of type "${req.body.callbackType}" are not supported`,
                    400
                )
            }
        })
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
