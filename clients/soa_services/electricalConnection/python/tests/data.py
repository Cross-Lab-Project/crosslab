from crosslab.soa_services.electrical.messages import ElectricalServiceConfig

serviceConfig: ElectricalServiceConfig = {
    "serviceType": "http://api.goldi-labs.de/serviceTypes/electrical",
    "interfaces": [
        {
            "interfaceId": "0",
            "interfaceType": "gpio",
            "busId": "0",
            "signals": {"gpio": "S1"},
            "direction": "inout",
        }
    ],
}
