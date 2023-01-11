"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_common_1 = require("@crosslab/service-common");
const assert_1 = __importDefault(require("assert"));
const config_1 = require("../../../src/config");
const operations_1 = require("../../../src/operations");
exports.default = () => describe("GET /identity", async function () {
    it("should get the identity of a known user", async function () {
        const user = {
            username: "username",
            url: `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/username`,
            scopes: ["test scope"]
        };
        const result = await (0, operations_1.getIdentity)({
            JWT: user
        });
        (0, assert_1.default)(result.status === 200);
        (0, assert_1.default)(result.body.username === user.username);
        (0, assert_1.default)(result.body.url === user.url);
        (0, assert_1.default)(result.body.roles);
        (0, assert_1.default)(result.body.roles.length === 1);
        (0, assert_1.default)(result.body.roles[0].name === "test role");
    });
    it("should not get the identity of an unknown user", async function () {
        try {
            const user = {
                username: "unknown",
                url: `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/unknown`,
                scopes: ["test scope"]
            };
            await (0, operations_1.getIdentity)({
                JWT: user
            });
            (0, assert_1.default)(false);
        }
        catch (error) {
            (0, assert_1.default)(error instanceof service_common_1.MissingEntityError);
            (0, assert_1.default)(error.status === 404);
        }
    });
});
//# sourceMappingURL=get.spec.js.map