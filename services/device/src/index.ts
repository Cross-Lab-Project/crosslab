import app from "./app";
import {config} from "./config";
import {init_database} from "./database/dataSource";
import {websocketHandling} from "./operations/devices";
import {logger} from "@crosslab/service-common";
import {IncomingMessage} from "http";
import {Socket} from "net";
import WebSocket from "ws";

declare global {
  // eslint-disable-next-line
  namespace Express {
    interface Application {
      run(): void;
      ws(path: string, listener: (socket: WebSocket) => void): void;
      wsListeners: Map<string, (socket: WebSocket) => void>;
    }
  }
}

async function startDeviceService() {
  await init_database();

  //apiClient.accessToken = config.API_TOKEN

  const wsServer = new WebSocket.Server({noServer: true});
  app.wsListeners = new Map();
  app.ws = (path, listener) => app.wsListeners.set(path, listener);
  websocketHandling(app);

  const server = app.listen(config.PORT);
  server.on("upgrade", async (request: IncomingMessage, socket: Socket, head: Buffer) => {
    const listener = app.wsListeners.get(request.url ?? "");
    if (listener) {
      wsServer.handleUpgrade(request, socket, head, webSocket => listener(webSocket));
    }
  });

  logger.log("info", "Device Service started successfully");
}

/* istanbul ignore if */
if (require.main === module) {
  startDeviceService();
}
