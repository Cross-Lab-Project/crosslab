import { exit } from "process"

function die(reason: string) : string{
    console.error(reason)
    exit(1)
}

export const config = {
    PORT: parseInt(process.env.PORT ?? "3000"),
    NODE_ENV: process.env.NODE_ENV ?? "development",
    //PASSWORD: process.env.PASSWORD ?? die("the environment variable PASSWORD is not define!"),
    SECURITY_ISSUER: process.env.SECURITY_ISSUER ?? die("the environment variable SECURITY_ISSUER is not define!"),
    SECURITY_AUDIENCE: process.env.SECURITY_AUDIENCE?? die("the environment variable SECURITY_AUDIENCE is not define!"),
}