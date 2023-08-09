import { config } from './config'
import { repositories } from './database/datasource'
import { UserModel } from './database/model'
import {
    deleteUsersByUserIdPath,
    getAuthPath,
    getUsersByUserIdPath,
    getUsersPath,
    getUsersResponseBodyType,
    patchUsersByUserIdPath,
    postLoginPath,
    postUsersPath,
} from './generated/operations'
import {
    validateDeleteUsersByUserId,
    validateGetAuth,
    validateGetUsers,
    validateGetUsersByUserId,
    validatePatchUsersByUserId,
    validatePostLogin,
    validatePostUsers,
} from './generated/validation'
import { loginTui } from './tui_ldap'
import {
    requestIdHandling,
    logHandling,
    errorHandler,
    UnauthorizedError,
} from '@crosslab/service-common'
import { authorization } from '@crosslab/service-common'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import crypto from 'crypto'
import express from 'express'
import { SignJWT } from 'jose'

/**
 * This function builds the url of a user using its id.
 * @param id The id of the user.
 * @returns The url of the user.
 */
export function userUrlFromId(id: string): string {
    return config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'users/' + id
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
requestIdHandling(app)
logHandling(app)
app.use(authorization.middleware(config.authorization_config))

app.get('/auth/status', (_req, res) => {
    res.send({ status: 'ok' })
})

const bearerTokenRegex = /^Bearer (\S*)$/
function parseBearerToken(authorizationHeader: string | undefined): string | undefined {
    if (!authorizationHeader) {
        return undefined
    }
    const match = authorizationHeader.match(bearerTokenRegex)

    if (!match || match.length !== 2) {
        return undefined
    }

    return match[1]
}

function parseQueryToken(query: string | undefined): string | undefined {
    if (!query) {
        return undefined
    }
    const params = new URLSearchParams(query)
    return params.get('authToken') ?? undefined
}

app.post(
    postLoginPath,
    validatePostLogin(async (req, res) => {
        const { username, password } = req.body
        let user = await repositories.user.findOneBy({ username: username })
        if (user === null) user = await prepareTuiUser(username, password, req)
        if (user === null) throw new UnauthorizedError('Invalid login credentials')

        if (!(await checkCredentials(user, username, password))) {
            throw new UnauthorizedError('Invalid login credentials')
        }

        user.lastLogin = new Date().toISOString()
        repositories.user.save(user)

        const token = await createNewToken(user)

        res.status(201)
        res.send(token.token)
    })
)

app.get(
    getAuthPath,
    validateGetAuth(async (req, res) => {
        const tokenId =
            parseQueryToken(req.header('X-Original-Query')) ??
            req.cookies['authToken'] ??
            parseBearerToken(req.header('Authorization'))
        try {
            const token = await repositories.token.findOneOrFail({
                where: { token: tokenId },
                relations: { user: true },
            })
            const jwt = await new SignJWT({
                sub: token.user.uuid,
                ipa: req.header('X-Original-Query'),
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .sign(new TextEncoder().encode(config.JWT_SECRET))
            res.setHeader('X-Request-Authentication', jwt)
        } catch (e) {
            console.log(e)
            // ignore
        }
        res.send()
    })
)

app.get(
    getUsersPath,
    validateGetUsers(async (req, res) => {
        await req.authorization.check_authorization_or_fail('view', 'user')

        let users = await repositories.user.find()
        users = await req.authorization.filter(users, 'view', (u) => `user:${u.uuid}`)

        type user = getUsersResponseBodyType[number]
        res.send(
            users.map(
                (u) =>
                    <user>{ username: u.username, id: u.uuid, url: userUrlFromId(u.uuid) }
            )
        )
    })
)

app.post(
    postUsersPath,
    validatePostUsers(async (req, res) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = await repositories.user.create({
            username: `local:${req.body.username}`,
            password: await bcrypt.hash(req.body.password, 10),
        })
        await repositories.user.save(user)
        res.status(201)
        res.send()
    })
)

app.get(
    getUsersByUserIdPath,
    validateGetUsersByUserId(async (req, res) => {
        await req.authorization.check_authorization_or_fail(
            'view',
            `user:${req.params.user_id}`
        )
        const user = await repositories.user.findOneByOrFail({ uuid: req.params.user_id })
        res.send({
            username: user.username,
            id: user.uuid,
            url: userUrlFromId(user.uuid),
        })
    })
)

app.delete(
    deleteUsersByUserIdPath,
    validateDeleteUsersByUserId(async (req, res) => {
        await req.authorization.check_authorization_or_fail(
            'delete',
            `user:${req.params.user_id}`
        )
        const user = await repositories.user.findOneByOrFail({ uuid: req.params.user_id })
        await repositories.user.remove(user)
        res.status(204)
        res.send()
    })
)

app.patch(
    patchUsersByUserIdPath,
    validatePatchUsersByUserId(async (req, res) => {
        await req.authorization.check_authorization_or_fail(
            'write',
            `user:${req.params.user_id}`
        )
        const user = await repositories.user.findOneByOrFail({ uuid: req.params.user_id })
        user.password = await bcrypt.hash(req.body.password, 10)

        await repositories.user.save(user)
        res.send()
    })
)

app.use(errorHandler)

export default app
async function createNewToken(user: UserModel) {
    const token = await repositories.token.create({
        user: user,
        token: crypto.randomBytes(64).toString('base64url'),
        expiresOn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    })
    await repositories.token.save(token)
    return token
}

async function checkCredentials(user: UserModel, username: string, password: string) {
    if (user === null) return false
    switch (user.type) {
        case 'tui':
            return loginTui(username, password)
        case 'local':
            return user.password && (await bcrypt.compare(password, user.password))
        default:
            return false
    }
}

async function prepareTuiUser(username: string, password: string, req: express.Request) {
    if (!loginTui(username, password)) {
        return null
    }

    const user = await repositories.user.create({
        username: username,
        type: 'tui',
        password: await bcrypt.hash(password, 10),
    })
    await repositories.user.save(user)

    req.authorization.relate(`user:${user.uuid}`, 'viewer', 'user')
    return user
}
