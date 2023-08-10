import { config } from '../config'
import { ApplicationDataSource } from '../database/datasource'
import { UserModel } from '../database/model'
import {
    getUsersPath,
    getUsersResponseBodyType,
    postUsersPath,
    getUsersByUserIdPath,
    deleteUsersByUserIdPath,
    patchUsersByUserIdPath,
} from '../generated/operations'
import {
    validateGetUsers,
    validatePostUsers,
    validateGetUsersByUserId,
    validateDeleteUsersByUserId,
    validatePatchUsersByUserId,
} from '../generated/validation'
import bcrypt from 'bcrypt'
import express from 'express'

/**
 * This function builds the url of a user using its id.
 * @param id The id of the user.
 * @returns The url of the user.
 */
export function userUrlFromId(id: string): string {
    return config.BASE_URL + (config.BASE_URL.endsWith('/') ? '' : '/') + 'users/' + id
}

export const router = express.Router()

router.get(
    getUsersPath,
    validateGetUsers(async (req, res) => {
        await req.authorization.check_authorization_or_fail('view', 'user')

        let users = await ApplicationDataSource.manager.find(UserModel)
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

router.post(
    postUsersPath,
    validatePostUsers(async (req, res) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = await createUser(req.body.username, req.body.password)
        res.status(201)
        res.send({
            username: user.username,
            id: user.uuid,
            url: userUrlFromId(user.uuid),
        })
    })
)

router.get(
    getUsersByUserIdPath,     
    validateGetUsersByUserId(async (req, res) => {
        await req.authorization.check_authorization_or_fail(
            'view',
            `user:${req.params.user_id}`
        )
        const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
            uuid: req.params.user_id,
        })
        res.send({
            username: user.username,
            id: user.uuid,
            url: userUrlFromId(user.uuid),
        })
    })
)

router.delete(
    deleteUsersByUserIdPath,
    validateDeleteUsersByUserId(async (req, res) => {
        await req.authorization.check_authorization_or_fail(
            'delete',
            `user:${req.params.user_id}`
        )
        const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
            uuid: req.params.user_id,
        })
        await ApplicationDataSource.manager.remove(user)
        res.status(204)
        res.send()
    })
)

router.patch(
    patchUsersByUserIdPath,
    validatePatchUsersByUserId(async (req, res) => {
        await req.authorization.check_authorization_or_fail(
            'write',
            `user:${req.params.user_id}`
        )
        const user = await ApplicationDataSource.manager.findOneByOrFail(UserModel, {
            uuid: req.params.user_id,
        })
        user.password = await bcrypt.hash(req.body.password, 10)

        await ApplicationDataSource.manager.save(user)
        res.send()
    })
)

export async function createUser(username: string, password: string) {
    const user = await ApplicationDataSource.manager.create(UserModel, {
        type: 'local',
        username: username,
        password: await bcrypt.hash(password, 10),
    })
    await ApplicationDataSource.manager.save(user)
    return user
}

