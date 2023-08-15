import {app} from "../src/app";
import {UserModel} from "../src/database/model";
import {createUser} from "../src/user/helper";
import {resetDatabase} from "./helper";
import chai from "chai";
import "chai-http";

describe("User", () => {
  let users: UserModel[];
  before(async function () {
    await resetDatabase();
    users = await Promise.all([
      await createUser("user1", "password1"),
      await createUser("user2", "password2"),
      await createUser("user3", "password3"),
    ]);
  });

  describe("GET /users", () => {
    it("should list all users if authorized", async () => {
      app.authorization_mock = [{result: true}];
      const res = await chai.request(app).get("/users");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body.length.should.be.eql(3);
    });

    it("should list only authorized users", async function () {
      app.authorization_mock = [
        {object: "user", result: true},
        {object: `user:${users[0].uuid}`, result: true},
        {result: false},
      ];
      const res = await chai.request(app).get("/users");
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body.length.should.be.eql(1);
    });

    it("should not list users if not authorized", async () => {
      app.authorization_mock = [{result: false}];
      const res = await chai.request(app).get("/users");
      res.should.have.status(401);
    });
  });

  describe("POST /users", () => {
    it("should create a new user if authorized", async () => {
      app.authorization_mock = [{result: true}];
      const res = await chai
        .request(app)
        .post("/users")
        .send({username: "new_user1", password: "test"});
      res.should.have.status(201);
    });

    it("should not create a new user if not authorized", async () => {
      app.authorization_mock = [{result: false}];
      const res = await chai
        .request(app)
        .post("/users")
        .send({username: "new_user2", password: "test"});
      res.should.have.status(401);
    });

    it("should not create a new user if username is already taken", async () => {
      app.authorization_mock = [{result: true}];
      const res = await chai
        .request(app)
        .post("/users")
        .send({username: "user1", password: "test"});
      res.should.have.status(409);
    });
  });
});
