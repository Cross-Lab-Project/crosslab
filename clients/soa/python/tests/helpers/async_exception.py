import asyncio
from typing import Optional


class AsyncException:
    _event: asyncio.Event
    _exception: Optional[Exception]

    def __init__(self) -> None:
        self._event = asyncio.Event()
        self._exception = None

    def set(self, exception: Exception):
        self._exception = exception
        self._event.set()


async def wait(awaitables, exception: AsyncException, timeout=10):
    cancel = asyncio.Event()

    async def wait_for_exception():
        done, pending = await asyncio.wait(
            [
                asyncio.create_task(exception._event.wait()),
                asyncio.create_task(cancel.wait()),
            ],
            timeout=timeout,
            return_when=asyncio.FIRST_COMPLETED,
        )
        for task in pending:
            task.cancel()
        if exception._exception:
            raise exception._exception

    if not isinstance(awaitables, list):
        awaitables = [awaitables]

    # transform awaitables into tasks
    tasks = [asyncio.create_task(awaitable) for awaitable in awaitables]

    r = asyncio.as_completed(
        [asyncio.wait(tasks), wait_for_exception()], timeout=timeout
    )
    result = await next(r)
    cancel.set()
    await next(r)
    return result
