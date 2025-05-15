import logging

import pytest

import crosslab.soa_client.logging

pytest.register_assert_rewrite("helpers")

from helpers.mock_server import MockServer


@pytest.fixture(scope="function")
def mock_server(aiohttp_server):
    return MockServer(aiohttp_server)


crosslab_logger = logging.getLogger("crosslab")
crosslab_logger.removeHandler(crosslab_logger.handlers[0])
