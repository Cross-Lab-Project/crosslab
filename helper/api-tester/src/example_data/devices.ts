import { ConcreteDevice, DeviceGroup } from "@cross-lab-project/api-client/dist/generated/device/types"

interface ExampleDevices {
    concrete: { 
        basic: ConcreteDevice
        [key: string]: ConcreteDevice
    }
    group: { 
        basic: DeviceGroup
        [key: string]: DeviceGroup
    }
}

export const exampleDevices: ExampleDevices = {
    concrete: {
        basic: {
            type: "device",
            name: "Test Concrete Device",
            description: "A concrete device created solely for testing purposes",
            owner: "https://api.example.com/groups/goldi",
            announcedAvailability: [{ available: true }]
        }
    },
    group: { 
        basic: {
            type: "group",
            name: "Test Device Group",
            description: "A device group created solely for testing purposes",
            owner: "https://api.example.com/groups/goldi"
        }
    }
}