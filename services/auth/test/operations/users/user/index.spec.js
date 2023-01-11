"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const delete_spec_1 = __importDefault(require("./delete.spec"));
const get_spec_1 = __importDefault(require("./get.spec"));
const patch_spec_1 = __importDefault(require("./patch.spec"));
const index_spec_1 = __importDefault(require("./roles/role/index.spec"));
exports.default = [delete_spec_1.default, get_spec_1.default, patch_spec_1.default, ...index_spec_1.default];
//# sourceMappingURL=index.spec.js.map