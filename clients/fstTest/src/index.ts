import { DeviceHandler } from '@cross-lab-project/soa-client';
import {
  ElectricalConnectionService,
  GPIO,
} from '@cross-lab-project/soa-service-electrical';
import { LocalConnection } from './localConnection.js';
import { LocalDeviceTransport, startExperiment } from './localDeviceTransport.js';

async function device1() {
  const gpios = new Map<string, GPIO.GPIOInterface>();
  const electrical = new ElectricalConnectionService('electrical', ['gpio1', 'gpio2']);
  const gpio = new GPIO.ConstructableGPIOInterface(['gpio1', 'gpio2']);
  electrical.on('newInterface', interfaceEvent => {
    const gpioInterface = interfaceEvent.connectionInterface as GPIO.GPIOInterface;
    gpioInterface.on('signalChange', signalChangeEvent => {
      /*let value = 'unknown';
      switch (signalChangeEvent.state) {
        case GPIO.GPIOState.StrongHigh:
          value = 'strongH';
          break;
        case GPIO.GPIOState.StrongLow:
          value = 'strongL';
          break;
        case GPIO.GPIOState.WeakHigh:
          value = 'weakH';
          break;
        case GPIO.GPIOState.WeakLow:
          value = 'weakL';
          break;
      }
      console.log("device1 changed "+gpioInterface.configuration.signals.gpio+" to "+value)*/
      if(gpioInterface.configuration.signals.gpio === "gpio2"){
        if (signalChangeEvent.state===GPIO.GPIOState.StrongHigh){
          gpios.get("gpio1")?.changeDriver(GPIO.GPIOState.StrongHigh)
        }else{
          gpios.get("gpio1")?.changeDriver(GPIO.GPIOState.StrongLow)
        }
      }
    });
    gpios.set(gpioInterface.configuration.signals.gpio, gpioInterface);
  });
  electrical.addInterface(gpio);
  
  const deviceHandler = new DeviceHandler(electrical);
  deviceHandler.connectionConstuctors.set("local", (msg)=>new LocalConnection(msg))
  deviceHandler.connect(new LocalDeviceTransport("device1"))
}

async function device2() {
  const gpios = new Map<string, GPIO.GPIOInterface>();
  const electrical = new ElectricalConnectionService('electrical', ['gpio1', 'gpio2', 'gpio3']);
  const gpio = new GPIO.ConstructableGPIOInterface(['gpio1', 'gpio2', 'gpio3']);
  electrical.on('newInterface', interfaceEvent => {
    const gpioInterface = interfaceEvent.connectionInterface as GPIO.GPIOInterface;
    gpioInterface.on('signalChange', __filenamesignalChangeEvent => {
      /*let value = 'unknown';
      switch (signalChangeEvent.state) {
        case GPIO.GPIOState.StrongHigh:
          value = 'strongH';
          break;
        case GPIO.GPIOState.StrongLow:
          value = 'strongL';
          break;
        case GPIO.GPIOState.WeakHigh:
          value = 'weakH';
          break;
        case GPIO.GPIOState.WeakLow:
          value = 'weakL';
          break;
      }
      console.log("device2 changed "+gpioInterface.configuration.signals.gpio+" to "+value)*/
    });
    gpios.set(gpioInterface.configuration.signals.gpio, gpioInterface);
  });
  electrical.addInterface(gpio);
  
  const deviceHandler = new DeviceHandler(electrical);
  deviceHandler.connectionConstuctors.set("local", (msg)=>new LocalConnection(msg))
  deviceHandler.setErrorState((inp, out) => {
    if (inp.electrical.gpio1.gpio!==out.electrical.gpio2.gpio) return true
    return false
  });
  deviceHandler.connect(new LocalDeviceTransport("device2"))
  while(true){
    await new Promise((res)=>setTimeout(res,2000))
    gpios.get("gpio1")?.changeDriver(GPIO.GPIOState.StrongHigh)
    await new Promise((res)=>setTimeout(res,2000))
    gpios.get("gpio1")?.changeDriver(GPIO.GPIOState.StrongLow)
  }
}

