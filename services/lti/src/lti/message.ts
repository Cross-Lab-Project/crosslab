import {Request, Response} from "express";
import {tool_configuration} from "./tool_configuration";
import {ApplicationDataSource} from "../database/datasource";
import {PlatformModel} from "../database/model";
import * as generators from "../helper/generators";
import {nonce_store} from "../helper/nonce";
import {JWTPayload, createRemoteJWKSet, jwtVerify} from "jose";
import {post_form_message} from "../helper/html_responses";
import fetch from "node-fetch";
import {logging} from "@crosslab/service-common";

const platform_repository = ApplicationDataSource.getRepository(PlatformModel);

function handle_deep_linking_request(_req: Request, _res: Response, _payload: JWTPayload) {
  throw new Error("Function not implemented.");
}

const example_experiment = {
  devices: [
    {
      device: "https://api.goldi-labs.de/devices/f1e36955-84d6-4e26-b098-b0527b870220",
      role: "pspu",
    },
    {
      device: "https://api.goldi-labs.de/devices/c91eb068-12e6-4dd0-9f0b-68888588766d",
      role: "bpu",
    },
    {
      device: "https://api.goldi-labs.de/devices/cc1de37e-1a6a-4470-affd-12eb41a3231e",
      role: "ecp",
    },
  ],
  roles: [
    {
      name: "pspu",
    },
    {
      name: "bpu",
    },
    {
      name: "ecp",
    },
  ],
  serviceConfigurations: [
    {
      serviceType: "http://api.goldi-labs.de/serviceTypes/electrical",
      configuration: {},
      participants: [
        {
          role: "pspu",
          serviceId: "sensors",
          config: {
            interfaces: [
              {
                interfaceId: "1",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitXLeft",
                },
                busId: "LimitXLeft",
                direction: "out",
                driver: "pspu",
              },
              {
                interfaceId: "2",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitXRight",
                },
                busId: "LimitXRight",
                direction: "out",
                driver: "pspu",
              },
              {
                interfaceId: "3",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitYBack",
                },
                busId: "LimitYBack",
                direction: "out",
                driver: "pspu",
              },
              {
                interfaceId: "4",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitYFront",
                },
                busId: "LimitYFront",
                direction: "out",
                driver: "pspu",
              },
              {
                interfaceId: "5",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitZBottom",
                },
                busId: "LimitZBottom",
                direction: "out",
                driver: "pspu",
              },
              {
                interfaceId: "6",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitZTop",
                },
                busId: "LimitZTop",
                direction: "out",
                driver: "pspu",
              },
              {
                interfaceId: "7",
                interfaceType: "gpio",
                signals: {
                  gpio: "Proximity",
                },
                busId: "Proximity",
                direction: "out",
                driver: "pspu",
              },
            ],
          },
        },
        {
          role: "pspu",
          serviceId: "actuators",
          config: {
            interfaces: [
              {
                interfaceId: "8",
                interfaceType: "gpio",
                signals: {
                  gpio: "XMotorLeft",
                },
                busId: "XMotorLeft",
                direction: "in",
                driver: "pspu",
              },
              {
                interfaceId: "9",
                interfaceType: "gpio",
                signals: {
                  gpio: "XMotorRight",
                },
                busId: "XMotorRight",
                direction: "in",
                driver: "pspu",
              },
              {
                interfaceId: "10",
                interfaceType: "gpio",
                signals: {
                  gpio: "YMotorBack",
                },
                busId: "YMotorBack",
                direction: "in",
                driver: "pspu",
              },
              {
                interfaceId: "11",
                interfaceType: "gpio",
                signals: {
                  gpio: "YMotorFront",
                },
                busId: "YMotorFront",
                direction: "in",
                driver: "pspu",
              },
              {
                interfaceId: "12",
                interfaceType: "gpio",
                signals: {
                  gpio: "ZMotorBottom",
                },
                busId: "ZMotorBottom",
                direction: "in",
                driver: "pspu",
              },
              {
                interfaceId: "13",
                interfaceType: "gpio",
                signals: {
                  gpio: "ZMotorTop",
                },
                busId: "ZMotorTop",
                direction: "in",
                driver: "pspu",
              },
              {
                interfaceId: "14",
                interfaceType: "gpio",
                signals: {
                  gpio: "Magnet",
                },
                busId: "Magnet",
                direction: "in",
                driver: "pspu",
              },
            ],
          },
        },
        {
          role: "bpu",
          serviceId: "signals",
          config: {
            interfaces: [
              {
                interfaceId: "15",
                interfaceType: "gpio",
                signals: {
                  gpio: "D00",
                },
                busId: "LimitXLeft",
                direction: "in",
                driver: "bpu",
              },
              {
                interfaceId: "16",
                interfaceType: "gpio",
                signals: {
                  gpio: "D01",
                },
                busId: "LimitXRight",
                direction: "in",
                driver: "bpu",
              },
              {
                interfaceId: "17",
                interfaceType: "gpio",
                signals: {
                  gpio: "D02",
                },
                busId: "LimitYBack",
                direction: "in",
                driver: "bpu",
              },
              {
                interfaceId: "18",
                interfaceType: "gpio",
                signals: {
                  gpio: "D03",
                },
                busId: "LimitYFront",
                direction: "in",
                driver: "bpu",
              },
              {
                interfaceId: "19",
                interfaceType: "gpio",
                signals: {
                  gpio: "D04",
                },
                busId: "LimitZBottom",
                direction: "in",
                driver: "bpu",
              },
              {
                interfaceId: "20",
                interfaceType: "gpio",
                signals: {
                  gpio: "D05",
                },
                busId: "LimitZTop",
                direction: "in",
                driver: "bpu",
              },
              {
                interfaceId: "21",
                interfaceType: "gpio",
                signals: {
                  gpio: "D06",
                },
                busId: "Proximity",
                direction: "in",
                driver: "bpu",
              },
              {
                interfaceId: "22",
                interfaceType: "gpio",
                signals: {
                  gpio: "D07",
                },
                busId: "XMotorLeft",
                direction: "out",
                driver: "bpu",
              },
              {
                interfaceId: "23",
                interfaceType: "gpio",
                signals: {
                  gpio: "D08",
                },
                busId: "XMotorRight",
                direction: "out",
                driver: "bpu",
              },
              {
                interfaceId: "24",
                interfaceType: "gpio",
                signals: {
                  gpio: "D09",
                },
                busId: "YMotorBack",
                direction: "out",
                driver: "bpu",
              },
              {
                interfaceId: "25",
                interfaceType: "gpio",
                signals: {
                  gpio: "D10",
                },
                busId: "YMotorFront",
                direction: "out",
                driver: "bpu",
              },
              {
                interfaceId: "26",
                interfaceType: "gpio",
                signals: {
                  gpio: "D11",
                },
                busId: "ZMotorBottom",
                direction: "out",
                driver: "bpu",
              },
              {
                interfaceId: "27",
                interfaceType: "gpio",
                signals: {
                  gpio: "D12",
                },
                busId: "ZMotorTop",
                direction: "out",
                driver: "bpu",
              },
              {
                interfaceId: "28",
                interfaceType: "gpio",
                signals: {
                  gpio: "D13",
                },
                busId: "Magnet",
                direction: "out",
                driver: "bpu",
              },
            ],
          },
        },
        {
          role: "ecp",
          serviceId: "electrical",
          config: {
            interfaces: [
              {
                interfaceId: "29",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitXLeft / D00",
                },
                busId: "LimitXLeft",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "30",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitXRight / D01",
                },
                busId: "LimitXRight",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "31",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitYBack / D02",
                },
                busId: "LimitYBack",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "32",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitYFront / D03",
                },
                busId: "LimitYFront",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "33",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitZBottom / D04",
                },
                busId: "LimitZBottom",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "34",
                interfaceType: "gpio",
                signals: {
                  gpio: "LimitZTop / D05",
                },
                busId: "LimitZTop",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "35",
                interfaceType: "gpio",
                signals: {
                  gpio: "Proximity / D06",
                },
                busId: "Proximity",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "36",
                interfaceType: "gpio",
                signals: {
                  gpio: "XMotorLeft / D07",
                },
                busId: "XMotorLeft",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "37",
                interfaceType: "gpio",
                signals: {
                  gpio: "XMotorRight / D08",
                },
                busId: "XMotorRight",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "38",
                interfaceType: "gpio",
                signals: {
                  gpio: "YMotorBack / D09",
                },
                busId: "YMotorBack",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "39",
                interfaceType: "gpio",
                signals: {
                  gpio: "YMotorFront / D10",
                },
                busId: "YMotorFront",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "40",
                interfaceType: "gpio",
                signals: {
                  gpio: "ZMotorBottom / D11",
                },
                busId: "ZMotorBottom",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "41",
                interfaceType: "gpio",
                signals: {
                  gpio: "ZMotorTop / D12",
                },
                busId: "ZMotorTop",
                direction: "in",
                driver: "ecp",
              },
              {
                interfaceId: "42",
                interfaceType: "gpio",
                signals: {
                  gpio: "Magnet / D13",
                },
                busId: "Magnet",
                direction: "in",
                driver: "ecp",
              },
            ],
          },
        },
      ],
    },
    {
      serviceType: "http://api.goldi-labs.de/serviceTypes/webcam",
      configuration: {},
      participants: [
        {
          role: "pspu",
          serviceId: "webcam",
          config: {},
        },
        {
          role: "ecp",
          serviceId: "webcam",
          config: {},
        },
      ],
    },
  ],
};

