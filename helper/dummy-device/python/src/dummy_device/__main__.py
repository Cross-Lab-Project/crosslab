#! /usr/bin/env python3

import argparse
import asyncio
import json
import os
import sys
from functools import partial
from typing import Dict, Optional

import debugpy
from crosslab.api_client import APIClient
from crosslab.soa_client.device_handler import DeviceHandler
from crosslab.soa_services.electrical import ElectricalConnectionService
from crosslab.soa_services.electrical.signal_interfaces.gpio import (
    ConstractableGPIOInterface,
    GPIOInterface,
    GPIOSignalChangeEventData,
)

signal_names = [
    *["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    *["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
    *["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
    *["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
    *["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
    *["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"],
    *["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8"],
    *["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"],
]

interfaces: Dict[str, GPIOInterface] = dict()


def signal_changed(name: str, data: GPIOSignalChangeEventData):
    value = "unknown"
    if data.state == "strongL":
        value = "strongL"
    elif data.state == "strongH":
        value = "strongH"
    elif data.state == "weakL":
        value = "weakL"
    elif data.state == "weakH":
        value = "weakH"
    print("[gpio] " + json.dumps({"signal": name, "value": value}), flush=True)


def newInterface(interface):
    if isinstance(interface, GPIOInterface):
        name = interface.configuration["signals"]["gpio"]
        interface.on("signalChange", partial(signal_changed, name))
        interfaces[name] = interface


async def stdin_reader():
    loop = asyncio.get_event_loop()
    reader = asyncio.StreamReader(loop=loop)
    protocol = asyncio.StreamReaderProtocol(reader)
    await loop.connect_read_pipe(lambda: protocol, sys.stdin)
    while True:
        print("reading line")
        line = (await reader.readline()).decode()
        if line.startswith("[gpio] "):
            line = line[7:]
            data = json.loads(line)
            if data["signal"] in interfaces:
                if data["value"] == "strongL":
                    interfaces[data["signal"]].changeDriver("strongL")
                elif data["value"] == "strongH":
                    interfaces[data["signal"]].changeDriver("strongH")
                elif data["value"] == "weakL":
                    interfaces[data["signal"]].changeDriver("weakL")
                elif data["value"] == "weakH":
                    interfaces[data["signal"]].changeDriver("weakH")
                elif data["value"] == "error":
                    interfaces[data["signal"]].changeDriver("error")
                else:
                    interfaces[data["signal"]].changeDriver("unknown")
            else:
                print("unknown signal", data["signal"])
        print("line", line)


async def main_async():
    debugpy.breakpoint()

    parser = argparse.ArgumentParser(
        prog="Crosslab Client",
        description="The Crosslab Client",
    )

    parser.add_argument(
        "--auth-token",
        help="Authentification Token to login",
        default=os.environ.get("CROSSLAB_CLI_TOKEN"),
    )
    parser.add_argument("--device-url", help="Device ID")
    parser.add_argument(
        "--url",
        help="URL of the CrossLab instance",
        default=os.environ.get("CROSSLAB_CLI_URL"),
    )

    print("parsing")
    args = parser.parse_args()

    auth_token: Optional[str] = args.auth_token
    device_id: Optional[str] = args.device_url
    url: Optional[str] = args.url

    if auth_token is None:
        print("Error: No auth token provided.")
        exit(1)
    if device_id is None:
        print("Error: No device id provided.")
        exit(1)
    if url is None:
        print("Error: No url provided.")
        exit(1)

    print("creating device handler")
    deviceHandler = DeviceHandler()

    signal_service = ElectricalConnectionService("electrical")
    signal_interface = ConstractableGPIOInterface(signal_names)
    signal_service.addInterface(signal_interface)
    signal_service.on("newInterface", newInterface)
    deviceHandler.add_service(signal_service)
    deviceHandler.on(
        "websocketToken",
        lambda token: print("[websocketToken] " + json.dumps(token), flush=True),
    )
    deviceHandler.on(
        "websocketConnected", lambda: print("[websocketConnected]", flush=True)
    )
    deviceHandler.on(
        "connectionsChanged",
        lambda: print(
            "[connectionsChanged] "
            + json.dumps(
                [
                    {"url": k, "state": v.state}
                    for k, v in deviceHandler._connections.items()
                ]
            ),
            flush=True,
        ),
    )

    async with APIClient(url) as client:
        client.set_auth_token(auth_token)
        readerTask = asyncio.create_task(stdin_reader())
        deviceHandlerTask = asyncio.create_task(
            deviceHandler.connect(device_id, client)
        )

        await deviceHandlerTask
        readerTask.cancel()
        await readerTask


def main():
    asyncio.run(main_async())


if __name__ == "__main__":
    sys.exit(main())