async function device3() {
  const gpios = new Map<string, GPIO.GPIOInterface>();
  const electrical = new ElectricalConnectionService('electrical', ['gpio1', 'gpio2']);
  const gpio = new GPIO.ConstructableGPIOInterface(['gpio1', 'gpio2']);
  electrical.on('newInterface', interfaceEvent => {
    const gpioInterface = interfaceEvent.connectionInterface as GPIO.GPIOInterface;
    gpioInterface.on('signalChange', signalChangeEvent => {
      /*let value = 'unknown';
      switch (signalChangeEvent.state) {
        case GPIO.GPIOState.StrongHigh:
          value = 'strongH';
          break;
        case GPIO.GPIOState.StrongLow:
          value = 'strongL';
          break;
        case GPIO.GPIOState.WeakHigh:
          value = 'weakH';
          break;
        case GPIO.GPIOState.WeakLow:
          value = 'weakL';
          break;
      }
      //console.log("device3 changed "+gpioInterface.configuration.signals.gpio+" to "+value)*/
      if(gpioInterface.configuration.signals.gpio === "gpio2"){
        if (signalChangeEvent.state===GPIO.GPIOState.StrongHigh){
          gpios.get("gpio1")?.changeDriver(GPIO.GPIOState.StrongLow)
        }else{
          gpios.get("gpio1")?.changeDriver(GPIO.GPIOState.StrongHigh)
        }
      }
    });
    gpios.set(gpioInterface.configuration.signals.gpio, gpioInterface);
  });
  electrical.addInterface(gpio);
  
  const deviceHandler = new DeviceHandler(electrical);
  deviceHandler.connectionConstuctors.set("local", (msg)=>new LocalConnection(msg))
  deviceHandler.connect(new LocalDeviceTransport("device3"))
}

device1()
device2()
device3()
startExperiment([
  {
    "device1": [
      {serviceType: "electrical", remoteServiceId:"electrical", serviceId:"electrical", interfaces: [
        {
          interfaceType: "gpio",
          interfaceId: "1",
          busId: "gpio2",
          signals: { gpio: "gpio1" },
          driver: "device1",
          direction: 'out'
        },
        {
          interfaceType: "gpio",
          interfaceId: "2",
          busId: "gpio1",
          signals: { gpio: "gpio2" },
          driver: "device1",
          direction: 'in'
        }
      ]}
    ],
    "device2": [
      {serviceType: "electrical", remoteServiceId:"electrical", serviceId:"electrical", interfaces: [
        {
          interfaceType: "gpio",
          interfaceId: "3",
          busId: "gpio1",
          signals: { gpio: "gpio1" },
          driver: "device2",
          direction: 'out'
        },
        {
          interfaceType: "gpio",
          interfaceId: "4",
          busId: "gpio2",
          signals: { gpio: "gpio2" },
          driver: "device2",
          direction: 'in'
        }
      ]}
    ]
  },
    {
      "device3": [
        {serviceType: "electrical", remoteServiceId:"electrical", serviceId:"electrical", interfaces: [
          {
            interfaceType: "gpio",
            interfaceId: "5",
            busId: "gpio3",
            signals: { gpio: "gpio1" },
            driver: "device3",
            direction: 'out'
          },
          {
            interfaceType: "gpio",
            interfaceId: "6",
            busId: "gpio1",
            signals: { gpio: "gpio2" },
            driver: "device3",
            direction: 'in'
          }
        ]}
      ],
      "device2": [
        {serviceType: "electrical", remoteServiceId:"electrical", serviceId:"electrical", interfaces: [
          {
            interfaceType: "gpio",
            interfaceId: "3",
            busId: "gpio1",
            signals: { gpio: "gpio1" },
            driver: "device2",
            direction: 'out'
          },
          {
            interfaceType: "gpio",
            interfaceId: "8",
            busId: "gpio3",
            signals: { gpio: "gpio3" },
            driver: "device2",
            direction: 'in'
          }
        ]}
      ]
    }
])
