import WebSocket from 'isomorphic-ws';
import { TypedEmitter } from 'tiny-typed-emitter';
import { CrosslabTransport, logger } from "./logging.js";

export interface DeviceConnectionTransportEvents {
    message(data: any): void;
}

export interface DeviceConnectionTransport extends TypedEmitter<DeviceConnectionTransportEvents>{
    connect(logginTransport: CrosslabTransport): Promise<void>;
    send(data: any): void;
}

export class CrosslabConnectionTransport extends TypedEmitter<DeviceConnectionTransportEvents> implements DeviceConnectionTransport{
    options: { endpoint: string; id: string; token: string; };
    _ws?: WebSocket;

    get ws(){
        if (this._ws){
            return this._ws
        }else{
            throw new Error("CrosslabConnectionTransport must be called with connect() first")
        }
    }

    constructor(connectOptions: { endpoint: string; id: string; token: string} ){
        super()
        this.options = connectOptions
    }

    async connect(logginTransport: CrosslabTransport){
        this._ws = new WebSocket(this.options.endpoint);
        
        this.ws.onopen = () => {
            this.ws.send(
                JSON.stringify({
                    messageType: 'authenticate',
                    deviceUrl: this.options.id,
                    token: this.options.token,
                }),
            );
            logginTransport._set_upstream(info => this.ws.send(JSON.stringify({ messageType: 'logging', content: info })));
        };

    
        const p = new Promise<void>((resolve, reject) => {
        this.ws.onmessage = authenticationEvent => {
            const authenticationMessage = JSON.parse(authenticationEvent.data as string);
            if (authenticationMessage.messageType === 'authenticate') {
                if (authenticationMessage.authenticated) {
                    resolve();
                } else reject('Authentication failed');
            } else {
                reject(
                    `Expected message with messageType 'authenticate', received ${authenticationMessage.messageType}`,
                );
            }
          };
        });
    
        this.ws.onclose = event => {
            logger.log('info', 'ws closed', { reason: event.reason, code: event.code });
        };
    
        this.ws.onerror = event => {
          logger.log('error', event.message, { type: event.type, error: event.error });
        };
        
        await p;
        
        this.ws.onmessage = event => {
            const message = JSON.parse(event.data as string);
            this.emit("message", message)
        };
    }

    send(data: any): void {
        this.ws.send(data)
    }
};
