import {router} from "./routes";
import {logging, authorization, error} from "@crosslab/service-common";
import express from "express";
import WebSocket from "ws";
import { config } from "./config";
import { websocketHandling } from "./operations/devices";
import { IncomingMessage } from "http";
import { Socket } from "net";

declare global {
  // eslint-disable-next-line
  namespace Express {
    interface Application {
      ws(path: string, listener: (socket: WebSocket) => void): void;
      wsListeners: Map<string, (socket: WebSocket) => void>;
    }
  }
}

export let app: express.Express;

function setup_websockets(local_app: express.Express){
  const wsServer = new WebSocket.Server({noServer: true});
  local_app.wsListeners = new Map();
  local_app.ws = (path, listener) => local_app.wsListeners.set(path, listener);
  websocketHandling(local_app);

  const _listen=local_app.listen;
  local_app.listen=(port)=>{
    local_app.listen=_listen;
    const server = local_app.listen(port);
    server.on("upgrade", async (request: IncomingMessage, socket: Socket, head: Buffer) => {
      const listener = app.wsListeners.get(request.url ?? "");
      if (listener) {
        wsServer.handleUpgrade(request, socket, head, webSocket => listener(webSocket));
      }
    });
    return server;
  };
  return local_app;
}

export function init_app() {
  app = express();
  setup_websockets(app);

  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(logging.middleware());
  app.use(authorization.middleware());

  app.use(router);

  app.get("/device/status", (_req, res) => {
    res.send({status: "ok"});
  });

  app.use(error.middleware);

  app.listen(config.PORT);
}
