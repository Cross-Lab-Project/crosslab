import { AppDataSource } from "../data_source"
import {
    postLoginSignature
} from "../generated/signatures/login"
import { RoleModel, TokenModel, UserModel } from "../model"
import ldap from "ldapjs"

// TODO: replace 500 return code on wrong credentials
export async function loginTui(username: string, password: string): Promise<TokenModel> {
    const HOUR = 60 * 60 * 1000
    const userRepository = AppDataSource.getRepository(UserModel)
    const roleRepository = AppDataSource.getRepository(RoleModel)
    const tokenRepository = AppDataSource.getRepository(TokenModel)

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
    let user = await userRepository.findOne({ 
        where: {
            username: "tui:" + username 
        },
        relations: {
            tokens: true
        }
    });
    if (!user) {
        user = userRepository.create()
        user.username = "tui:" + username
        user.roles = [await roleRepository.findOneByOrFail({ name: "user" })]
        user.tokens = []
    }
    if (!user.tokens) user.tokens = []
    if (!user.roles) user.roles = [await roleRepository.findOneByOrFail({ name: "user" })]
    user.currentRole = user.roles[0]
    const token = tokenRepository.create()
    token.expiresOn = new Date(Date.now() + HOUR).toISOString()
    user.tokens.push(token)

    await userRepository.save(user)
    return token
}

export const postLogin: postLoginSignature = async (body) => {
    let token
    if (body.method === "tui") {
        token = await loginTui(body.username, body.password)
    }

    switch (body.method) {
        case "local":
            break
        case "tui":
            token = await loginTui(body.username, body.password)
            break
    }

    if (!token) {
        return {
            status: 401
        }
    }

    return {
        status: 201,
        body: token.token
    }
}
