"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_spec_1 = __importDefault(require("./get.spec"));
const post_spec_1 = __importDefault(require("./post.spec"));
const index_spec_1 = __importDefault(require("./user/index.spec"));
exports.default = [get_spec_1.default, post_spec_1.default, ...index_spec_1.default];
//# sourceMappingURL=index.spec.js.map