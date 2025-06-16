import asyncio
import logging
from typing import List


class CrosslabHandler(logging.Handler):
    cache: List[dict]

    def __init__(self) -> None:
        super().__init__()
        self.upstreamHandler = None
        self.cache = []

    def emit(self, record):
        """
        Emit a record.

        If a formatter is specified, it is used to format the record.
        The record is then written to the stream with a trailing newline.  If
        exception information is present, it is formatted using
        traceback.print_exception and appended to the stream.  If the stream
        has an 'encoding' attribute, it is used to determine how to do the
        output to the stream.
        """
        info = dict()
        info["message"] = record.getMessage()
        info["level"] = record.levelname
        if record.levelno == logging.DEBUG:
            info["level"] = "debug"
        elif record.levelno == logging.INFO:
            info["level"] = "info"
        elif record.levelno == logging.WARNING:
            info["level"] = "warn"
        elif record.levelno == logging.ERROR:
            info["level"] = "error"
        elif record.levelno == logging.CRITICAL:
            info["level"] = "fatal"

        info["origin"] = dict()
        info["origin"]["funcName"] = record.funcName
        info["origin"]["lineno"] = record.lineno
        info["origin"]["name"] = record.name
        info["origin"]["pathname"] = record.pathname
        info["origin"]["processName"] = record.processName
        info["origin"]["threadName"] = record.threadName

        self.cache.append(info)
        asyncio.create_task(self.flush())

    def setUpstream(self, upstreamHandler):
        self.upstreamHandler = upstreamHandler
        asyncio.create_task(self.flush())

    async def flush(self):
        if self.upstreamHandler is None:
            return
        cache_copy = self.cache.copy()
        self.cache = []
        for info in cache_copy:
            await self.upstreamHandler(info)


handler = CrosslabHandler()

crosslab_logger = logging.getLogger("crosslab")
crosslab_logger.setLevel(logging.DEBUG)
crosslab_logger.addHandler(handler)
crosslab_logger.addHandler(logging.StreamHandler())

# aiortc_logger = logging.getLogger("aiortc")
# aiortc_logger.setLevel(logging.DEBUG)
# aiortc_logger.addHandler(handler)
# aiortc_logger.addHandler(logging.StreamHandler())

# aioice_logger = logging.getLogger("aioice")
# aioice_logger.setLevel(logging.DEBUG)
# aioice_logger.addHandler(handler)
# aioice_logger.addHandler(logging.StreamHandler())
