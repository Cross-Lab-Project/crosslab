import { PeerConnection } from "@cross-lab-project/soa-client";
import { TypedEmitter } from "tiny-typed-emitter";
import { CreatePeerConnectionMessage, SignalingMessage } from "../../soa/js/lib/types/deviceMessages.js";
import { Channel } from "../../soa/js/lib/types/peer/channel.js";
import { PeerConnectionEvents, ServiceConfig } from "../../soa/js/lib/types/peer/connection.js";

const channels = new Map<string, ((data: any) => void)>

export class LocalConnection extends TypedEmitter<PeerConnectionEvents> implements PeerConnection{
    channelExtension: { upstream: ((data: any) => any); downstream: ((data: any) => any); } | undefined;
    state: "new" | "connecting" | "connected" | "disconnected" | "failed" | "closed";
    tiebreaker: boolean;
    id: string;

    constructor(message: CreatePeerConnectionMessage){
        super()
        this.state="new"
        this.tiebreaker = message.tiebreaker
        this.id = message.connectionUrl
    }

    transmit(serviceConfig: ServiceConfig, _id: string, channel: Channel){
        if (channel.channel_type === 'DataChannel'){
            const id = this.id + "#" + this.tiebreaker + "#" + serviceConfig.serviceId
            const rid = this.id + "#" + !this.tiebreaker + "#" + serviceConfig.remoteServiceId
            channels.set(id, (data)=>{
                if(this.channelExtension) data=this.channelExtension.downstream(data)
                channel.ondata?.(data)
            });
            channel.send=(data)=>{
                if(this.channelExtension) data=this.channelExtension.upstream(data)
                setTimeout(()=>channels.get(rid)?.(data),223)
            }
            channel._setReady();
        }
    }

    receive(serviceConfig: ServiceConfig, id: string, channel: Channel){
        this.transmit(serviceConfig, id, channel)
    }
  
    async handleSignalingMessage(_msg: SignalingMessage){

    }
    async connect(){
        this.state = "connected"
    }
    teardown(){

    }
}