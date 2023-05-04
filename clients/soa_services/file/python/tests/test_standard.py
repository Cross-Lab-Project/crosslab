import pytest
from crosslab.soa_client.test_helper import ConnectionStub
from data import serviceConfig
from test_helper import NoReferenceLeaks

from crosslab.soa_services.file.file_service import (
    FileService__Consumer,
    FileService__Producer,
)


@pytest.mark.parametrize("tiebreaker", [True, False])
def test_teardown_reference_leaks_producer(tiebreaker):
    con = ConnectionStub(tiebreaker)

    fs = FileService__Producer("test")

    with NoReferenceLeaks():
        fs.setupConnection(con, serviceConfig)
        fs.teardownConnection(con)
        con.close()


@pytest.mark.parametrize("tiebreaker", [True, False])
def test_teardown_reference_leaks_consumer(tiebreaker):
    con = ConnectionStub(tiebreaker)

    fs = FileService__Consumer("test")

    with NoReferenceLeaks():
        fs.setupConnection(con, serviceConfig)
        fs.teardownConnection(con)
        con.close()
