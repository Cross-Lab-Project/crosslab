/*
bundlePolicy: "max-compat", // transport every stream over a seperate connection if necessary
      //certificates: ,// enable certificates for faster (re-)connection time
      //iceCandidatePoolSize: , //can make the negotion faster
      iceServers: [], // STUN/TURN - Server
      iceTransportPolicy: "all", // We can also connect local und using relay servers
      //peerIdentity: , // target peer identity / security consideration
      rtcpMuxPolicy: "require",
*/

import { TypedEmitter } from "tiny-typed-emitter";

import { PeerConnection, PeerConnectionEvents, ServiceConfig } from "./connection";
import { assert } from "../utils";
import { SignalingMessage } from "../deviceMessages";
import { Channel, MediaChannel } from "./channel";
import * as sdpTransform from "sdp-transform";

const log = console;
log.trace = log.debug;

interface RTCSignalingCandidateMessage extends SignalingMessage {
  signalingType: "candidate";
  content: RTCIceCandidate;
}

interface RTCSignalingOfferMessage extends SignalingMessage {
  signalingType: "offer";
  content: RTCSessionDescriptionInit;
}

interface RTCSignalingAnswerMessage extends SignalingMessage {
  signalingType: "answer";
  content: RTCSessionDescriptionInit;
}

export type RTCSignalingMessage =
  | RTCSignalingCandidateMessage
  | RTCSignalingOfferMessage
  | RTCSignalingAnswerMessage;

enum WebRTCRole {
  Callee,
  Caller,
}

enum ConnectionState {
  Unitintialized,
  Calling,
  WaitingForCall,
  WaitingForAnswer,
  ICE,
}

