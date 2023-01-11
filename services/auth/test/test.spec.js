"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../src/config");
const data_source_1 = require("../src/database/data_source");
const utils_1 = require("../src/methods/utils");
const model_1 = require("../src/database/model");
const index_spec_1 = __importDefault(require("./methods/index.spec"));
const index_spec_2 = __importDefault(require("./operations/index.spec"));
describe("Authentication Service Tests", async function () {
    this.beforeAll(async function () {
        console.log = () => null;
        console.warn = () => null;
        // initialize AppDataSource
        await data_source_1.AppDataSource.initialize(config_1.dataSourceConfig);
        await (0, data_source_1.initializeDataSource)();
        // add test objects
        const scopeRepository = data_source_1.AppDataSource.getRepository(model_1.ScopeModel);
        const roleRepository = data_source_1.AppDataSource.getRepository(model_1.RoleModel);
        const userRepository = data_source_1.AppDataSource.getRepository(model_1.UserModel);
        const tokenRepository = data_source_1.AppDataSource.getRepository(model_1.TokenModel);
        const testScope = scopeRepository.create();
        testScope.name = "test scope";
        await scopeRepository.save(testScope);
        const testRole = roleRepository.create();
        testRole.name = "test role";
        testRole.scopes = [testScope];
        roleRepository.save(testRole);
        const testUser = userRepository.create();
        testUser.username = "username";
        testUser.password = "password";
        testUser.roles = [testRole];
        await userRepository.save(testUser);
        const testTokenValid = tokenRepository.create();
        testTokenValid.scopes = [testScope];
        testTokenValid.token = "valid";
        testTokenValid.user = testUser;
        await tokenRepository.save(testTokenValid);
        const testTokenExpired = tokenRepository.create();
        testTokenExpired.scopes = [testScope];
        testTokenExpired.token = "expired";
        testTokenExpired.user = testUser;
        testTokenExpired.expiresOn = new Date(Date.now() - 3600000).toISOString();
        await tokenRepository.save(testTokenExpired);
        // resolve allowlist
        await (0, utils_1.resolveAllowlist)(config_1.config);
        // create active key
        const activeKeyRepository = data_source_1.AppDataSource.getRepository(model_1.ActiveKeyModel);
        const key = await (0, utils_1.generateNewKey)();
        for (const activeKey of await activeKeyRepository.find()) {
            await activeKeyRepository.delete(activeKey);
        }
        const activeKey = activeKeyRepository.create();
        activeKey.key = key;
        activeKey.use = key.use;
        await activeKeyRepository.save(activeKey);
    });
    (0, index_spec_1.default)();
    (0, index_spec_2.default)();
});
//# sourceMappingURL=test.spec.js.map