import app from "../src/app";
import {UserModel} from "../src/database/model";
import {createNewToken} from "../src/token/helper";
import {disable_logs, resetDatabase} from "./helper";
import chai from "chai";
import "chai-http";
import {createUser} from "../src/user";

describe("Authentication", () => {
  let valid_token: string;
  let user: UserModel;

  before(async function () {
    disable_logs();
    await resetDatabase();
    user = await createUser("user", "password");
    valid_token = await createNewToken(user);
  });

  it("should allow a valid token to generate an internal jwt", async function () {
    const res = await chai
      .request(app)
      .get("/auth")
      .set("Authorization", `Bearer ${valid_token}`);

    res.should.have.status(200);
    res.should.have.header("X-Request-Authentication");
  });

  it("should not allow an invalid token to generate an internal jwt", async function () {
    const res = await chai.request(app).get("/auth");

    res.should.have.status(200);
    res.should.not.have.header("X-Request-Authentication");
  });
});
