import asyncio
import functools


def timeout(timeout: float = 60):
    def inner(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            return await asyncio.wait_for(func(*args, **kwargs), timeout=timeout)

        return wrapper

    return inner