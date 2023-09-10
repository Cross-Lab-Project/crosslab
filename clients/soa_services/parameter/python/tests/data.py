from crosslab.soa_services.parameter.messages import ParameterServiceConfig

serviceConfig: ParameterServiceConfig = {
    "serviceType": "http://api.goldi-labs.de/serviceTypes/parameter",
    "parameters": [
        {
            "name": "test",
            "unit": "test",
            "minimum": 0,
            "maximum": 1,
            "remoteName": "test",
        }
    ],
}
