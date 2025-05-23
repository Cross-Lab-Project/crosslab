import json
import logging
from asyncio import Future, create_task, sleep
from enum import Enum
from typing import Any, Dict, List, Literal, Union, cast

from aiortc import RTCPeerConnection  # type: ignore
from aiortc import RTCConfiguration, RTCIceCandidate, RTCSessionDescription
from aiortc.rtcrtpsender import RTCRtpSender  # type: ignore
from aiortc.sdp import SessionDescription, candidate_from_sdp  # type: ignore
from crosslab.soa_client.connection import (Channel, Connection, DataChannel,
                                            MediaChannel)
from crosslab.soa_client.messages import ServiceConfig, SignalingMessage
from pyee.asyncio import AsyncIOEventEmitter  # type: ignore

logger = logging.getLogger(__name__)


class WebRTCRole(Enum):
    Caller = "Caller"
    Callee = "Callee"


class WebRTCPeerConnection(AsyncIOEventEmitter, Connection):
    _receivingChannelMap: Dict[str, Channel]
    _mediaChannelMap: Dict[str, MediaChannel]
    _transeiverMap: Dict[Any, str]
    _dataChannels: List[DataChannel]
    _receivedOptions: Future

    _trickleIce: bool
    'NOTE: currently not used, since "icecandidate"-event is not implemented in aiortc'

    def __init__(self, config: Union[RTCConfiguration, None] = None):
        AsyncIOEventEmitter.__init__(self)
        Connection.__init__(self)
        if config is None:
            config = RTCConfiguration([])
        self.pc = RTCPeerConnection(configuration=config)

        async def connectionstatechanged():
            if not self.pc:
                return  # Fix: Do not access self.pc after close
            logger.info(
                "connectionstatechanged %s %s %s",
                self.pc.connectionState,
                self.pc.iceConnectionState,
                self.pc.signalingState,
            )
            if self.state != self.pc.connectionState:
                # the following assignment is str to typed literal
                # but str is garantueed to only use the specified values
                self.state = self.pc.connectionState  # type: ignore
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
        self._receivedOptions = Future()

        async def optionsTimeout():
            await sleep(2)
            if not self._receivedOptions.done():
                self._receivedOptions.set_result(None)

        create_task(optionsTimeout())

    async def _on_track(self, track):
        label = track.id
        channel = self._mediaChannelMap.get(label)
        assert channel is not None  # TODO: handle this
        channel.emit("track", track)

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
                except Exception as e:
                    logger.error(e)
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
        self.emit(
            "signaling",
            {
                "signalingType": "options",
                "content": {"canTrickle": True},
            },
        )
        await self._receivedOptions
        self.role = WebRTCRole.Caller if self.tiebreaker else WebRTCRole.Callee
        if self.role == WebRTCRole.Caller:
            await self._createMediaChannels()
            await self._makeOffer()
        elif self.role == WebRTCRole.Callee:
            pass

    async def handleSignalingMessage(self, message: SignalingMessage):
        logger.debug("handleSignalingMessage")
        if message["signalingType"] == "answer":
            await self._handleAnswer(message)
        if message["signalingType"] == "offer":
            await self._handleOffer(message)
        if message["signalingType"] == "candidate":
            await self._handleIceCandidate(message)
        if message["signalingType"] == "options":
            await self._handleOptions(message)

    async def _makeOffer(self):
        logger.debug("makeOffer")
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
        logger.debug("makeAnswer")
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
        logger.debug("acceptAnswer")
        await self.pc.setRemoteDescription(answer)

    async def _acceptIceCandiate(self, iceCanditate: RTCIceCandidate):
        logger.debug("acceptIceCandidate")
        await self.pc.addIceCandidate(iceCanditate)

    async def _handleOffer(self, message: SignalingMessage):
        logger.debug("handleOffer")
        offer = RTCSessionDescription(
            type=message["content"]["type"], sdp=message["content"]["sdp"]
        )
        await self._makeAnswer(offer)

    async def _handleAnswer(self, message: SignalingMessage):
        logger.debug("handleAnswer")
        answer = RTCSessionDescription(
            type=message["content"]["type"], sdp=message["content"]["sdp"]
        )
        await self._acceptAnswer(answer)

    async def _handleIceCandidate(self, message: SignalingMessage):
        logger.debug("handleIceCandidate")
        try:
            candidate = candidate_from_sdp(
                message["content"]["candidate"].split(":", 1)[1]
            )
            candidate.sdpMid = message["content"]["sdpMid"]
            candidate.sdpMLineIndex = message["content"]["sdpMLineIndex"]
            await self._acceptIceCandiate(candidate)
        except Exception:
            pass  # ignore invalid candidates

    async def _handleOptions(self, message: SignalingMessage):
        logger.debug("handleOptions")
        self._trickleIce = message["content"]["canTrickle"]
        if not self._receivedOptions.done():
            self._receivedOptions.set_result(None)

    async def _createMediaChannels(self):
        for label, channel in self._mediaChannelMap.items():
            rtpTranseiver = self.pc.addTransceiver(
                channel.track if channel.track else "video", direction="sendrecv"
            )
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
            direction: Literal["inactive", "sendonly", "recvonly", "sendrecv"] = (
                "inactive"
            )

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
