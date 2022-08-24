import { generateKeyPair, JWK, exportJWK, createRemoteJWKSet, jwtVerify } from 'jose';
import { config } from './config'
import { AppDataSource, initializeDataSource } from './data_source';
import { app } from './generated';
import { UserType } from './generated/types';
import { ActiveKeyModel, KeyModel, UserModel } from './model';
import dns from "dns"

export let whitelist: { [key: string]: string } = {}

async function resolveWhitelistEntry(entry: string): Promise<[string,string]> {
    console.log(`resolveWhitelistEntry called for "${entry}"`)
    const userRepository = AppDataSource.getRepository(UserModel)
    let url: string = ""
    let username: string = ""

    if (entry.includes(":")) {
        const split = entry.split(":")
        if (split.length === 2) {
            [url, username] = split
        } else {
            console.error(`Unable to resolve "${entry}" to url and service`)
            throw new Error(`Malformed whitelist entry`)
        }
    }
    if (!url) throw new Error(`Could not extract url from entry`)
    if (!username) throw new Error(`Could not extract username from whitelist entry`)

    const ip = await new Promise<string>((res) => {
        dns.resolve4(url, (err, addresses) => {
            if (err) {
                console.error(`Unable to resolve "${url}" to ip`)
                res("")
            }
            res(addresses[0])
        })
    })
    if (!ip) throw new Error(`Could not find ip for "${url}"`)

    const user = await userRepository.findOne({
        where: {
            username: username
        },
        relations: {
            roles: {
                scopes: true
            }
        }
    })
    if (!user) throw new Error(`Could not find user ${username}`)

    console.log(`resolveWhitelistEntry succeeded`)

    return [ip, user.username]
}

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
        for (const entry of config.WHITELISTED) {
            try {
                const result = await resolveWhitelistEntry(entry)
                whitelist[result[0]] = result[1]
            } catch (err) {
                console.error(err)
            }
        }
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

        app.get("/.well-known/jwks.json", (_req, res, _next) => {
            res.send(jwks);
        })
        app.get("/.well-known/openid-configuration", (_req, res, _next) => {
            res.send({"jwks_uri": "/.well-known/jwks.json"});
        })
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
        console.log("Initialization finished")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })