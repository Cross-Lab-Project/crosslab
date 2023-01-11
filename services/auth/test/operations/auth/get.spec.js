"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_common_1 = require("@crosslab/service-common");
const assert_1 = __importDefault(require("assert"));
const jose_1 = require("jose");
const config_1 = require("../../../src/config");
const data_source_1 = require("../../../src/database/data_source");
const utils_1 = require("../../../src/methods/utils");
const model_1 = require("../../../src/database/model");
const operations_1 = require("../../../src/operations");
const errors_1 = require("../../../src/types/errors");
async function JWTVerify(authorization, scopes) {
    const activeKeyRepository = data_source_1.AppDataSource.getRepository(model_1.ActiveKeyModel);
    const activeKey = (await activeKeyRepository.find({
        relations: {
            key: true
        }
    }))[0];
    const jwks = { keys: [(0, utils_1.jwk)(activeKey.key)] };
    const authorization_header = authorization;
    if (authorization_header === undefined) {
        throw new Error("Authorization header is not set");
    }
    const bearerTokenResult = /^Bearer (.*)$/.exec(authorization_header);
    if (bearerTokenResult === null || bearerTokenResult.length != 2) {
        throw new Error("Authorization header is malformed");
    }
    const jwt = bearerTokenResult[1];
    if (!jwt)
        throw new Error('No JWT provided');
    if (!config_1.config.SECURITY_ISSUER)
        throw new Error('No security issuer specified');
    const JWKS = (0, jose_1.createLocalJWKSet)(jwks);
    const jwtVerifyResult = await (0, jose_1.jwtVerify)(jwt, JWKS, {
        issuer: config_1.config.SECURITY_ISSUER,
        audience: config_1.config.SECURITY_AUDIENCE,
    });
    const user = jwtVerifyResult.payload;
    if (!user.scopes || !Array.isArray(user.scopes))
        throw new Error('Payload is malformed');
    for (const scope of scopes) {
        if (user.scopes.includes(scope)) {
            return user;
        }
    }
    throw new Error('Missing Scope: one of ' + scopes);
}
async function checkJWT(authorization) {
    const payload = await JWTVerify(authorization, ["test scope"]);
    (0, assert_1.default)(payload.username === "username");
    (0, assert_1.default)(payload.scopes.includes("test scope"));
    (0, assert_1.default)(payload.url === `${config_1.config.BASE_URL}${config_1.config.BASE_URL.endsWith("/") ? "" : "/"}users/username`);
}
exports.default = () => describe("GET /auth", async function () {
    const validToken = "valid";
    const invalidToken = "invalid";
    const expiredToken = "expired";
    const allowlistedIP = "127.0.0.1";
    describe("non-allowlisted users", async function () {
        it("should authenticate a non-allowlisted user with a valid token", async function () {
            const result = await (0, operations_1.getAuth)({
                Authorization: `Bearer ${validToken}`
            });
            (0, assert_1.default)(result.status === 200);
            (0, assert_1.default)(result.headers.Authorization);
            // TODO: check that correct user was authenticated
        });
        it("should not authenticate a non-allowlisted user with an invalid token", async function () {
            try {
                await (0, operations_1.getAuth)({
                    Authorization: `Bearer ${invalidToken}`
                });
                (0, assert_1.default)(false);
            }
            catch (error) {
                (0, assert_1.default)(error instanceof service_common_1.MissingEntityError);
                (0, assert_1.default)(error.status === 401);
            }
        });
        it("should not authenticate a non-allowlisted user without an 'Authorization'-header", async function () {
            try {
                await (0, operations_1.getAuth)({});
                (0, assert_1.default)(false);
            }
            catch (error) {
                (0, assert_1.default)(error instanceof service_common_1.MissingParameterError);
                (0, assert_1.default)(error.status === 401);
            }
        });
        it("should not authenticate a non-allowlisted user with an expired token", async function () {
            try {
                await (0, operations_1.getAuth)({
                    Authorization: `Bearer ${expiredToken}`
                });
                (0, assert_1.default)(false);
            }
            catch (error) {
                (0, assert_1.default)(error instanceof errors_1.ExpiredError);
                (0, assert_1.default)(error.status === 401);
            }
        });
        it("should not authenticate a non-allowlisted user with a malformed 'Authorization'-header", async function () {
            const malformedAuthorizationHeaders = [
                "malformed",
                "Bearer Token Other",
                "BearerToken",
                "bearer token"
            ];
            for (const malformedAuthorizationHeader of malformedAuthorizationHeaders) {
                try {
                    await (0, operations_1.getAuth)({
                        Authorization: malformedAuthorizationHeader
                    });
                    (0, assert_1.default)(false);
                }
                catch (error) {
                    (0, assert_1.default)(error instanceof service_common_1.MalformedParameterError);
                    (0, assert_1.default)(error.status === 401);
                }
            }
        });
        it("should not authenticate a non-allowlisted user with an empty token", async function () {
            try {
                await (0, operations_1.getAuth)({
                    Authorization: `Bearer `
                });
                (0, assert_1.default)(false);
            }
            catch (error) {
                (0, assert_1.default)(error instanceof service_common_1.MissingEntityError);
                (0, assert_1.default)(error.status === 401);
            }
        });
    });
    describe("allowlisted users", async function () {
        it("should authenticate an allowlisted user without an 'Authorization'-header", async function () {
            const result = await (0, operations_1.getAuth)({
                "X-Real-IP": allowlistedIP
            });
            (0, assert_1.default)(result.status === 200);
            (0, assert_1.default)(result.headers.Authorization);
            await checkJWT(result.headers.Authorization);
        });
        it("should authenticate the user associated with the provided valid token instead of the allowlisted user", async function () {
            const result = await (0, operations_1.getAuth)({
                Authorization: `Bearer ${validToken}`,
                "X-Real-IP": allowlistedIP
            });
            (0, assert_1.default)(result.status === 200);
            (0, assert_1.default)(result.headers.Authorization);
            await checkJWT(result.headers.Authorization);
        });
        it("should authenticate the allowlisted user even if the provided token is invalid", async function () {
            const result = await (0, operations_1.getAuth)({
                Authorization: `Bearer ${invalidToken}`,
                "X-Real-IP": allowlistedIP
            });
            (0, assert_1.default)(result.status === 200);
            (0, assert_1.default)(result.headers.Authorization);
            await checkJWT(result.headers.Authorization);
        });
        it("should authenticate the allowlisted user even if the provided token is expired", async function () {
            const result = await (0, operations_1.getAuth)({
                Authorization: `Bearer ${expiredToken}`,
                "X-Real-IP": allowlistedIP
            });
            (0, assert_1.default)(result.status === 200);
            (0, assert_1.default)(result.headers.Authorization);
            await checkJWT(result.headers.Authorization);
        });
    });
});
//# sourceMappingURL=get.spec.js.map