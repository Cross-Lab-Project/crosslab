"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_common_1 = require("@crosslab/service-common");
const assert_1 = __importDefault(require("assert"));
const config_1 = require("../../../src/config");
const operations_1 = require("../../../src/operations");
// TODO: rethink what can be patched for a user
exports.default = () => describe("PATCH /identity", async function () {
    it("should update the identity of a known user", async function () {
        const user = {
            username: "username",
            url: `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/username`,
            scopes: ["test scope"]
        };
        const result = await (0, operations_1.patchIdentity)({
            username: "newUsername",
            password: "newPassword"
        }, {
            JWT: user
        });
        (0, assert_1.default)(result.status === 200);
        (0, assert_1.default)(result.body.username === "newUsername");
        (0, assert_1.default)(result.body.url === `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/newUsername`);
        (0, assert_1.default)(result.body.roles);
        (0, assert_1.default)(result.body.roles.length === 1);
        (0, assert_1.default)(result.body.roles[0].name === "test role");
        const resultRevert = await (0, operations_1.patchIdentity)({
            username: "username",
            password: "password",
            roles: [{
                    name: "test role"
                }]
        }, {
            JWT: user
        });
        (0, assert_1.default)(resultRevert.status === 200);
        (0, assert_1.default)(resultRevert.body.username === "username");
        (0, assert_1.default)(resultRevert.body.url === `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/username`);
        (0, assert_1.default)(resultRevert.body.roles);
        (0, assert_1.default)(resultRevert.body.roles.length === 1);
        (0, assert_1.default)(resultRevert.body.roles[0].name === "test role");
    });
    it("should not update the identity of an unknown user", async function () {
        try {
            const user = {
                username: "unknown",
                url: `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/unknown`,
                scopes: ["test scope"]
            };
            await (0, operations_1.patchIdentity)({
                username: "newUsername",
                password: "newPassword"
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
    it("should not allow the user to set an unknown role", async function () {
        try {
            const user = {
                username: "username",
                url: `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/unknown`,
                scopes: ["test scope"]
            };
            await (0, operations_1.patchIdentity)({
                roles: [{
                        name: "unknown"
                    }]
            }, {
                JWT: user
            });
            (0, assert_1.default)(false);
        }
        catch (error) {
            (0, assert_1.default)(error instanceof service_common_1.InvalidValueError);
            (0, assert_1.default)(error.status === 400);
        }
    });
});
//# sourceMappingURL=patch.spec.js.map