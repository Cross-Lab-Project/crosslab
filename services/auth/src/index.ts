import { generateKeyPair, JWK, exportJWK, jwtVerify, createRemoteJWKSet } from 'jose';
import { config } from './config'
import { AppDataSource, initializeDataSource } from './data_source';
import { app } from './generated';
import { ActiveKeyModel, KeyModel } from './model';

async function generateNewKey(usage = "sig"): Promise<KeyModel> {
    const keyRepository = AppDataSource.getRepository(KeyModel)
    const keyPair = await generateKeyPair("RS256");
    const key = keyRepository.create()

    key.private_key = JSON.stringify(await exportJWK(keyPair.privateKey)),
    key.public_key = JSON.stringify(await exportJWK(keyPair.publicKey)),
    key.use = usage,
    key.alg = "RS256"
    await keyRepository.save(key)

    return key;
}

function jwk(key: KeyModel) {
    const jwk: JWK = JSON.parse(key.public_key);

    jwk.use = key.use;
    jwk.alg = key.alg;
    jwk.kid = key.uuid;

    return jwk;
}

AppDataSource.initialize()
    .then(async () => {
        await initializeDataSource()
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

        app.options("*", (_req, res) => {
            res.status(200).send()
        })
        app.initService({
            JWTVerify: async (jwt, scopes) => {
                if (!jwt) throw("No jwt found")
                if (!config.SECURITY_ISSUER) throw("No security issuer specified")
                const jwksUri = new URL(config.BASE_URL + "/.well-known/jwks.json")
                const JWKS = createRemoteJWKSet(jwksUri)
                try {
                    const jwtVerifyResult = await jwtVerify(jwt, JWKS, { issuer: config.SECURITY_ISSUER, audience: config.SECURITY_AUDIENCE })
                    console.log(jwtVerifyResult.payload)
                } catch (err) {
                    console.log(err)
                }
                return { username: "testuser", role: "superadmin", scopes: scopes }
            }
        })
        app.get("/.well-known/jwks.json", (_req, res, _next) => {
            res.send(jwks);
        })
        app.get("/.well-known/openid-configuration", (_req, res, _next) => {
            res.send({"jwks_uri": "/.well-known/jwks.json"});
        })
        app.listen(config.PORT)
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })