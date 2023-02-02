import {
  isCommandMessage,
  isCreatePeerConnectionMessage,
  CreatePeerConnectionMessage,
  isSignalingMessage,
  SignalingMessage,
} from "./deviceMessages";
import { PeerConnection } from "./peer/connection";
import { Service } from "./service";
import { WebRTCPeerConnection } from "./peer/webrtc-connection";
import WebSocket from "isomorphic-ws";
import { TypedEmitter } from "tiny-typed-emitter";

export interface DeviceHandlerEvents {
  connectionsChanged(): void;
}

export class DeviceHandler extends TypedEmitter<DeviceHandlerEvents> {
  ws!: WebSocket;
  connections = new Map<string, PeerConnection>();
  services = new Map<string, Service>();

  async connect(connectOptions: { endpoint: string; id: string; token: string }) {
    this.ws = new WebSocket(connectOptions.endpoint);
    const p = new Promise<void>((resolve) => {
      this.ws.onopen = () => {
        resolve();
        this.ws.send(
          JSON.stringify({
            messageType: "authenticate",
            deviceUrl: connectOptions.id,
            token: connectOptions.token,
          })
        );
      };
    });

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data as string);

      if (isCommandMessage(message)) {
        if (isCreatePeerConnectionMessage(message)) {
          this.handleCreatePeerConnectionMessage(message);
        }
      }
      if (isSignalingMessage(message)) {
        this.handleSignalingMessage(message);
      }
    };

    this.ws.onclose = (event) => {
      console.log("ws closed", event);
    };

    this.ws.onerror = (event) => {
      console.log("ws error", event);
    };

    await p;
  }

  addService(service: Service) {
    this.services.set(service.serviceId, service);
  }

  private handleCreatePeerConnectionMessage(message: CreatePeerConnectionMessage) {
    if (this.connections.has(message.connectionUrl)) {
      throw Error("Can not create a connection. Connection Id is already present");
    }
    const connection = new WebRTCPeerConnection({iceServers: [{urls: "stun:stun.goldi-labs.de:3478"},{urls:"turn:turn.goldi-labs.de:3478", username:"goldi", credential:"goldi"}]});
    connection.tiebreaker = message.tiebreaker;
    this.connections.set(message.connectionUrl, connection);
    for (const serviceConfig of message.services) {
      const service = this.services.get(serviceConfig.serviceId);
      if (service === undefined) {
        throw Error("No Service for the service config was found");
      }
      service.setupConnection(connection, serviceConfig);
    }
    connection.on("signalingMessage", (msg) => {
      console.log("sending:", msg)
      this.ws.send(
        JSON.stringify(<SignalingMessage>{
          ...msg,
          messageType: "signaling",
          connectionUrl: message.connectionUrl,
        })
      );
    });
    connection.on("connectionChanged", () => {
      this.emit("connectionsChanged");
    });
    connection.connect();
    this.emit("connectionsChanged");
  }

  private handleSignalingMessage(message: SignalingMessage) {
    const connection = this.connections.get(message.connectionUrl);
    if (connection === undefined) {
      throw Error("No Connection for the signaling message was found");
    }
    connection.handleSignalingMessage(message);
  }

  getServiceMeta() {
    return Array.from(this.services).map((service) => service[1].getMeta());
  }
}
