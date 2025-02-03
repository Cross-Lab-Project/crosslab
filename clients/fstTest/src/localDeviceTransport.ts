import { Messages, ServiceConfiguration } from "@cross-lab-project/soa-client";
import { TypedEmitter } from "tiny-typed-emitter";
import { DeviceConnectionTransport, DeviceConnectionTransportEvents } from "../../soa/js/lib/types/deviceConnectionTransport.js";
import { CrosslabTransport } from "../../soa/js/lib/types/logging.js";

const devices = new Map<string, LocalDeviceTransport>

export class LocalDeviceTransport extends TypedEmitter<DeviceConnectionTransportEvents> implements DeviceConnectionTransport{
    id: string;
    constructor(id: string){
        super()
        this.id=id;
        devices.set(id, this)
    }

    async connect(_logginTransport: CrosslabTransport){
        
    }

    send(data: any): void {
        console.log(data)
    }
};

type ExperimentPlan = {
    [k: string]: ServiceConfiguration[]
}[]

export async function startExperiment(plan: ExperimentPlan){
    let id=0
    for (const connection of plan){
        const connectionUrl="local://"+id++

        let tiebreaker = false;
        for (const device in connection){
            const message: Messages.CreatePeerConnectionMessage = {
                messageType: "command",
                command: "createPeerConnection",
                connectionUrl,
                connectiontype: "local",
                services: connection[device],
                tiebreaker,
            }
            tiebreaker=!tiebreaker
            devices.get(device)?.emit("message", message)
        }
    }
}
