import asyncio


class PromiseManager:
    _promises: dict[str, asyncio.Future] = dict()

    def add(self, id: str) -> asyncio.Future:
        if id in self._promises.keys():
            raise Exception(f'Promise with id "{id}" already exists!')

        loop = asyncio.get_running_loop()
        future = loop.create_future()
        self._promises[id] = future

        return future

    def resolve(self, id: str, value):
        future = self._promises.get(id)

        if not future:
            raise Exception(f'Promise with id "{id}" does not exist!')

        del self._promises[id]

        future.set_result(value)
