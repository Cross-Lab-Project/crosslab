import pytest

pytest.register_assert_rewrite("helpers")

from helpers.mock_server import MockServer

@pytest.fixture(scope="function")
def mock_server(aiohttp_server):
    return MockServer(aiohttp_server)
