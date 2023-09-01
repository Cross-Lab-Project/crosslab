import pytest
from crosslab.soa_client.test_helper import ConnectionStub
from data import serviceConfig
from test_helper import NoReferenceLeaks

from crosslab.soa_services.parameter.parameter_service import (
    ParameterService__Consumer,
    ParameterService__Producer,
)


@pytest.mark.parametrize("tiebreaker", [True, False])
def test_teardown_reference_leaks_producer(tiebreaker):
    con = ConnectionStub(tiebreaker)

    fs = ParameterService__Producer(
        "test",
        [
            {"name": "test", "unit": "test", "minimum": 0, "maximum": 1},
        ],
    )

    with NoReferenceLeaks():
        fs.setupConnection(con, serviceConfig)
        fs.teardownConnection(con)
        con.close()


@pytest.mark.parametrize("tiebreaker", [True, False])
def test_teardown_reference_leaks_consumer(tiebreaker):
    con = ConnectionStub(tiebreaker)

    fs = ParameterService__Consumer("test", [])

    with NoReferenceLeaks():
        fs.setupConnection(con, serviceConfig)
        fs.teardownConnection(con)
        con.close()
