import pytest
from crosslab.soa_client.test_helper import ConnectionStub
from data import serviceConfig
from test_helper import NoReferenceLeaks

from crosslab.soa_services.electrical import ElectricalConnectionService
from crosslab.soa_services.electrical.messages import ElectricalServiceConfig
from crosslab.soa_services.electrical.signal_interfaces.gpio import (
    ConstractableGPIOInterface,
)


@pytest.mark.parametrize("tiebreaker", [True, False])
def test_teardown_reference_leaks(tiebreaker):
    con = ConnectionStub(tiebreaker)

    ecs = ElectricalConnectionService("test")
    gci = ConstractableGPIOInterface(["S1", "S2"])

    ecs.addInterface(gci)

    with NoReferenceLeaks("crosslab"):
        ecs.setupConnection(con, serviceConfig)
        ecs.teardownConnection(con)
        con.close()
