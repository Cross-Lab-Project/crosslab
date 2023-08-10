import { ApplicationDataSource } from '../database/datasource'
import { TokenModel, UserModel } from '../database/model'
import { postLoginPath } from '../generated/operations'
import { validatePostLogin } from '../generated/validation'
import { loginTui } from './tui_ldap'
import { UnauthorizedError } from '@crosslab/service-common'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import express from 'express'

async function createNewToken(user: UserModel) {
    const token = await ApplicationDataSource.manager.create<TokenModel>({
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

export const router = express.Router()

router.post(
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
