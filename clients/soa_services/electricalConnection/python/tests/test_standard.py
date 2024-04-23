import asyncio
from asyncio import sleep

import pytest
from crosslab.soa_client.test_helper import ConnectionStub
from data import serviceConfig
from test_helper import NoReferenceLeaks

from crosslab.soa_services.electrical import ElectricalConnectionService
from crosslab.soa_services.electrical.messages import ElectricalServiceConfig
from crosslab.soa_services.electrical.signal_interfaces.gpio import (
    ConstractableGPIOInterface,
)
from tests.helper import running_tasks


@pytest.mark.parametrize("tiebreaker", [True, False])
@pytest.mark.asyncio
async def test_teardown_reference_leaks(tiebreaker):
    con = ConnectionStub(tiebreaker)

    ecs = ElectricalConnectionService("test")
    gci = ConstractableGPIOInterface(["S1", "S2"])

    ecs.addInterface(gci)

    with NoReferenceLeaks("crosslab"):
        ecs.setupConnection(con, serviceConfig)
        ecs.teardownConnection(con)
        con.close()
        await asyncio.wait(running_tasks())
