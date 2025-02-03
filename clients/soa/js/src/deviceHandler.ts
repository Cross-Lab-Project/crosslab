import { TypedEmitter } from 'tiny-typed-emitter';

import { CrosslabConnectionTransport, DeviceConnectionTransport } from './deviceConnectionTransport.js';
import {
  ClosePeerConnectionMessage,
  ConfigurationMessage,
  ConnectionStateChangedMessage,
  CreatePeerConnectionMessage,
  ExperimentStatusChangedMessage,
  isClosePeerConnectionMessage,
  isCommandMessage,
  isConfigurationMessage,
  isCreatePeerConnectionMessage,
  isExperimentStatusChangedMessage,
  isSignalingMessage,
  SignalingMessage
} from './deviceMessages.js';
import { crosslabTransport, logger } from './logging.js';
import { PeerConnection } from './peer/connection.js';
import { WebRTCPeerConnection } from './peer/webrtc-connection.js';
import { Service } from './service.js';

export interface DeviceHandlerEvents {
  connectionsChanged(): void;
  configuration(configuration: { [k: string]: unknown }): void;
  experimentStatusChanged(status: {
    status: 'created' | 'booked' | 'setup' | 'running' | 'failed' | 'closed';
    message?: string;
  }): void;
}

//type Service1 = Service<"type1", "id1", Record<string, any>>
//type Service2 = Service<"type2", "id2", { "gpio1": boolean, "gpio2": boolean }>

//type ServiceT = Service1 | Service2
type FullStateType<ServiceT extends Service> = {
  [serviceId in ServiceT['serviceId']]: Extract<ServiceT, { serviceId: serviceId }>['get_state'] extends () => infer R ? R : never;
}

export class DeviceHandler<ServiceT extends Service> extends TypedEmitter<DeviceHandlerEvents> {
  id: string;
  connections = new Map<string, PeerConnection>();
  services: { [serviceId in ServiceT['serviceId']]: Extract<ServiceT, { serviceId: serviceId }> } = {} as any;
  transport?: DeviceConnectionTransport;
  connectionConstuctors = new Map<string, ((message: CreatePeerConnectionMessage)=>PeerConnection)>
  fullstatemap = new Map<string, any[]>
  stateEvaluator?: (input: FullStateType<ServiceT>, output: FullStateType<ServiceT>) => boolean;

  evaluateState(input: any[], output: any){
    const some=input.some(i=>this.stateEvaluator?.(i,output))
    const every=input.every(i=>this.stateEvaluator?.(i,output))
    if(some){
      console.log("Error Detected!")
      if (every){
        console.log("User Error!")
      }
    }else{
      console.log("No Error Detected!")
    }
  }

  handleDataUpstream(data: any) {
    //let state = Object.values<ServiceT>(this.services).map(service => service.get_state());
    let state = {} as any
    for(const serviceId in this.services){
      state[serviceId] = this.services[serviceId as keyof typeof this.services].get_state()
    }
    
    let fullstate={} as any
    for(const fstate of this.fullstatemap.values()){
      for(const id in fstate){
        fullstate[id]=[...fullstate[id]??[], ...fstate[id]]
      }
    }
    this.evaluateState(fullstate[this.id]??[], state);
    fullstate[this.id]=[state];
    
    return {fullstate: {[this.id]: fullstate}, data};
  };

  handleDataDownstream(data: any) {
    if ("fullstate" in data){
      for (const device in data["fullstate"]){
        this.fullstatemap.set(device, data["fullstate"][device])
      }
      return data["data"]
    }
    return data;
  };

