import { APIClient } from "@cross-lab-project/api-client";
import { DeviceHandler } from "@cross-lab-project/soa-client";
import {
  ElectricalConnectionService,
  GPIO,
} from "@cross-lab-project/soa-service-electrical";

const sendEvent = (eventName: string, data?: unknown) => {
  if (data === undefined) {
    console.log("[" + eventName + "]");
  } else {
    console.log("[" + eventName + "]", JSON.stringify(data));
  }
};

const gpios = new Map<string, GPIO.GPIOInterface>();

async function app(options: {
  baseUrl: string;
  authToken: string;
  deviceUrl: string;
}) {
  const client = new APIClient(options.baseUrl);
  client.accessToken = options.authToken;

  const token = await client.createWebsocketToken(options.deviceUrl);
  sendEvent("websocketToken", token);

  const deviceHandler = new DeviceHandler();
  const electrical = new ElectricalConnectionService("electrical", [
    "gpio1",
    "gpio2",
  ]);
  const gpio = new GPIO.ConstructableGPIOInterface(["gpio1", "gpio2"]);
  electrical.on("newInterface", (interfaceEvent) => {
    const gpioInterface = interfaceEvent.connectionInterface as GPIO.GPIOInterface;
    gpioInterface.on("signalChange", (signalChangeEvent) => {
      let value = "unknown";
      switch (signalChangeEvent.state) {
        case GPIO.GPIOState.StrongHigh:
          value = "strongL";
          break;
        case GPIO.GPIOState.StrongLow:
          value = "strongH";
          break;
        case GPIO.GPIOState.WeakHigh:
          value = "weakL";
          break;
        case GPIO.GPIOState.WeakLow:
          value = "weakH";
          break;
      }
      sendEvent("gpio", {
        signal: gpioInterface.configuration.signals.gpio,
        value: value,
      });
    });
    gpios.set(gpioInterface.configuration.signals.gpio, gpioInterface);
  });
  electrical.addInterface(gpio);
  deviceHandler.addService(electrical);

  deviceHandler.on("connectionsChanged", () => {
    sendEvent(
      "connectionsChanged",
      Array.from(deviceHandler.connections).map(([k, v]) => ({
        url: k,
        state: v.state,
      }))
    );
  });

  await deviceHandler.connect({
    endpoint: options.baseUrl.replace("http", "ws") + "/devices/websocket",
    id: options.deviceUrl,
    token: token,
  });
  sendEvent("websocketConnected");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function event(eventName: string, data?: any) {
  if (eventName === "gpio") {
    let state = GPIO.GPIOState.Unknown;
    switch (data.value) {
      case "strongL":
        state = GPIO.GPIOState.StrongHigh;
        break;
      case "strongH":
        state = GPIO.GPIOState.StrongLow;
        break;
      case "weakL":
        state = GPIO.GPIOState.WeakHigh;
        break;
      case "weakH":
        state = GPIO.GPIOState.WeakLow;
        break;
    }
    gpios.get(data.signal)?.changeDriver(state as GPIO.GPIOState);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).app = app;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).event = event;
