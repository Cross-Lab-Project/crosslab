import pytest
from aiortc.mediastreams import VideoStreamTrack
from crosslab.soa_client.test_helper import ConnectionStub
from data import serviceConfig
from test_helper import NoReferenceLeaks

from crosslab.soa_services.webcam import WebcamService__Producer


@pytest.mark.parametrize("tiebreaker", [True, False])
@pytest.mark.asyncio
async def test_teardown_reference_leaks(tiebreaker):
    con = ConnectionStub(tiebreaker)

    stream = VideoStreamTrack()

    ws = WebcamService__Producer(stream, "test")

    with NoReferenceLeaks("crosslab"):
        ws.setupConnection(con, serviceConfig)
        ws.teardownConnection(con)
        con.close()
