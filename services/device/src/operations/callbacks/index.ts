import {isCallback, isEventCallback} from "../../generated/types";
import {handleEventCallback} from "./event";
import {MalformedBodyError, InvalidValueError} from "@crosslab/service-common";
import express from "express";

export * from "../../methods/callbacks";

/**
 * This function adds the endpoint for incoming callbacks registered by the device service.
 * @param app The express application the callback endpoint should be added to.
 */
export function callbackHandling(app: express.Application) {
  app.post("/callbacks/device", async (req, res, next) => {
    try {
      const callback = req.body;

      if (!isCallback(callback))
        throw new MalformedBodyError("Body of request is not a valid callback", 400);

      switch (callback.callbackType) {
        case "event":
          if (!isEventCallback(callback))
            throw new MalformedBodyError(
              "Body of request is not a valid event callback",
              400,
            );
          return res.status(await handleEventCallback(callback)).send();
        default:
          throw new InvalidValueError(
            `Callbacks of type '${req.body.callbackType}' are not supported`,
            400,
          );
      }
    } catch (error) {
      return next(error);
    }
  });
}
