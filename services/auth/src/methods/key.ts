import { KeyModel } from '../database/model'
import { keyRepository } from '../database/repositories/keyRepository'
import { generateKeyPair, exportJWK } from 'jose'

/**
 * This function generates a new key.
 * @param usage The usage of the key (default: "sig")
 * @returns The newly generated key.
 */
export async function generateNewKey(usage = 'sig'): Promise<KeyModel> {
    const keyPair = await generateKeyPair('RS256')

    const keyModel = await keyRepository.create({
        private_key: await exportJWK(keyPair.privateKey),
        public_key: await exportJWK(keyPair.publicKey),
        use: usage,
        alg: 'RS256',
    })

    await keyRepository.save(keyModel)

    return keyModel
}

/**
 * This function parses a JWK from the provided key.
 * @param keyModel The key to be parsed.
 * @returns The parsed JWK.
 */
export function jwk(keyModel: KeyModel) {
    const parsed_jwk = keyModel.public_key

    parsed_jwk.use = keyModel.use
    parsed_jwk.alg = keyModel.alg
    parsed_jwk.kid = keyModel.uuid

    return parsed_jwk
}
