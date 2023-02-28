import asyncio
import socket

from aiortc import MediaStreamTrack  # type: ignore


class UDPTrack(MediaStreamTrack):
    def __init__(self, port=1234, kind="video") -> None:
        super().__init__()
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  # Internet  # UDP
        self.sock.bind(("", port))
        self.sock.setblocking(False)
        self.kind = kind
        self.loop = asyncio.get_event_loop()

    async def raw_recv(self):
        return await self.loop.sock_recv(self.sock, 2048)

    def recv(self):
        return
