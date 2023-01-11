"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_spec_1 = __importDefault(require("./api.spec"));
const auth_spec_1 = __importDefault(require("./auth.spec"));
const format_spec_1 = __importDefault(require("./format.spec"));
const login_spec_1 = __importDefault(require("./login.spec"));
const utils_spec_1 = __importDefault(require("./utils.spec"));
const write_spec_1 = __importDefault(require("./write.spec"));
const tests = [api_spec_1.default, auth_spec_1.default, format_spec_1.default, login_spec_1.default, utils_spec_1.default, write_spec_1.default];
exports.default = () => describe("Methods", async function () {
    for (const test of tests) {
        test();
    }
});
//# sourceMappingURL=index.spec.js.map