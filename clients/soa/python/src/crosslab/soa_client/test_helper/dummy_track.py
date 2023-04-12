import asyncio
from typing import BinaryIO

from aiortc import MediaStreamTrack  # type: ignore


class DummyTrack(MediaStreamTrack):
    sendPacket: asyncio.Event

    def __init__(self, file: BinaryIO, kind="video") -> None:
        super().__init__()
        self.sendPacket = asyncio.Event()
        self.kind = kind
        self._packets = []
        while True:
            len_bytes = file.read(2)
            if len_bytes == b"":
                break
            data = file.read(int.from_bytes(len_bytes, byteorder="big"))
            self._packets.append(data)

    async def raw_recv(self):
        if len(self._packets) == 0:
            self.sendPacket.set()
            return None
        else:
            return self._packets.pop(0)

    def recv(self):
        return
