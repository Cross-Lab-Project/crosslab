import app from "../src/app";
import {disable_logs, resetDatabase} from "./helper";
import chai from "chai";
import "chai-http";
import {createNewToken} from "../src/token/helper";
import {createUser} from "../src/user/helper";

describe("Login", () => {
  before(async function () {
    disable_logs();
    await resetDatabase();
    await createUser("user", "password");
  });

  it("should allow a valid user to login", async function () {
    const res = await chai
      .request(app)
      .post("/login")
      .send({username: "user", password: "password"});

    res.should.have.status(201);
    res.should.have.header("Content-Type", "application/json; charset=utf-8");
  });

  it("should not allow an invalid user to login", async function () {
    const res = await chai
      .request(app)
      .post("/login")
      .send({username: "user", password: "password2"});

    res.should.have.status(401);
  });

  it.skip("should allow a logged in user to log out", async function () {
    await resetDatabase();
    const user = await createUser("user", "password");
    const token = await createNewToken(user);
    console.log(token);
  });
});
