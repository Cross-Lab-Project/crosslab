"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_common_1 = require("@crosslab/service-common");
const assert_1 = __importDefault(require("assert"));
const config_1 = require("../../../src/config");
const data_source_1 = require("../../../src/database/data_source");
const model_1 = require("../../../src/database/model");
const operations_1 = require("../../../src/operations");
exports.default = () => describe("POST /logout", async function () {
    it("should logout the user successfully", async function () {
        const tokenRepository = data_source_1.AppDataSource.getRepository(model_1.TokenModel);
        const userRepository = data_source_1.AppDataSource.getRepository(model_1.UserModel);
        // prepare token
        const user = await userRepository.findOneByOrFail({ username: "username" });
        const token = tokenRepository.create();
        token.scopes = [];
        user.tokens = await user.tokens ?? [];
        user.tokens.push(token);
        await userRepository.save(user);
        // logout
        const result = await (0, operations_1.postLogout)({
            token: token.token
        }, {
            JWT: {
                username: user.username,
                url: `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/${user.username}`,
                scopes: ["test scope"]
            }
        });
        (0, assert_1.default)(result.status === 200);
        // check that token was deleted successfully
        (0, assert_1.default)(!tokenRepository.findOneBy({
            token: token.token,
            user: {
                username: user.username
            }
        }));
    });
    it("should throw an error if the user is not found", async function () {
        const user = {
            username: "unkown",
            url: `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/unknown`,
            scopes: ["test scope"]
        };
        try {
            await (0, operations_1.postLogout)({
                token: "token"
            }, {
                JWT: user
            });
            (0, assert_1.default)(false);
        }
        catch (error) {
            // TODO: maybe another error would be better
            // TODO: maybe harder checks are needed to ensure user belongs to service
            (0, assert_1.default)(error instanceof service_common_1.MissingEntityError);
            (0, assert_1.default)(error.status === 404);
        }
    });
    it("should throw an error if the token does not belong to the user", async function () {
        const user = {
            username: "username",
            url: `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/username`,
            scopes: ["test scope"]
        };
        try {
            await (0, operations_1.postLogout)({
                token: "wrong"
            }, {
                JWT: user
            });
            (0, assert_1.default)(false);
        }
        catch (error) {
            (0, assert_1.default)(error instanceof service_common_1.MissingEntityError);
            (0, assert_1.default)(error.status === 404);
        }
    });
    // TODO: think about how logout should handle multiple different tokens
});
//# sourceMappingURL=post.spec.js.map