async function handle_authentication_response(req: Request, res: Response) {
  res.clearCookie("state", {httpOnly: true, sameSite: "none", secure: true});
  res.clearCookie("nonce", {httpOnly: true, sameSite: "none", secure: true});

  if (req.body.state !== req.signedCookies.state) {
    throw new Error("state does not match");
  }
  const jwks_url = decodeURIComponent(req.body.state.split(":")[1]);
  const jwt = req.body.id_token;
  const jwks = createRemoteJWKSet(new URL(jwks_url));
  const {payload} = await jwtVerify(jwt, jwks);
  if (payload.nonce !== req.signedCookies.nonce) {
    throw new Error("nonce does not match");
  }
  if (!nonce_store.check(payload.nonce as string)) {
    throw new Error("nonce has already been used");
  }

  if (payload["https://purl.imsglobal.org/spec/lti/claim/message_type"] === "LtiResourceLinkRequest") {
    const token = await fetch("http://localhost:3000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: "jona3814"}),
    }).then(r => r.json());
    logging.logger.log("trace", "received access token for LTI-Access", {token});
    res.send(
      post_form_message("https://www.goldi-labs.de/en/experiment?token=" + token, {
        experiment: JSON.stringify({...example_experiment, status: "running"}).replaceAll('"', "&quot;"),
      }),
    );
    return;
  }
  if (payload['"https://purl.imsglobal.org/spec/lti/claim/message_type'] === "LtiDeepLinkingRequest") {
    await handle_deep_linking_request(req, res, payload);
  }
  res.send(payload);
}

