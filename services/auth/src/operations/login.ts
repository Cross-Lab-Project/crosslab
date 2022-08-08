import { randomBytes } from "crypto"
import { AppDataSource } from "../data_source"
import {
    postLoginSignature
} from "../generated/signatures/login"
import { RoleModel, UserModel } from "../model"
import ldap from "ldapjs"

export async function loginTui(username: string, password: string): Promise<UserModel> {
    const HOUR = 60 * 60 * 1000
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)

    const client = ldap.createClient({
        url: "ldaps://ldapauth.tu-ilmenau.de:636", tlsOptions: {
            minVersion: 'TLSv1'
        }, timeout: 500
    });
    const dn = `cn=${username},ou=user,o=uni`;
    await new Promise((resolve, reject) => {
        client.bind(dn, password, (err, res) => {
            if (err) {
                reject(err); 
            }
            else {
                resolve(res) 
            }
        })
    })
    await new Promise<ldap.SearchEntry>((resolve, reject) => {
        client.search(dn, {}, (err, res) => {
            if (err) {
                reject(err);
            } else {
                let resolved = false;
                res.once("searchEntry", (entry) => {
                    resolve(entry);
                    resolved = true
                })
                res.once("end", () => {
                    if (!resolved) reject("Nothing found")
                })
            }
        })
    })
    let user = await userRepository.findOneBy({ username: "tui:" + username });
    if (!user) {
        user = userRepository.create()
        user.username = "tui:" + username
        user.roles = [await roleRepository.findOneByOrFail({ name: "user" })]
    }
    if (!user.roles) user.roles = [await roleRepository.findOneByOrFail({ name: "user" })]
    user.currentRole = user.roles[0]
    // TODO: make sure that token is truly unique
    user.token = randomBytes(16).toString("hex")
    user.tokenExpiresOn = (new Date(Date.now() + HOUR)).toISOString()

    await userRepository.save(user)
    console.log(JSON.stringify(user, null, 4))
    return user
}

export const postLogin: postLoginSignature = async (body) => {
    let user
    if (body.method === "tui") {
        user = await loginTui(body.username, body.password)
    }

    if (!user) {
        return {
            status: 401
        }
    }

    return {
        status: 201,
        body: user.token
    }
}
