"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_spec_1 = __importDefault(require("./auth/index.spec"));
const index_spec_2 = __importDefault(require("./device_authentication_token/index.spec"));
const index_spec_3 = __importDefault(require("./identity/index.spec"));
const index_spec_4 = __importDefault(require("./login/index.spec"));
const index_spec_5 = __importDefault(require("./logout/index.spec"));
const index_spec_6 = __importDefault(require("./users/index.spec"));
const tests = [
    ...index_spec_1.default,
    ...index_spec_2.default,
    ...index_spec_3.default,
    ...index_spec_4.default,
    ...index_spec_5.default,
    ...index_spec_6.default
];
exports.default = () => describe("Operations", async function () {
    for (const test of tests) {
        test();
    }
});
//# sourceMappingURL=index.spec.js.map