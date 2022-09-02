import { createRemoteJWKSet, jwtVerify } from 'jose'
import { config } from './config'
import { AppDataSource, initializeDataSource } from './data_source'
import { app } from './generated'
import { ActiveKeyModel } from './model'
import { resolveAllowlistEntry, generateNewKey, jwk } from './methods/utils'
import { isUserType, JWTVerificationError } from './generated/types'

export let allowlist: { [key: string]: string } = {}

AppDataSource.initialize()
    .then(async () => {
        await initializeDataSource()

        // Resolve Allowlist
        for (const entry of config.ALLOWLIST) {
            try {
                const result = await resolveAllowlistEntry(entry)
                allowlist[result[0]] = result[1]
            } catch (error) {
                console.error(error)
            }
        }

        // Create new active key
        const activeKeyRepository = AppDataSource.getRepository(ActiveKeyModel)
        const key = await generateNewKey()
        const jwks = JSON.stringify({ keys: [jwk(key)] })
        for (const activeKey of await activeKeyRepository.find()) {
            await activeKeyRepository.delete(activeKey)
        }
        const activeKey = activeKeyRepository.create()
        activeKey.key = key
        activeKey.use = key.use
        await activeKeyRepository.save(activeKey)

        app.get('/.well-known/jwks.json', (_req, res, _next) => {
            res.send(jwks)
        })
        app.get('/.well-known/openid-configuration', (_req, res, _next) => {
            res.send({ jwks_uri: '/.well-known/jwks.json' })
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
                    if (!user.scopes.includes(scope))
                        throw new JWTVerificationError('Missing Scope: ' + scope, 403)
                }
                return user
            },
        })
        app.listen(config.PORT)
        console.log('Initialization finished')
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error)
    })
