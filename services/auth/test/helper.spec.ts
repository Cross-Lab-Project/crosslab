import { exportJWK, generateKeyPair } from "jose";

async function generateValidKeyPair() {
    const keyPair = await generateKeyPair("RS256")
    console.log(JSON.stringify(await exportJWK(keyPair.privateKey), null, 4))
    console.log(JSON.stringify(await exportJWK(keyPair.publicKey), null, 4))
}

generateValidKeyPair()