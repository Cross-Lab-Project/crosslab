import { TypedEmitter } from "tiny-typed-emitter";
import { SignalingMessage } from "../deviceMessages";
import { Channel } from "./channel";
import { PeerConnection, PeerConnectionEvents, ServiceConfig } from "./connection"

export class DummyPeerConnection
    extends TypedEmitter<PeerConnectionEvents>
    implements PeerConnection
{
    state: "connecting" | "connected" | "disconnected"="connecting";
    tiebreaker!: boolean;

    transmit(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
        console.log("transmit() called")
        console.log(serviceConfig)
        console.log(id)
        console.log(channel)
    }

    receive(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
        console.log("receive() called")
        console.log(serviceConfig)
        console.log(id)
        console.log(channel)
    }

    async handleSignalingMessage(msg: SignalingMessage): Promise<void> {
        console.log(`handleSignalingMessage() called`)
        console.log(msg)
    }

    async connect(): Promise<void> {
        console.log("connect() called")
        this.emit("signalingMessage", <any>{
            signalingType: "offer", 
            content: {
                message: "Dummy signaling message!"
            }
        })
        console.log("Sending dummy signaling message!")
    }

    teardown(): void {
        console.log("teardown() called")
    }
    
}