export class WebRTCPeerConnection
  extends TypedEmitter<PeerConnectionEvents>
  implements PeerConnection
{
  private signalingQueue: Array<RTCSignalingMessage> = [];
  private candidateQueue: Array<RTCIceCandidate> = [];
  private isProcessing = true; //dont do anything until connect is called
  private role?: WebRTCRole;
  private state: ConnectionState = ConnectionState.Unitintialized;
  private receivingChannels = new Map<string, Channel>();
  private transeiverMap = new Map<RTCRtpTransceiver, string>();
  private mediaChannelMap = new Map<string, MediaChannel>();
  tiebreaker!: boolean;
  pc: RTCPeerConnection;

  private onnegotiationneeded() {
    if (this.state !== ConnectionState.Calling) {
      log.error("onnegotiationneeded fired but state is not Calling", { state: this.state });
    }
  }

  private onicecandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      this.sendIceCandidate(event.candidate);
    }
  }

  constructor(configuration: RTCConfiguration) {
    super();

    this.pc = new RTCPeerConnection(configuration);
    this.pc.onicecandidate = (event) => this.onicecandidate(event);
    this.pc.onnegotiationneeded = () => this.onnegotiationneeded;
    this.pc.ondatachannel = (event) => {
      console.log(event);
      const channel = this.receivingChannels.get(event.channel.label);

      if (channel !== undefined && channel.channel_type === "DataChannel") {
        channel.send = event.channel.send.bind(event.channel);
        event.channel.onmessage = (message) => {
          if (channel.ondata) channel.ondata(message.data);
        };
        event.channel.onopen = () => {
          channel._setReady();
        };
        try {
          if (event.channel.readyState === "open") channel._setReady();
        } catch (e) {}
      }
    };

    this.pc.onconnectionstatechange = () => {
      log.debug("WebRTCPeerConnection connectionStateChanged", { state: this.pc.connectionState });
    };
  }

  transmit(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
    log.trace("WebRTCPeerConnection.tranceive called", { serviceConfig, id, channel });
    const label = this.create_label(serviceConfig, id);
    if (channel.channel_type === "DataChannel") {
      const webrtcChannel = this.pc.createDataChannel(label);
      channel.send = webrtcChannel.send.bind(webrtcChannel);
      //webrtcChannel.onopen=()=>channel._setReady;
      webrtcChannel.onopen = () => {
        channel._setReady();
      };
      try {
        if (webrtcChannel.readyState === "open") channel._setReady();
      } catch (e) {}
      webrtcChannel.onmessage = (event) => {
        if (channel.ondata) channel.ondata(event.data);
      };
    } else if (channel.channel_type === "MediaChannel") {
      log.trace("WebRTCPeerConnection.tranceive save channel for later consumption", {
        channel,
        label,
      });
      this.mediaChannelMap.set(label, channel);
    } else {
      assert(false); // unreachable
    }
  }

  receive(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
    log.trace("WebRTCPeerConnection.receive called", { serviceConfig, id, channel });
    const label = this.create_label(serviceConfig, id);
    this.receivingChannels.set(label, channel);
    if (channel.channel_type === "MediaChannel") {
      log.trace("WebRTCPeerConnection.receive save channel for later consumption", {
        channel,
        label,
      });
      this.mediaChannelMap.set(label, channel);
    }
  }

  async handleSignalingMessage(msg: SignalingMessage) {
    this.signalingQueue.push(msg as RTCSignalingMessage);
    this.executeQueue();
  }

  private async executeQueue() {
    if (!this.isProcessing) {
      this.isProcessing = true;
      while (true) {
        const message = this.signalingQueue.shift();
        if (!message) break;
        switch (message.signalingType) {
          case "candidate":
            this.handleIceCandidate(message);
            break;
          case "offer":
            await this.handleOffer(message);
            break;
          case "answer":
            await this.handleAnswer(message);
            break;
        }
      }
      this.isProcessing = false;
    }
  }

  // Received Signaling and Control handling *************************************************************************
  async connect() {
    assert(this.state === ConnectionState.Unitintialized);
    this.isProcessing = false;
    this.role = this.tiebreaker ? WebRTCRole.Caller : WebRTCRole.Callee;
    if (this.role === WebRTCRole.Caller) {
      this.createMediaChannels();
      this.state = ConnectionState.Calling;
      await this.makeOffer();
      this.state = ConnectionState.WaitingForAnswer;
      return;
    } else if (this.role === WebRTCRole.Callee) {
      this.state = ConnectionState.WaitingForCall;
      return;
    } else {
      assert(false); // unreachable
    }
  }

  private async handleOffer(msg: RTCSignalingOfferMessage) {
    //assert(this.state === ConnectionState.WaitingForCall);
    await this.makeAnswer(msg.content);
    this.state = ConnectionState.ICE;
    await this.sendIceCandidate();
  }

  private async handleAnswer(msg: RTCSignalingAnswerMessage) {
    //assert(this.state === ConnectionState.WaitingForAnswer);
    await this.acceptAnswer(msg.content);
    this.state = ConnectionState.ICE;
    await this.sendIceCandidate();
  }

  private async handleIceCandidate(msg: RTCSignalingCandidateMessage) {
    //assert(this.state === ConnectionState.ICE);
    if (msg.content !== null) {
      await this.addIceCandidate(msg.content);
    }
  }

  teardown(): void {
    throw new Error("Method not implemented.");
  }

  // WebRTC and Signaling Actions ************************************************************************************

  private async makeOffer() {
    log.trace("WebRTCPeerConnection.makeOffer called");
    let offer = await this.pc.createOffer();
    log.trace("WebRTCPeerConnection.makeAnswer created offer", { offer });
    await this.pc.setLocalDescription(offer);
    await new Promise<void>((resolve) => {
      if (this.pc.iceGatheringState === "complete") {
        resolve();
      } else {
        this.pc.onicegatheringstatechange = () => {
          if (this.pc.iceGatheringState === "complete") {
            resolve();
          }
        };
      }
    });
    const _offer = this.pc.localDescription;
    if (!_offer) {
      throw new Error("WebRTCPeerConnection.makeOffer failed to create offer");
    }
    offer=_offer;
    offer = { type: offer.type, sdp: this.modifySDP(offer.sdp!) }; // TODO: Check if sdp is really optional
    log.trace("WebRTCPeerConnection.makeAnswer updated offer", { offer });
    this.emit("signalingMessage", <RTCSignalingOfferMessage>{
      signalingType: "offer",
      content: offer,
    });
  }

  private async makeAnswer(offer: RTCSessionDescriptionInit) {
    log.trace("WebRTCPeerConnection.makeAnswer called", { offer });
    await this.pc.setRemoteDescription(offer);
    this.matchMediaChannels();
    let answer = await this.pc.createAnswer();
    log.trace("WebRTCPeerConnection.makeAnswer created answer", { answer });
    await this.pc.setLocalDescription(answer); // TODO: gst-webrtc seems to not resolve the promise correctly.
    await new Promise<void>((resolve) => {
      if (this.pc.iceGatheringState === "complete") {
        resolve();
      } else {
        this.pc.onicegatheringstatechange = () => {
          if (this.pc.iceGatheringState === "complete") {
            resolve();
          }
        };
      }
    });
    const _answer = this.pc.localDescription;
    if (!_answer) {
      throw new Error("WebRTCPeerConnection.makeAnswer failed to create answer");
    }
    answer=_answer;
    log.trace("WebRTCPeerConnection.makeAnswer updated answer", { answer });
    answer = { type: answer.type, sdp: this.modifySDP(answer.sdp!) }; // TODO: Check if sdp is really optional
    this.emit("signalingMessage", <RTCSignalingAnswerMessage>{
      signalingType: "answer",
      content: answer,
    });
  }

  private async acceptAnswer(answer: RTCSessionDescriptionInit) {
    await this.pc.setRemoteDescription(answer);
  }

  private async addIceCandidate(candidate: RTCIceCandidate) {
    this.pc.addIceCandidate(candidate);
  }

  private async sendIceCandidate(candidate?: RTCIceCandidate) {
    if (candidate !== undefined) this.candidateQueue.push(candidate);
    if (this.state === ConnectionState.ICE) {
      for (const candidate of this.candidateQueue) {
        this.emit("signalingMessage", <RTCSignalingCandidateMessage>{
          signalingType: "candidate",
          content: candidate,
        });
      }
      this.candidateQueue = [];
    }
  }

  // Helper functions *************************************************************************************************

  private create_label(
    serviceConfig: { serviceType: string; serviceId: string; remoteServiceId: string },
    id: string
  ) {
    const id1 = this.tiebreaker ? serviceConfig.serviceId : serviceConfig.remoteServiceId;
    const id2 = this.tiebreaker ? serviceConfig.remoteServiceId : serviceConfig.serviceId;
    const label = JSON.stringify([serviceConfig.serviceType, id1, id2, id]);
    return label;
  }

  private modifySDP(sdpString: string): string {
    log.trace("WebRTCPeerConnection.modifySDP called", { sdpString });
    const sdp = sdpTransform.parse(sdpString);
    log.trace("WebRTCPeerConnection.modifySDP parsed SDP", { sdp });

    // Update the "a=msid" attribute from the video stream with the right label from the transeiverMap.
    for (const transeiver of this.transeiverMap.keys()) {
      const label = this.transeiverMap.get(transeiver);
      log.trace("WebRTCPeerConnection.modifySDP setTrack id for transeiver", {
        transeiver,
        mid: transeiver.mid,
        label,
      });
      const media = sdp.media.find((m) => m.mid == transeiver.mid);
      if (media) {
        if (!media.msid) {
          log.error("WebRTCPeerConnection.modifySDP no msid found for transeiver", { transeiver });
        } else {
          media.msid = media.msid.split(" ")[0] + " " + label;
        }
      } else {
        log.error("WebRTCPeerConnection.modifySDP no media found for transeiver", { transeiver });
      }
    }

    log.trace("WebRTCPeerConnection.modifySDP modified SDP:", { sdp });
    sdpString = sdpTransform.write(sdp);
    log.trace("WebRTCPeerConnection.modifySDP returns", { sdpString });
    return sdpString;
  }

  private matchMediaChannels() {
    log.trace("WebRTCPeerConnection.matchMediaChannels called");
    const transceivers = (this.pc as any).getTransceivers() as RTCRtpTransceiver[];
    log.trace("WebRTCPeerConnection.matchMediaChannels transeivers", { transceivers });
    for (const transceiver of transceivers) {
      const label = transceiver.receiver.track.label;
      log.trace("WebRTCPeerConnection.matchMediaChannels matching tramceiver", {
        transceiver,
        label,
      });
      const channel = this.mediaChannelMap.get(label);
      if (channel === undefined) {
        log.trace("WebRTCPeerConnection.matchMediaChannels no channel found for label", { label });
        continue;
      }

      let direction: RTCRtpTransceiverDirection = "inactive";

      if (channel.track) {
        direction = "sendonly";
        log.trace("WebRTCPeerConnection.matchMediaChannels replace track");
        transceiver.sender.replaceTrack(channel.track as MediaStreamTrack);
      }

      if (channel.ontrack) {
        direction = direction === "sendonly" ? "sendrecv" : "recvonly";
        log.trace("WebRTCPeerConnection.matchMediaChannels call event listener for new track");
        channel.ontrack({ track: transceiver.receiver.track });
      }

      log.trace(`WebRTCPeerConnection.matchMediaChannels set transeiver to ${direction} `);
      transceiver.direction = direction;
    }
  }

  private createMediaChannels() {
    log.trace("WebRTCPeerConnection.createMediaChannels called");
    for (const label of this.mediaChannelMap.keys()) {
      const channel = this.mediaChannelMap.get(label);
      if (channel === undefined) {
        log.error("WebRTCPeerConnection.createMediaChannels no media channel found for label", {
          label,
        });
        continue;
      }
      const rtpTranseiver: RTCRtpTransceiver = (this.pc as any).addTransceiver(
        channel.track ? channel.track : "video",
        { direction: "sendrecv" }
      );
      this.transeiverMap.set(rtpTranseiver, label);
      if (channel.ontrack) {
        channel.ontrack({ track: rtpTranseiver.receiver.track });
      }
    }
  }
}
