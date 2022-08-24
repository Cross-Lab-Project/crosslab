import {
    postLoginSignature
} from "../generated/signatures/login"
import { loginTui } from "../methods/login"

export const postLogin: postLoginSignature = async (body) => {
    console.log(`postLogin called for ${body.username} using method ${body.method}`)
    let token

    switch (body.method) {
        case "local":
            break
        case "tui":
            try {
                token = await loginTui(body.username, body.password)
            } catch (err) {
                console.error(`postLogin failed for ${body.username} using method ${body.method}`)
                throw err
            }
            break
    }

    if (!token) {
        console.error(`postLogin failed for ${body.username} using method ${body.method}`)
        return {
            status: 401
        }
    }

    console.error(`postLogin succeeded for ${body.username} using method ${body.method}`)

    return {
        status: 201,
        body: token.token
    }
}
