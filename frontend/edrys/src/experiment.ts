export const experiment = {
    "devices": [
      {
        "device": "https://api.goldi-labs.de/devices/f1e36955-84d6-4e26-b098-b0527b870220",
        "role": "pspu"
      },
      {
        "device": "https://api.goldi-labs.de/devices/cc1de37e-1a6a-4470-affd-12eb41a3231e",
        "role": "ecp"
      }
    ],
    "roles": [
      {
        "name": "pspu"
      },
      {
        "name": "ecp"
      }
    ],
    "serviceConfigurations": [
      {
        "serviceType": "http://api.goldi-labs.de/serviceTypes/electrical",
        "configuration": {},
        "participants": [
          {
            "role": "pspu",
            "serviceId": "sensors",
            "config": {
              "interfaces": [
                {
                  "interfaceId": "1",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitXLeft"
                  },
                  "busId": "LimitXLeft",
                  "direction": "out",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "2",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitXRight"
                  },
                  "busId": "LimitXRight",
                  "direction": "out",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "3",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitYBack"
                  },
                  "busId": "LimitYBack",
                  "direction": "out",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "4",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitYFront"
                  },
                  "busId": "LimitYFront",
                  "direction": "out",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "5",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitZBottom"
                  },
                  "busId": "LimitZBottom",
                  "direction": "out",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "6",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitZTop"
                  },
                  "busId": "LimitZTop",
                  "direction": "out",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "7",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "Proximity"
                  },
                  "busId": "Proximity",
                  "direction": "out",
                  "driver": "pspu"
                }
              ]
            }
          },
          {
            "role": "pspu",
            "serviceId": "actuators",
            "config": {
              "interfaces": [
                {
                  "interfaceId": "8",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "XMotorLeft"
                  },
                  "busId": "XMotorLeft",
                  "direction": "in",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "9",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "XMotorRight"
                  },
                  "busId": "XMotorRight",
                  "direction": "in",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "10",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "YMotorBack"
                  },
                  "busId": "YMotorBack",
                  "direction": "in",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "11",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "YMotorFront"
                  },
                  "busId": "YMotorFront",
                  "direction": "in",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "12",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "ZMotorBottom"
                  },
                  "busId": "ZMotorBottom",
                  "direction": "in",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "13",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "ZMotorTop"
                  },
                  "busId": "ZMotorTop",
                  "direction": "in",
                  "driver": "pspu"
                },
                {
                  "interfaceId": "14",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "Magnet"
                  },
                  "busId": "Magnet",
                  "direction": "in",
                  "driver": "pspu"
                }
              ]
            }
          },
          {
            "role": "ecp",
            "serviceId": "electrical",
            "config": {
              "interfaces": [
                {
                  "interfaceId": "15",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitXLeft"
                  },
                  "busId": "LimitXLeft",
                  "direction": "in",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "16",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitXRight"
                  },
                  "busId": "LimitXRight",
                  "direction": "in",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "17",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitYBack"
                  },
                  "busId": "LimitYBack",
                  "direction": "in",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "18",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitYFront"
                  },
                  "busId": "LimitYFront",
                  "direction": "in",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "19",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitZBottom"
                  },
                  "busId": "LimitZBottom",
                  "direction": "in",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "20",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "LimitZTop"
                  },
                  "busId": "LimitZTop",
                  "direction": "in",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "21",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "Proximity"
                  },
                  "busId": "Proximity",
                  "direction": "in",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "22",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "XMotorLeft"
                  },
                  "busId": "XMotorLeft",
                  "direction": "inout",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "23",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "XMotorRight"
                  },
                  "busId": "XMotorRight",
                  "direction": "inout",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "24",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "YMotorBack"
                  },
                  "busId": "YMotorBack",
                  "direction": "inout",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "25",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "YMotorFront"
                  },
                  "busId": "YMotorFront",
                  "direction": "inout",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "26",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "ZMotorBottom"
                  },
                  "busId": "ZMotorBottom",
                  "direction": "inout",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "27",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "ZMotorTop"
                  },
                  "busId": "ZMotorTop",
                  "direction": "inout",
                  "driver": "ecp"
                },
                {
                  "interfaceId": "28",
                  "interfaceType": "gpio",
                  "signals": {
                    "gpio": "Magnet"
                  },
                  "busId": "Magnet",
                  "direction": "inout",
                  "driver": "ecp"
                }
              ]
            }
          }
        ]
      },
      {
        "serviceType": "http://api.goldi-labs.de/serviceTypes/webcam",
        "configuration": {},
        "participants": [
          {
            "role": "pspu",
            "serviceId": "webcam",
            "config": {}
          },
          {
            "role": "ecp",
            "serviceId": "webcam",
            "config": {}
          }
        ]
      }
    ]
  }
  