import asyncio
import logging
from typing import Any, Dict


class CrosslabHandler(logging.Handler):
    def __init__(self, level: int | str = 0) -> None:
        super().__init__(level)
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

        if record.exc_info and record.exc_text is None:
            record.exc_text = self.formatException(record.exc_info)

        if record.exc_text:
            info["exc_info"] = record.exc_text

        if record.stack_info:
            info["stack_info"] = self.formatStack(record.stack_info)
        print(info)
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
crosslab_logger.addHandler(handler)
