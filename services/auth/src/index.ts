import express from 'express'
import { generateKeyPair, JWK, exportJWK, SignJWT, KeyLike } from 'jose';
import { config } from './config'

const app = express()


async function generateNewKey(usage = "sig") {
    let keyPair = await generateKeyPair("RS256");
    let key = {
        private_key : JSON.stringify(await exportJWK(keyPair.privateKey)),
        public_key : JSON.stringify(await exportJWK(keyPair.publicKey)),
        use : usage,
        alg : "RS256",
        private_jwk: keyPair.privateKey
    }

    return key;
}

function jwk(key: { private_key: string; public_key: string; use: string; alg: string; }) {
    let jwk: JWK = JSON.parse(key.public_key);
    jwk.use = key.use;
    jwk.alg = key.alg;
    jwk.kid = "1";
    return jwk;
}

async function sign(payload: any, key: { private_key: string; public_key: string; use: string; alg: string, private_jwk:KeyLike; }, expirationTime: string) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: key.alg, kid: "1" })
        .setIssuer(config.SECURITY_ISSUER)
        .setIssuedAt()
        .setExpirationTime(expirationTime)
        .sign(key.private_jwk);
}

async function main() {
    let key = await generateNewKey();
    let jwks = JSON.stringify({ keys: [jwk(key)] })

    app.get("/.well-known/jwks.json", (_req, res, _next) => {
        res.send(jwks);
    });

    app.get("/.well-known/openid-configuration", (_req, res, _next) => {
        res.send({"jwks_uri": "/.well-known/jwks.json"});
    });


    app.get('/auth', async (req, res) => {
        const scopes=req.header('X-Check-Scope')
        if (scopes!=undefined) {
            // Check if the authorized user as the specified scope otherwise return 401
            /*console.log(scopes)
            res.status(401).send("Unauthorized")
            return;*/
        }
        const jwt = await sign({ scope: ["testscope"], user: "testuser" }, key, "2h");
        console.log(jwt)
        res.header('Authorization', "Bearer "+jwt);
        res.send();
    })

    app.listen(config.PORT)
}

main();