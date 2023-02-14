import WebSocket from "ws"
import { AppDataSource } from "../data_source"
import { isMessage, isAuthenticationMessage, AuthenticationMessage } from "../generated/types"
import { sendChangedCallback } from "../methods/callbacks"
import { handleDeviceMessage } from "../methods/messageHandling"
import { ConcreteDeviceModel } from "../model"

export const connectedDevices = new Map<string, WebSocket>()

/**
 * This function adds the /devices/ws endpoint, including its functionality, to an express application.
 * @param app The express application to add the /devices/ws endpoint to.
 */
 export function deviceHandling(app: Express.Application) {
    // TODO: close Peerconnections that have device as participant when websocket connection is closed?
    app.ws('/devices/websocket', (ws) => {
        // authenticate and start heartbeat
        ws.once('message', async (data) => {
            // device authentication and connection
            const deviceRepository = AppDataSource.getRepository(ConcreteDeviceModel)
            const message = JSON.parse(data.toString('utf8'))
            if (!(isMessage(message) && isAuthenticationMessage(message))) {
                ws.close(1002, 'Received message is not an authentication message')
                return
            }
            if (!message.token) {
                ws.close(1002, 'Authentication message does not contain a valid websocket token')
            }
            const device = await deviceRepository.findOne({ where: { token: message.token } })
            if (!device) {
                ws.close(1002, 'No device found with matching websocket token')
                return
            }
            if (device.token != message.token) {
                ws.close(1002, 'Provided token does not match the token of the device')
                return
            }
            device.connected = true
            connectedDevices.set(device.uuid, ws)
            await deviceRepository.save(device)
            await sendChangedCallback(device)
            console.log(`device ${device.uuid} connected`)

            ws.send(
                JSON.stringify(<AuthenticationMessage>{
                    messageType: 'authenticate',
                    authenticated: true,
                })
            )

            // heartbeat implementation
            let isAlive = true
            ws.on('pong', () => {
                isAlive = true
            })
            const interval = setInterval(async function ping() {
                if (isAlive === false) {
                    device.connected = false
                    await deviceRepository.save(device)
                    await sendChangedCallback(device)
                    connectedDevices.delete(device.uuid)
                    clearInterval(interval)
                    return ws.terminate()
                }
                isAlive = false
                ws.ping()
            }, 30000)

            // close handler: stop heartbeat and disconnect device
            ws.on('close', async (code, reason) => {
                clearInterval(interval)
                connectedDevices.delete(device.uuid)

                if (code === 1002) {
                    console.error(`WebSocketConnctionError "${reason}"`)
                }
            })

            // message handler: handle incoming messages from devices
            ws.on('message', async (data) => {
                const message = JSON.parse(data.toString('utf8'))
                if (!isMessage(message)) {
                    ws.close(1002, 'Malformed Message')
                    return
                }
                handleDeviceMessage(device, message)
            })
        })
    })
}