  constructor(...services: ServiceT[]) {
    super()
    this.id = crypto.randomUUID()
    for (const service of services) {
      this.addService(service)
    }
    this.connectionConstuctors.set("", ()=>(
      new WebRTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.goldi-labs.de:3478' },
          { urls: 'turn:turn.goldi-labs.de:3478', username: 'goldi', credential: 'goldi' },
        ],
      })))
  }

  setErrorState(stateEvaluator: (input: FullStateType<ServiceT>, output: FullStateType<ServiceT>) => boolean): void {
    this.stateEvaluator=stateEvaluator
  }

  async connect(transport: DeviceConnectionTransport): Promise<void>
  async connect(connectOptions: { endpoint: string; id: string; token: string }): Promise<void>
  async connect(transportOrconnectOptions: DeviceConnectionTransport | { endpoint: string; id: string; token: string }) {
    let transport: DeviceConnectionTransport
    if ('connect' in transportOrconnectOptions) {
      transport = transportOrconnectOptions;
    } else {
      transport = new CrosslabConnectionTransport(transportOrconnectOptions);
    }
    return this._connect(transport)
  }

  private async _connect(transport: DeviceConnectionTransport) {
    this.transport=transport
    this.transport.connect(crosslabTransport)
    this.transport.on("message", message=>{
      if (isCommandMessage(message)) {
        if (isCreatePeerConnectionMessage(message)) {
          this.handleCreatePeerConnectionMessage(message);
        } else if (isClosePeerConnectionMessage(message)) {
          this.handleClosePeerConnectionMessage(message);
        }
      }
      if (isSignalingMessage(message)) {
        this.handleSignalingMessage(message);
      }
      if (isConfigurationMessage(message)) {
        this.handleConfigurationMessage(message);
      }
      if (isExperimentStatusChangedMessage(message)) {
        this.handleExperimentStatusChangedMessage(message);
      }
    })
  }

  addService(service: ServiceT) {
    this.services[service.serviceId as ServiceT['serviceId']] = service as any;
  }

  private handleCreatePeerConnectionMessage(message: CreatePeerConnectionMessage) {
    if (this.connections.has(message.connectionUrl)) {
      throw Error('Can not create a connection. Connection Id is already present');
    }
    logger.log('info', 'creating connection', message);
    const connectionConstuctor=this.connectionConstuctors.get(message.connectiontype)
    if (connectionConstuctor === undefined){
      throw Error("No Connection Constructor for "+message.connectiontype+" available.")
    }
    const connection=connectionConstuctor(message)
    connection.tiebreaker = message.tiebreaker;
    connection.channelExtension = {upstream: (data)=>this.handleDataUpstream(data), downstream: (data)=>this.handleDataDownstream(data)}
    this.connections.set(message.connectionUrl, connection);
    for (const serviceConfig of message.services) {
      const service = this.services[serviceConfig.serviceId as ServiceT['serviceId']];
      if (service === undefined) {
        throw Error('No Service for the service config was found');
      }
      service.setupConnection(connection, serviceConfig);
    }
    connection.on('signalingMessage', msg => {
      logger.log('info', 'sending:', msg);
      this.transport?.send(
        JSON.stringify({
          ...msg,
          messageType: 'signaling',
          connectionUrl: message.connectionUrl,
        }),
      );
    });
    connection.on('connectionChanged', () => {
      const connectionStateChangedMessage: ConnectionStateChangedMessage = {
        messageType: 'connection-state-changed',
        status: connection.state,
        connectionUrl: message.connectionUrl,
      };
      this.transport?.send(JSON.stringify(connectionStateChangedMessage));
      this.emit('connectionsChanged');
    });
    connection.connect();
    this.emit('connectionsChanged');
  }

  private handleSignalingMessage(message: SignalingMessage) {
    const connection = this.connections.get(message.connectionUrl);
    if (connection === undefined) {
      throw Error('No Connection for the signaling message was found');
    }
    connection.handleSignalingMessage(message);
  }

  private handleClosePeerConnectionMessage(message: ClosePeerConnectionMessage) {
    const connection = this.connections.get(message.connectionUrl);
    if (!connection) {
      throw Error('Cannot close a connection. Connection Id is not present');
    }
    logger.log('info', 'closing connection', message);
    connection.teardown();
    this.connections.delete(message.connectionUrl);
  }

  private handleConfigurationMessage(message: ConfigurationMessage) {
    this.emit('configuration', message.configuration);
  }

  private handleExperimentStatusChangedMessage(message: ExperimentStatusChangedMessage) {
    this.emit('experimentStatusChanged', {
      status: message.status,
      message: message.message,
    });
  }

  getServiceMeta() {
    return Object.values<ServiceT>(this.services).map(service => service.getMeta());
  }
}
