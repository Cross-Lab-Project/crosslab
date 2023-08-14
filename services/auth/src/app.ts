import {config} from "./config";
import {requestIdHandling, logHandling, errorHandler} from "@crosslab/service-common";
import {authorization} from "@crosslab/service-common";

import cookieParser from "cookie-parser";

import express from "express";
import {router as auth_router} from "./auth";
import {router as user_router} from "./user";
import {router as login_logout_router} from "./login_logout";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
requestIdHandling(app);
logHandling(app);
app.use(authorization.middleware(config.authorization_config));

app.use(auth_router);
app.use(user_router);
app.use(login_logout_router);

app.get("/auth/status", (_req, res) => {
  res.send({status: "ok"});
});

app.use(errorHandler);

export default app;
