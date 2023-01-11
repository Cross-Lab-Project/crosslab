"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const data_source_1 = require("../../../src/database/data_source");
const model_1 = require("../../../src/database/model");
const operations_1 = require("../../../src/operations");
const errors_1 = require("../../../src/types/errors");
exports.default = () => describe("POST /login", async function () {
    it("should login the local test user successfully", async function () {
        const userRepository = data_source_1.AppDataSource.getRepository(model_1.UserModel);
        const result = await (0, operations_1.postLogin)({
            username: "username",
            password: "password",
            method: "local"
        });
        (0, assert_1.default)(result.status === 201);
        (0, assert_1.default)(result.body);
        const user = await userRepository.findOneByOrFail({ username: "username" });
        (0, assert_1.default)((await user.tokens).find((token) => token.token === result.body));
    });
    it("should not login a local user with wrong username", async function () {
        try {
            await (0, operations_1.postLogin)({
                username: "wrong",
                password: "password",
                method: "local"
            });
            (0, assert_1.default)(false);
        }
        catch (error) {
            (0, assert_1.default)(error instanceof errors_1.AuthenticationError);
            (0, assert_1.default)(error.status === 401);
        }
    });
    it("should not login a local user with wrong password", async function () {
        try {
            await (0, operations_1.postLogin)({
                username: "username",
                password: "wrong",
                method: "local"
            });
            (0, assert_1.default)(false);
        }
        catch (error) {
            (0, assert_1.default)(error instanceof errors_1.AuthenticationError);
            (0, assert_1.default)(error.status === 401);
        }
    });
    // TODO: test tui authentication
    // TODO: test empty password handling
});
//# sourceMappingURL=post.spec.js.map