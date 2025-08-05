import json
import logging
from typing import Dict, List, cast

from crosslab.soa_client.connection import Channel, Connection, DataChannel
from crosslab.soa_client.messages import ServiceConfig, SignalingMessage

logger = logging.getLogger(__name__)


class LocalConnection(Connection):
    def __init__(self, options=None):
        Connection.__init__(self, options)
        self._dataChannels: Dict[str, List[DataChannel]] = {}

    def transmit(
        self,
        serviceConfig: ServiceConfig,
        id: str,
        channel: Channel,
    ):
        label = self._create_label(serviceConfig, id)
        if isinstance(channel, DataChannel):
            dchannel = cast(DataChannel, channel)
            if label not in self._dataChannels:
                self._dataChannels[label] = []
            self._dataChannels[label].append(dchannel)

    def receive(
        self,
        serviceConfig: ServiceConfig,
        id: str,
        channel: Channel,
    ):
        self.transmit(serviceConfig, id, channel)

    async def handleSignalingMessage(self, message: SignalingMessage):
        pass

    async def connect(self):
        for channels in self._dataChannels.values():
            for channel in channels:
                others = [c for c in channels if c is not channel]

                def upstreamData(data, others=others):
                    for other in others:
                        other.downstreamData(data)

                channel.on("upstreamData", upstreamData)
            for channel in channels:
                await channel.opened()
        self.state = "connected"
        self.emit("connectionChanged")

    async def close(self):
        if self.state != "closed":
            self._dataChannels.clear()
            self.state = "closed"
            self.emit("connectionChanged")

    def _create_label(self, serviceConfig: ServiceConfig, id: str):
        id1 = (
            serviceConfig["serviceId"]
            if serviceConfig["serviceId"] <= serviceConfig["remoteServiceId"]
            else serviceConfig["remoteServiceId"]
        )
        id2 = (
            serviceConfig["remoteServiceId"]
            if serviceConfig["serviceId"] <= serviceConfig["remoteServiceId"]
            else serviceConfig["serviceId"]
        )
        label = json.dumps(
            [serviceConfig["serviceType"], id1, id2, id], separators=(",", ":")
        )
        return label
