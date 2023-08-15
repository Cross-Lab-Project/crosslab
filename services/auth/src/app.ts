import {errorHandler, logging, authorization} from "@crosslab/service-common";

import cookieParser from "cookie-parser";

import express from "express";
import {router as auth_router} from "./auth";
import {router as user_router} from "./user";
import {router as login_logout_router} from "./login_logout";

export let app: express.Express;

export function init_app() {
  app = express();
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(logging.middleware());
  app.use(authorization.middleware());

  app.use(auth_router);
  app.use(user_router);
  app.use(login_logout_router);

  app.get("/auth/status", (_req, res) => {
    res.send({status: "ok"});
  });

  app.use(errorHandler);

  return app;
}
