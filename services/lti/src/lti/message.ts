import {Request, Response} from "express";
import {tool_configuration} from "./tool_configuration.js";
import {ApplicationDataSource} from "../database/datasource.js";
import {PlatformModel} from "../database/model.js";
import * as generators from "../helper/generators.js";
import {nonce_store} from "../helper/nonce.js";
import {JWTPayload, createRemoteJWKSet, jwtVerify, SignJWT} from "jose";
import {post_form_message} from "../helper/html_responses.js";
import {logging} from "@crosslab/service-common";
import {authentication} from "../clients/index.js";
import {ListTemplateResponse200} from "../clients/experiment/schemas.js";
import {kid, privateKey} from "../key_management.js";
import {randomBytes} from "crypto";

const platform_repository = ApplicationDataSource.getRepository(PlatformModel);

function post_form(url: string, message: object): string {
  return `<form action="${url}" method="post">${Object.entries(message)
    .map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`)
    .join("")}<button type="submit">Select</button></form>`;
}

async function handle_deep_linking_request(_req: Request, res: Response, payload: JWTPayload) {
  //const templates = await experiment.listTemplate();
  const templates: ListTemplateResponse200 = [
    {name: "Test", description: "Beschreibung", url: "https://www.goldi-labs.de/en/experiment?token=123"},
  ];

  const deep_linking_settings = (payload["https://purl.imsglobal.org/spec/lti-dl/claim/deep_linking_settings"] as any) ?? {};
  const jwt_fields = {
    aud: payload.iss as string,
    iss: payload.aud as string,
    nonce: randomBytes(32).toString("base64url"),
    "https://purl.imsglobal.org/spec/lti/claim/message_type": "LtiDeepLinkingResponse",
    "https://purl.imsglobal.org/spec/lti/claim/version": "1.3.0",
    "https://purl.imsglobal.org/spec/lti/claim/deployment_id": payload["https://purl.imsglobal.org/spec/lti/claim/deployment_id"],
    "https://purl.imsglobal.org/spec/lti-dl/claim/data": deep_linking_settings.data,
  };
  logging.logger.log("trace", "response_fields", {response_fields: jwt_fields});
  const return_url = deep_linking_settings.deep_link_return_url;

  const template_jwts = await Promise.all(
    templates.map(template => {
      return new SignJWT({
        ...jwt_fields,
        "https://purl.imsglobal.org/spec/lti-dl/claim/content_items": [
          {
            type: "ltiResourceLink",
            url: tool_configuration.redirect_uris[0],
            custom: {experiment: template.url},
          },
        ],
      })
        .setProtectedHeader({alg: "ES256", kid: kid})
        .setIssuedAt()
        .setExpirationTime("5m")
        .sign(privateKey);
    }),
  );

  res.send(
    "<!DOCTYPE html>" +
      "<html>" +
      "<body>" +
      "<h2>Experiment Selection</h2>" +
      "<p>If you want to add a new Experiment Template, please visit the main homepage.</p>" +
      "<table>" +
      '  <tr align="left">' +
      "    <th>Name</th>" +
      "    <th>Description</th>" +
      "    <th>Selection</th>" +
      "  </tr>" +
      templates
        .map(
          (template, idx) =>
            "  <tr>" +
            `    <td>${template.name}</td>` +
            `    <td>${template.description}</td>` +
            `    <td>${post_form(return_url, {JWT: template_jwts[idx]})}</td>`,
        )
        .join("\n") +
      "</table>" +
      "</body>" +
      "</html>",
  );
}

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
    const token = await authentication.createToken({username: "jona3814"});
    logging.logger.log("trace", "received access token for LTI-Access", {token});
    res.send(
      post_form_message("https://www.goldi-labs.de/en/experiment?token=" + token, {
        //experiment: JSON.stringify({...example_experiment, status: "running"}).replaceAll('"', "&quot;"),
      }),
    );
    return;
  }
  if (payload["https://purl.imsglobal.org/spec/lti/claim/message_type"] === "LtiDeepLinkingRequest") {
    await handle_deep_linking_request(req, res, payload);
    return;
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
