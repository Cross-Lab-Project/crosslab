import { exit } from "process"

function die(reason: string): string{
    console.error(reason)
    exit(1)
}

const DEFAULT_BASE_URL = "http://localhost:3000"

function parseWhitelist(whitelist: string): string[] {
    return whitelist.replace(/\s+/g, '').split(",")
}

export const config = {
    PORT: parseInt(process.env.PORT ?? "3000"),
    NODE_ENV: process.env.NODE_ENV ?? "development",
    BASE_URL: process.env.BASE_URL ?? "http://localhost:3000",
    BASE_URL_BOOKING: process.env.BASE_URL_BOOKING ?? (process.env.BASE_URL ?? DEFAULT_BASE_URL),
    BASE_URL_DEVICE: process.env.BASE_URL_DEVICE ?? (process.env.BASE_URL ?? DEFAULT_BASE_URL),
    BASE_URL_EXPERIMENT: process.env.BASE_URL_FEDERATION ?? (process.env.BASE_URL ?? DEFAULT_BASE_URL),
    BASE_URL_FEDERATION: process.env.BASE_URL_FEDERATION ?? (process.env.BASE_URL ?? DEFAULT_BASE_URL),
    SECURITY_ISSUER: process.env.SECURITY_ISSUER ?? die("the environment variable SECURITY_ISSUER is not define!"),
    SECURITY_AUDIENCE: process.env.SECURITY_AUDIENCE ?? die("the environment variable SECURITY_AUDIENCE is not define!"),
    WHITELISTED: process.env.WHITELIST ? parseWhitelist(process.env.WHITELIST) : []
}