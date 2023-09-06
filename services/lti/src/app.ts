#!/usr/bin/env node

import express from "express";
import asyncHandler from "express-async-handler";
import {errorHandler, logHandling} from "@crosslab/service-common";
import {handle_dynamic_registration_initiation_request} from "./lti/dynamic_registration";
import * as key_management from "./key_management";
import {complete_manual_registration, handle_manual_registration} from "./lti/manual_registration";
import cookieParser from "cookie-parser";
import {config} from "./config";
import {handle_login_request} from "./lti/message";

export let app: express.Express;

export function init_app() {
  app = express();
  logHandling(app);
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cookieParser(config.COOKIE_SECRET));

  app.get(
    "/",
    asyncHandler(async (req, res) => {
      if (req.query.openid_configuration) {
        await handle_dynamic_registration_initiation_request(req, res);
      } else {
        await handle_manual_registration(req, res);
      }
    }),
  );

  app.post(
    '/register',
    asyncHandler(async (req, res) => {
      await complete_manual_registration(req, res)
    })
  )

  app.post(
    "/",
    asyncHandler(async (req, res) => {
      console.log(req.body);
      await handle_login_request(req, res);
      //res.send("ok")
    }),
  );

  app.get(
    "/.well-known/jwks.json",
    asyncHandler(async (_req, res) => {
      res.send(key_management.get_jwks());
    }),
  );

  app.get(
    "/logo.png",
    asyncHandler(async (_req, res) => {
      res.sendFile("logo.png", {root: "assets/"});
    }),
  );

  app.use(errorHandler);

  app.listen(config.PORT);
}
