from crosslab.soa_client.connection import Connection, DataChannel


class ConnectionStub(Connection):
    def __init__(self, tiebreaker=False):
        self.tiebreaker = tiebreaker
        self.messages = dict()
        self.channels = dict()

    def close(self):
        for channel in self.channels.values():
            channel.close()
        self.channels.clear()

    def transmit(self, serviceConfig, id: str, channel):
        self.messages[id] = []
        self.channels[id] = channel
        if isinstance(channel, DataChannel):
            channel.on("upstreamData", lambda data: self.messages[id].append(data))
            channel.emit("open")

    def receive(self, serviceConfig, id: str, channel):
        pass
        self.messages[id] = []
        self.channels[id] = channel
        if isinstance(channel, DataChannel):
            channel.on("upstreamData", lambda data: self.messages[id].append(data))
            channel.emit("open")

    def handleSignalingMessage(self, message):
        raise NotImplementedError()

    pass
