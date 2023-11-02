import json
from enum import Enum
from typing import Any, Dict, List, Literal, cast

from aiortc import (  # type: ignore
    RTCConfiguration,
    RTCPeerConnection,
    RTCSessionDescription,
)
from aiortc.events import RTCTrackEvent  # type: ignore
from aiortc.rtcrtpsender import RTCRtpSender  # type: ignore
from aiortc.sdp import SessionDescription  # type: ignore
from pyee.asyncio import AsyncIOEventEmitter  # type: ignore

from crosslab.soa_client.connection import (
    Channel,
    Connection,
    DataChannel,
    MediaChannel,
)
from crosslab.soa_client.messages import ServiceConfig, SignalingMessage


class WebRTCRole(Enum):
    Caller = "Caller"
    Callee = "Callee"


class WebRTCPeerConnection(AsyncIOEventEmitter, Connection):
    _receivingChannelMap: Dict[str, Channel]
    _mediaChannelMap: Dict[str, MediaChannel]
    _transeiverMap: Dict[Any, str]
    _dataChannels: List[DataChannel]

    def __init__(self):
        AsyncIOEventEmitter.__init__(self)
        Connection.__init__(self)
        config = RTCConfiguration(
            []
            # [
            #    RTCIceServer(urls="stun:stun.goldi-labs.de:3478"),
            #    RTCIceServer(
            #        urls="turn:turn.goldi-labs.de:3478",
            #        username="goldi",
            #        credential="goldi",
            #    ),
            # ]
        )  # // see issue #5
        self.pc = RTCPeerConnection(configuration=config)

        async def connectionstatechanged():
            if not self.pc:
                return  # Fix: Do not access self.pc after close
            print(
                "connectionstatechanged",
                self.pc.connectionState,
                self.pc.iceConnectionState,
                self.pc.signalingState,
            )
            if self.state != self.pc.connectionState:
                self.state = self.pc.connectionState
                self.emit("connectionChanged")

        async def datachannel(datachannel):
            channel = self._receivingChannelMap[datachannel.label]
            if channel.channel_type == "DataChannel":
                dchannel = cast(DataChannel, channel)

                async def upstreamData(data):
                    datachannel.send(data)
                    await datachannel._RTCDataChannel__transport._data_channel_flush()  # type: ignore
                    await datachannel._RTCDataChannel__transport._transmit()  # type: ignore

                def message(data):
                    dchannel.downstreamData(data)

                dchannel.on("upstreamData", upstreamData)
                datachannel.on("message", message)
                await dchannel.opened()
            else:
                raise Exception("Don't expect media channel here")

        self.pc.on("datachannel", datachannel)
        self.pc.on("connectionstatechange", connectionstatechanged)
        self.pc.on("iceconnectionstatechange", connectionstatechanged)
        self.pc.on("signalingstatechange", connectionstatechanged)
        self.pc.on("track", self._on_track)

        self._receivingChannelMap = dict()
        self._mediaChannelMap = dict()
        self._transeiverMap = dict()
        self._dataChannels = list()

    async def _on_track(self, track: RTCTrackEvent):
        transeiver = track.transceiver
        label = transeiver.receiver.track.id
        channel = self._mediaChannelMap.get(label)
        assert channel is not None  # TODO: handle this
        channel.emit("track", transeiver.receiver.track)

    async def close(self):
        await self.pc.close()
        for channel in self._dataChannels:
            channel.close()
        if self.state != "closed":
            self.state = "closed"
            self.emit("connectionChanged")

        del self.pc

    def _create_label(self, serviceConfig: ServiceConfig, id: str):
        id1 = (
            serviceConfig["serviceId"]
            if self.tiebreaker
            else serviceConfig["remoteServiceId"]
        )
        id2 = (
            serviceConfig["remoteServiceId"]
            if self.tiebreaker
            else serviceConfig["serviceId"]
        )
        label = json.dumps(
            [serviceConfig["serviceType"], id1, id2, id], separators=(",", ":")
        )
        return label

    def transmit(
        self,
        serviceConfig: ServiceConfig,
        id: str,
        channel: Channel,
    ):
        label = self._create_label(serviceConfig, id)
        if channel.channel_type == "MediaChannel":
            self._mediaChannelMap[label] = cast(MediaChannel, channel)
        else:
            dchannel = cast(DataChannel, channel)
            self._dataChannels.append(dchannel)
            datachannel = self.pc.createDataChannel(label)

            async def upstreamData(data):
                try:
                    datachannel.send(data)
                    await datachannel._RTCDataChannel__transport._data_channel_flush()  # type: ignore
                    await datachannel._RTCDataChannel__transport._transmit()  # type: ignore
                except Exception:
                    pass

            def message(data):
                dchannel.downstreamData(data)

            datachannel.on("open", dchannel.opened)

            dchannel.on("upstreamData", upstreamData)
            datachannel.on("message", message)

    def receive(
        self,
        serviceConfig: ServiceConfig,
        id: str,
        channel: Channel,
    ):
        label = self._create_label(serviceConfig, id)
        self._receivingChannelMap[label] = channel
        if channel.channel_type == "MediaChannel":
            self._mediaChannelMap[label] = cast(MediaChannel, channel)
        else:
            self._dataChannels.append(cast(DataChannel, channel))

    async def connect(self):
        self.state = "connecting"
        self.role = WebRTCRole.Caller if self.tiebreaker else WebRTCRole.Callee
        if self.role == WebRTCRole.Caller:
            await self._createMediaChannels()
            await self._makeOffer()
        elif self.role == WebRTCRole.Callee:
            pass

    async def handleSignalingMessage(self, message: SignalingMessage):
        print("handleSignalingMessage")
        if message["signalingType"] == "answer":
            await self._handleAnswer(message)
        if message["signalingType"] == "offer":
            await self._handleOffer(message)
        if message["signalingType"] == "candidate":
            raise NotImplementedError()
            # await self._handleIceCandidate(message)

    async def _makeOffer(self):
        print("makeOffer")
        offer = await self.pc.createOffer()
        await self.pc.setLocalDescription(offer)
        offer = self.pc.localDescription
        self.emit(
            "signaling",
            {
                "signalingType": "offer",
                "content": {"type": offer.type, "sdp": self._modifySDP(offer.sdp)},
            },
        )

    async def _makeAnswer(self, offer):
        print("makeAnswer")
        await self.pc.setRemoteDescription(offer)
        self._matchMediaChannels()
        await self.pc.setRemoteDescription(offer)
        answer = await self.pc.createAnswer()
        assert answer is not None  # TODO: handle this
        await self.pc.setLocalDescription(answer)
        answer = self.pc.localDescription
        self.emit(
            "signaling",
            {
                "signalingType": "answer",
                "content": {"type": answer.type, "sdp": self._modifySDP(answer.sdp)},
            },
        )

    async def _acceptAnswer(self, answer: RTCSessionDescription):
        print("acceptAnswer")
        await self.pc.setRemoteDescription(answer)

    async def _handleOffer(self, message: SignalingMessage):
        print("handleOffer")
        offer = RTCSessionDescription(
            type=message["content"]["type"], sdp=message["content"]["sdp"]
        )
        await self._makeAnswer(offer)

    async def _handleAnswer(self, message: SignalingMessage):
        print("handleAnswer")
        answer = RTCSessionDescription(
            type=message["content"]["type"], sdp=message["content"]["sdp"]
        )
        await self._acceptAnswer(answer)

    async def _createMediaChannels(self):
        for label, channel in self._mediaChannelMap.items():
            rtpTranseiver = self.pc.addTransceiver(
                channel.track if channel.track else "video", direction="sendrecv"
            )
            if channel.track is not None:
                channel.track.stop()
            videoPreference = filter(
                lambda x: x.name == "H264", RTCRtpSender.getCapabilities("video").codecs
            )
            rtpTranseiver.setCodecPreferences(list(videoPreference))
            self._transeiverMap[rtpTranseiver] = label

    def _matchMediaChannels(self):
        transeivers = self.pc.getTransceivers()
        for transeiver in transeivers:
            label = transeiver.receiver.track.id
            self._transeiverMap[transeiver] = label
            channel = self._mediaChannelMap.get(label)
            assert channel is not None  # TODO: handle this
            direction: Literal[
                "inactive", "sendonly", "recvonly", "sendrecv"
            ] = "inactive"

            if channel.track:
                direction = "sendonly"
                transeiver.sender.replaceTrack(channel.track)
                videoPreference = filter(
                    lambda x: x.name == "H264",
                    RTCRtpSender.getCapabilities("video").codecs,
                )
                transeiver.setCodecPreferences(list(videoPreference))

            if channel.emit("track", transeiver.receiver.track):
                direction = "sendrecv" if direction == "sendonly" else "recvonly"

            transeiver.direction = direction

    def _modifySDP(self, sdp):
        sdp = SessionDescription.parse(sdp)
        for transeiver, label in self._transeiverMap.items():
            media = next(m for m in sdp.media if m.rtp.muxId == transeiver.mid)
            if media.msid is None:
                raise Exception("No msid found")
            media.msid = media.msid.split(" ")[0] + " " + label
        return str(sdp)
