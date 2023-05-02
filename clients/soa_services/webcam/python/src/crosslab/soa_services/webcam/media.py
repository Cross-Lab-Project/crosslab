import asyncio
import random
import socket
import subprocess
from typing import Optional

from aiortc import MediaStreamTrack  # type: ignore


class UDPTrack(MediaStreamTrack):
    def __init__(self, port: int, kind="video") -> None:
        super().__init__()
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)  # Internet  # UDP
        self.sock.bind(("0.0.0.0", port))
        self.sock.setblocking(False)
        self.kind = kind
        self.loop = asyncio.get_event_loop()

    async def raw_recv(self):
        return await self.loop.sock_recv(self.sock, 2048)

    def recv(self):
        return

    def stop(self):
        pass
        # self.sock.close() // When we close the socket, the next user would not be able to use it: ERR 9


class GstTrack(UDPTrack):
    def __init__(self, pipeline, port: Optional[int] = None, kind="video") -> None:
        if port is None:
            port = random.randint(10000, 65535)
        super().__init__(port, kind)
        subprocess.Popen(
            f"gst-launch-1.0 {pipeline} ! rtph264pay config-interval=1 mtu=1300 ! udpsink host=127.0.0.1 port={port}",
            shell=True,
        )
