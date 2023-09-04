import assert from "assert";
import {ApplicationDataSource} from "../database/datasource";
import {UserModel} from "../database/model";
import {postTokenPath} from "../generated/operations";
import {validatePostToken} from "../generated/validation";
import {createNewToken} from "../token/helper";
import {HttpError} from "@crosslab/service-common";
import express from "express";

export const router = express.Router();

router.post(
  postTokenPath,
  validatePostToken(async (req, res) => {
    const {username, claims} = req.body;

    console.log("username", username);
    if (!username) throw new HttpError(400, "User not found");
    assert(username !== undefined, "username is undefined");
    const user = await ApplicationDataSource.manager.findOneBy(UserModel, {
      username: username,
    });
    if (user === null) throw new HttpError(400, "User not found");

    const token = await createNewToken(user, claims);

    res.status(201);
    res.json(token);
  }),
);
