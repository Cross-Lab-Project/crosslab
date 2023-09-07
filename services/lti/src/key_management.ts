import { randomBytes } from 'crypto'
import * as jose from 'jose'

export let publicKey: jose.JWK
export let privateKey: jose.KeyLike
export let kid: string

export async function init_key_management() {
    const keyset = await jose.generateKeyPair('ES256')
    publicKey = await jose.exportJWK(keyset.publicKey)
    kid = randomBytes(8).toString('base64url');
    publicKey.kid = kid
    privateKey = keyset.privateKey
    console.log("Key management initialized", publicKey, privateKey)
}

export function get_jwks(): jose.JSONWebKeySet {
    return {keys: [publicKey]}
}
