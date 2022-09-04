import express from "express"
import { Server } from "http"
import { config } from "./config.js"
import cors from "cors"

const app = express()

app.use(cors())

app.all("/", (req, res) => {
    res.status(200).send(req.method)
})

let server: Server

export function startTestServer(): Promise<void> {
    return new Promise((resolve) => {
        server = app.listen(config.PORT, resolve)
    })
}

export function stopTestServer() {
    if (server) {
        server.close()
        server.unref()
    }
}