export async function handle_login_request(req: Request, res: Response) {
  if (req.body.id_token) {
    return handle_authentication_response(req, res);
  }
  if (req.body.target_link_uri !== tool_configuration["https://purl.imsglobal.org/spec/lti-tool-configuration"].target_link_uri) {
    throw new Error("target_link_uri does not match");
  }

  let platform: PlatformModel;
  if (req.body.client_id) {
    platform = await platform_repository.findOneByOrFail({iss: req.body.iss, client_id: req.body.client_id});
  } else {
    platform = await platform_repository.findOneByOrFail({iss: req.body.iss});
  }

  const stateParam = generators.random() + ":" + encodeURIComponent(platform.jwks_url);
  res.cookie("state", stateParam, {httpOnly: true, signed: true, maxAge: 5 * 60 * 1000, sameSite: "none", secure: true});
  const nonceParam = nonce_store.get();
  res.cookie("nonce", nonceParam, {httpOnly: true, signed: true, maxAge: 5 * 60 * 1000, sameSite: "none", secure: true});

  const queryParams = {
    scope: "openid",
    response_type: "id_token",
    client_id: platform.client_id,
    redirect_uri: req.body.target_link_uri,
    login_hint: req.body.login_hint,
    state: stateParam,
    response_mode: "form_post",
    nonce: nonceParam,
    prompt: "none",
    lti_message_hint: req.body.lti_message_hint,
  };

  const authentication_request_url = platform.authentication_request_url + "?" + new URLSearchParams(queryParams).toString();

  res.setHeader("Location", authentication_request_url);
  res.status(302).send();
}
