import * as jose from 'jose'

export function get_jwks(): jose.JSONWebKeySet {
    return {keys: []}
}