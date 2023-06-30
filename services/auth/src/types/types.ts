import { JWK } from 'jose'

export type Token<T extends 'request' | 'response' | 'all' = 'all'> = T extends 'all'
    ? {
          token: string
          scopes: string[]
          roles: string[]
          user: string
          expiresOn?: string
          device?: string
      }
    : T extends 'request'
    ? {
          scopes: string[]
          roles: string[]
          user: string
          expiresOn?: string
          device?: string
      }
    : T extends 'response'
    ? undefined
    : never

export type Scope<_T extends 'request' | 'response' | 'all' = 'all'> = string

export type Key<T extends 'request' | 'response' | 'all' = 'all'> = T extends
    | 'all'
    | 'request'
    ? {
          alg: string
          private_key: JWK
          public_key: JWK
          use: string
      }
    : T extends 'response'
    ? undefined
    : never

export type ActiveKey<T extends 'request' | 'response' | 'all' = 'all'> = T extends
    | 'all'
    | 'request'
    ? {
          use: string
          key: string
      }
    : T extends 'response'
    ? undefined
    : never

export type AllowlistEntry = {
    token: string
    username: string
}

export type AppConfiguration = {
    PORT: number
    NODE_ENV: string
    BASE_URL: string
    JWKS_URL: string
    SECURITY_ISSUER: string
    SECURITY_AUDIENCE: string
    ALLOWLIST: string
    API_TOKEN: string
}
