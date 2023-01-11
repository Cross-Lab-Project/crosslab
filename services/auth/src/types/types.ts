export type Token = {
    token: string
    scopes: string[]
    expiresOn?: string
    device?: string
}

export type Scope = {
    name: string
}

export type Key = {
    alg: string,
    private_key: string,
    public_key: string,
    use: string
}