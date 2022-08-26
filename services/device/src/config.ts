import { exit } from "process"

function die(reason: string): string {
    console.error(reason)
    exit(1)
}

const PORT = parseInt(process.env.PORT ?? "3001")
const DEFAULT_BASE_URL = "http://localhost:" + PORT

export const config = {
    PORT: PORT,
    NODE_ENV: process.env.NODE_ENV ?? "development",
    BASE_URL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
    BASE_URL_AUTH: process.env.BASE_URL_AUTH ?? (process.env.BASE_URL ?? DEFAULT_BASE_URL),
    BASE_URL_BOOKING: process.env.BASE_URL_BOOKING ?? (process.env.BASE_URL ?? DEFAULT_BASE_URL),
    BASE_URL_EXPERIMENT: process.env.BASE_URL_EXPERIMENT ?? (process.env.BASE_URL ?? DEFAULT_BASE_URL),
    BASE_URL_FEDERATION: process.env.BASE_URL_FEDERATION ?? (process.env.BASE_URL ?? DEFAULT_BASE_URL),
    BASE_URL_UPDATE: process.env.BASE_URL_UPDATE ?? (process.env.BASE_URL ?? DEFAULT_BASE_URL),
    SECURITY_ISSUER: process.env.SECURITY_ISSUER ?? die("the environment variable SECURITY_ISSUER is not defined!"),
    SECURITY_AUDIENCE: process.env.SECURITY_AUDIENCE ?? die("the environment variable SECURITY_AUDIENCE is not defined!")
}