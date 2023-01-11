"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => describe("auth methods", async function () {
    describe("getAllowlistedUser", async function () {
        xit("should find the user for an allowlisted ip", async function () {
            // TBD
        });
        xit("should not find a user for a non-allowlisted ip", async function () {
            // TBD
        });
        xit("should throw an error if the user for an allowlisted ip is not found", async function () {
            // TBD
        });
    });
    describe("sign", async function () {
        // TBD
    });
    describe("signUserToken", async function () {
        // TBD
    });
    describe("signDeviceToken", async function () {
        // TBD
    });
    describe("getTokenStringFromAuthorization", async function () {
        xit("should get the token from a correct 'Authorization'-header", async function () {
            // TBD
        });
        xit("should not get a token from a malformed 'Authorization'-header", async function () {
            // TBD
        });
    });
    describe("getTokenByTokenString", async function () {
        xit("should find a valid token", async function () {
            // TBD
        });
        xit("should not find an invalid token", async function () {
            // TBD
        });
        xit("should throw an error if the found token has no associated user", async function () {
            // TBD
        });
    });
});
//# sourceMappingURL=auth.spec.js.map